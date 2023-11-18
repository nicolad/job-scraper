import { NextResponse } from "next/server";
import { createReadStream } from "fs";
import { join } from "path";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbPath = join(process.cwd(), "jobs.json");

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    // Wait for the file to be read and parsed
    const file = await openai.files.create({
      file: createReadStream(dbPath),
      purpose: "assistants",
    });

    const assistant = await openai.beta.assistants.create({
      instructions:
        "You are an AI assistant specialized in assisting developers with finding remote job opportunities from uploaded data.",
      model: "gpt-4-1106-preview",
      tools: [{ type: "retrieval" }],
      file_ids: [file.id],
    });

    const thread = await openai.beta.threads.create({});

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content:
        "I need a remote contract job as a developer in structured data response as JSON with following fields: title, company, location, url, description, date",
    });

    await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
      instructions:
        "Please address the user's request for a remote contract job as a developer.",
    });
    return NextResponse.json({
      id: thread.id,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
