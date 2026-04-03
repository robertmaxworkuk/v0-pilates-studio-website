"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          gap: "1rem",
        }}
      >
        <h2>Что-то пошло не так</h2>
        <button
          onClick={reset}
          style={{ padding: "0.5rem 1.5rem", cursor: "pointer" }}
        >
          Попробовать снова
        </button>
      </body>
    </html>
  );
}
