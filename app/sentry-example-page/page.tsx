"use client";

import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

export default function SentryExamplePage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function triggerClientError() {
    throw new Error("Sentry Test Error — client-side (delete me after test)");
  }

  async function triggerServerError() {
    const res = await fetch("/api/sentry-example-api");
    if (!res.ok) {
      setStatus("sent");
    }
  }

  function triggerCapture() {
    Sentry.captureException(
      new Error("Sentry Test — manual capture (delete me after test)")
    );
    setStatus("sent");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        fontFamily: "system-ui, sans-serif",
        background: "#0f0f11",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        🔍 Sentry Test Page
      </h1>
      <p style={{ color: "#aaa", marginBottom: "1rem" }}>
        Use these buttons to send a test error to Sentry, then check{" "}
        <a
          href="https://sentry.io/issues/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#7c6ff7" }}
        >
          sentry.io/issues
        </a>
        .
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", maxWidth: "360px" }}>
        <Button onClick={triggerClientError} label="Throw client-side error" color="#e55" />
        <Button onClick={triggerCapture} label="Capture exception manually" color="#7c6ff7" />
        <Button onClick={triggerServerError} label="Trigger server-side error" color="#f90" />
      </div>

      {status === "sent" && (
        <p style={{ marginTop: "1rem", color: "#4caf50", fontWeight: 600 }}>
          ✅ Error sent! Check your Sentry dashboard.
        </p>
      )}

      <p style={{ marginTop: "2rem", color: "#555", fontSize: "0.8rem" }}>
        /sentry-example-page — for testing only, remove in production
      </p>
    </main>
  );
}

function Button({
  onClick,
  label,
  color,
}: {
  onClick: () => void;
  label: string;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        border: `2px solid ${color}`,
        background: "transparent",
        color,
        fontWeight: 600,
        fontSize: "0.95rem",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseOver={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background = color + "22")
      }
      onMouseOut={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
      }
    >
      {label}
    </button>
  );
}
