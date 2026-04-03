import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  try {
    throw new Error(
      "Sentry Test Error — server-side API route (delete me after test)"
    );
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Test error captured" }, { status: 500 });
  }
}
