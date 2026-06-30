import { NextRequest, NextResponse } from "next/server";
// PDF parsing via pdf-parse using require() for build-safe serverless compatibility

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// Text safety utilities
function containsValidText(text: string): boolean {
  // Check if text has meaningful content (not just whitespace or gibberish)
  const cleanedText = text.trim();
  if (cleanedText.length < 10) return false;

  // Check ratio of alphabetic characters to total
  const alphaChars = (cleanedText.match(/[a-zA-Z]/g) || []).length;
  const ratio = alphaChars / cleanedText.length;

  // Should have at least 70% alphabetic characters for valid text
  return ratio > 0.7;
}

function truncateText(text: string, maxLength: number = 100000): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// Mock fallback data when Gemini API fails
function getMockFallbackData(): any {
  return {
    summary: "This book appears to be about learning and knowledge. Due to high demand, detailed AI analysis is temporarily unavailable, but the file was uploaded successfully.",
    goldenPages: [],
    quiz: [
      {
        question: "What is the main topic of this document?",
        options: ["Learning", "Fiction", "Science", "History"],
        answer: "Learning"
      }
    ],
    flashcards: [
      {
        front: "Document Status",
        back: "Successfully uploaded and parsed. AI analysis is temporarily unavailable due to rate limiting."
      }
    ],
    mindmap: {
      centralTheme: "Document Analysis",
      branches: [
        {
          title: "Content",
          children: ["Text extracted", "Ready for analysis"]
        }
      ]
    }
  };
}

// Gemini AI integration
async function callGeminiAI(text: string): Promise<any> {
  console.log("[Gemini] Checking for API key...");
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("[Gemini] ERROR: GEMINI_API_KEY not configured");
    throw new Error("GEMINI_API_KEY not configured");
  }
  console.log("[Gemini] API key found, length:", apiKey.length);

  const prompt = `Return ONLY valid JSON. No markdown. No explanation.

{
  "summary": "string",
  "goldenPages": [
    { "page": number, "reason": "string" }
  ],
  "quiz": [
    {
      "question": "string",
      "options": ["string"],
      "answer": "string"
    }
  ],
  "flashcards": [
    {
      "front": "string",
      "back": "string"
    }
  ],
  "mindmap": {
    "centralTheme": "string",
    "branches": [
      {
        "title": "string",
        "children": ["string"]
      }
    ]
  }
}

Analyze this book text with a casual, fascinating, story-like tone. Fill the structure above. Text to analyze: ${truncateText(text)}`;

  console.log("[Gemini] Sending request to API...");
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 1,
          topP: 0.9,
          maxOutputTokens: 65536,
        },
      }),
    }
  );

  console.log("[Gemini] Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Gemini] ERROR: API returned non-OK status:", response.status, errorText);
    // Throw with status code for rate-limit handling in main handler
    const error = new Error(`Gemini API error: ${response.status} ${errorText}`);
    (error as any).statusCode = response.status;
    throw error;
  }

  // Safe parse response
  const responseText = await response.text();
  let data;
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (parseErr) {
    console.error("[Gemini] ERROR: Failed to parse response:", parseErr instanceof Error ? parseErr.message : parseErr);
    console.error("[Gemini] Raw response:", responseText.substring(0, 500));
    throw new Error("Invalid response from Gemini API: non-JSON response");
  }
  console.log("[Gemini] Response received, parsing JSON...");

  // Parse the response to extract JSON
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  console.log("[Gemini] Raw content length:", content.length);

  // Clean up potential malformed JSON
  let cleanedContent = content.trim();
  // Remove markdown code fences if present
  cleanedContent = cleanedContent.replace(/^```json\s*/i, "").replace(/```\s*$/i, "");
  // Remove any trailing text after the closing brace
  const lastBraceIndex = cleanedContent.lastIndexOf("}");
  if (lastBraceIndex !== -1) {
    cleanedContent = cleanedContent.substring(0, lastBraceIndex + 1);
  }
  console.log("[Gemini] Cleaned content length:", cleanedContent.length);

  // Extract JSON from the response
  const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("[Gemini] ERROR: No JSON found in response. Raw content:", content.substring(0, 500));
    throw new Error("Invalid AI response format: no JSON object found");
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonMatch[0]);
    console.log("[Gemini] JSON parsed successfully");
  } catch (parseErr) {
    console.error("[Gemini] ERROR: Failed to parse AI response:", parseErr instanceof Error ? parseErr.message : parseErr);
    console.error("[Gemini] JSON string that failed:", jsonMatch[0].substring(0, 500));
    throw new Error(`Failed to parse AI response: ${parseErr instanceof Error ? parseErr.message : parseErr}`);
  }

  // Validate required keys exist
  const requiredKeys = ["summary", "goldenPages", "quiz", "flashcards", "mindmap"];
  for (const key of requiredKeys) {
    if (!(key in parsed)) {
      console.error("[Gemini] ERROR: Missing required key:", key);
      throw new Error(`Missing required key: ${key}`);
    }
  }

  // Validate goldenPages structure
  if (!Array.isArray(parsed.goldenPages)) {
    parsed.goldenPages = [];
  } else {
    parsed.goldenPages = parsed.goldenPages.map((item: any) => ({
      page: typeof item.page === "number" ? item.page : 1,
      reason: typeof item.reason === "string" ? item.reason : "",
    }));
  }

  // Validate quiz structure
  if (!Array.isArray(parsed.quiz)) {
    parsed.quiz = [];
  } else {
    parsed.quiz = parsed.quiz.map((item: any) => ({
      question: typeof item.question === "string" ? item.question : "",
      options: Array.isArray(item.options) ? item.options : [],
      answer: typeof item.answer === "string" ? item.answer : "",
    }));
  }

  // Validate flashcards structure
  if (!Array.isArray(parsed.flashcards)) {
    parsed.flashcards = [];
  } else {
    parsed.flashcards = parsed.flashcards.map((item: any) => ({
      front: typeof item.front === "string" ? item.front : "",
      back: typeof item.back === "string" ? item.back : "",
    }));
  }

  // Validate mindmap structure
  if (typeof parsed.mindmap !== "object" || parsed.mindmap === null) {
    parsed.mindmap = { centralTheme: "Book Analysis", branches: [] };
  } else {
    // Ensure branches format with string children
    parsed.mindmap.centralTheme = typeof parsed.mindmap.centralTheme === "string"
      ? parsed.mindmap.centralTheme
      : "Book Analysis";
    parsed.mindmap.branches = Array.isArray(parsed.mindmap.branches)
      ? parsed.mindmap.branches.map((branch: any) => ({
          title: typeof branch.title === "string" ? branch.title : "",
          children: Array.isArray(branch.children)
            ? branch.children.map((child: any) =>
                typeof child === "string"
                  ? child
                  : typeof child?.label === "string"
                    ? child.label
                    : String(child || "")
              )
            : [],
        }))
      : [];
  }

  console.log("[Gemini] Validation complete, returning parsed data");
  return parsed;
}

export async function POST(request: NextRequest) {
  // Log environment state at request time for debugging
  console.log("[API] Environment check - GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
  console.log("[API] Environment check - ALL env keys:", Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('API')).join(', '));

  try {
    console.log("[API] Received POST request");
    const formData = await request.formData();
    const file = formData.get("file");
    console.log("[API] Form data extracted, file:", file ? "present" : "missing");

    // Validate file exists
    if (!file || !(file instanceof Blob)) {
      console.error("[API] ERROR: No file provided");
      return NextResponse.json(
        { error: "No file provided", success: false },
        { status: 400 }
      );
    }
    console.log("[API] File received, type:", file.type, "size:", file.size);

    // Validate file type (must be PDF)
    if (file.type !== "application/pdf") {
      console.error("[API] ERROR: Wrong file type:", file.type);
      return NextResponse.json(
        { error: "Only PDF files are supported", success: false },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.error("[API] ERROR: File too large:", file.size);
      return NextResponse.json(
        { error: `File too large. Maximum size is 50MB.`, success: false },
        { status: 400 }
      );
    }

    // Convert to buffer
    console.log("[API] Converting file to buffer...");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("[API] Buffer created, length:", buffer.length);

    // Parse PDF - using pdf-parse v1.1.1 (serverless-safe, no browser dependencies)
    let text = "";
    try {
      console.log("[API] Parsing PDF with pdf-parse v1.1.1...");
      console.log("[API] Buffer type check:", Buffer.isBuffer(buffer), "length:", buffer.length);

      // Use function-based API for clean Node.js-native serverless compatibility
      // pdf-parse v1.1.1 has no canvas/browser dependencies (no DOMMatrix issues)
      const pdfParse = require("pdf-parse");
      const pdfData = await pdfParse(buffer);
      text = pdfData.text || "";
      console.log("[API] PDF parsed successfully, text length:", text.length);
    } catch (parseError: unknown) {
      const errorMessage = parseError instanceof Error ? parseError.message : String(parseError);
      const errorName = parseError instanceof Error ? parseError.constructor.name : "unknown";
      console.error("[API] ERROR: PDF parsing failed:", errorName, errorMessage);
      console.error("[API] Stack trace:", parseError instanceof Error ? parseError.stack : "N/A");
      // Handle specific PDF exception types by name (dynamic imports lose instanceof)
      if (errorName === "PasswordException" || errorMessage.toLowerCase().includes("password")) {
        return NextResponse.json(
          { error: "This PDF is encrypted. Please upload an unencrypted file.", success: false },
          { status: 400 }
        );
      }
      if (errorName === "InvalidPDFException" || errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("corrupt")) {
        return NextResponse.json(
          { error: "This PDF is corrupted or malformed. Please upload a valid PDF.", success: false },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: `Failed to parse PDF: ${errorMessage}`, success: false },
        { status: 400 }
      );
    }

    // Validate empty PDF
    if (!text.trim()) {
      console.error("[API] ERROR: PDF contains no readable text");
      return NextResponse.json(
        { error: "This PDF contains no readable text. It may be empty or image-based." },
        { status: 400 }
      );
    }
    console.log("[API] Text extracted, length:", text.length);

    // Validate meaningful content
    if (!containsValidText(text)) {
      console.error("[API] ERROR: PDF text validation failed");
      return NextResponse.json(
        { error: "This PDF does not contain valid readable text content." },
        { status: 400 }
      );
    }

    // Call Gemini AI for analysis
    console.log("[API] Calling Gemini AI...");
    let aiResult;
    try {
      aiResult = await callGeminiAI(text);
      console.log("[API] Gemini AI returned result");
    } catch (geminiError: unknown) {
      const geminiErrorMsg = geminiError instanceof Error ? geminiError.message : String(geminiError);
      const geminiErrorCode = geminiError instanceof Error ? (geminiError as any).statusCode : null;
      console.error("[API] Gemini API failed:", geminiErrorMsg);
      console.error("[API] Gemini error status code:", geminiErrorCode);

      // Handle quota/rate-limit (429) with fallback data
      if (geminiErrorCode === 429) {
        console.log("[API] Using fallback mock data due to rate limiting");
        aiResult = getMockFallbackData();
      } else {
        throw geminiError; // Re-throw other errors
      }
    }

    // Map Gemini output to UI-expected format
    // GoldenPages UI expects string[] but Gemini returns {page, reason}[]
    const goldenPagesStrings = (aiResult.goldenPages || []).map((item: any) =>
      typeof item?.reason === "string" ? item.reason : String(item || "")
    );

    // Ensure response data is never empty or malformed
    const responseData = {
      storySummary: aiResult?.summary || "No summary available",
      goldenPages: goldenPagesStrings.length > 0 ? goldenPagesStrings : [],
      quizQuestions: Array.isArray(aiResult?.quiz) ? aiResult.quiz : [],
      flashcards: Array.isArray(aiResult?.flashcards) ? aiResult.flashcards : [],
      mindmap: aiResult?.mindmap && typeof aiResult.mindmap === "object"
        ? aiResult.mindmap
        : { centralTheme: "Book Analysis", branches: [] },
    };

    console.log("[API] Analysis complete, returning response with data shape:", {
      hasSummary: !!responseData.storySummary,
      goldenPagesCount: responseData.goldenPages?.length || 0,
      quizCount: responseData.quizQuestions?.length || 0,
      flashcardsCount: responseData.flashcards?.length || 0,
    });

    return NextResponse.json({
      success: true,
      data: responseData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack?.split('\n').slice(0, 5).join('\n') : "N/A";
    console.error("[API] ERROR: Analysis failed:", errorMessage);
    console.error("[API] Stack trace:", errorStack);

    // Handle specific API key error - also check for missing env vars
    if (errorMessage.includes("GEMINI_API_KEY") || !process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "AI service not configured. Please set GEMINI_API_KEY environment variable.",
          details: errorMessage,
          success: false,
          envDebug: {
            hasGeminiKey: !!process.env.GEMINI_API_KEY,
            availableEnvKeys: Object.keys(process.env).filter(k => !k.includes('PRIVATE') && !k.includes('SECRET')).join(', ')
          }
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: `Analysis failed: ${errorMessage}`, details: errorStack, success: false },
      { status: 500 }
    );
  }
}