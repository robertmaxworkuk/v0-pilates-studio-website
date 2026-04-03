import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  sendDefaultPii: true,

  // 100% in dev, 10% in production
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  // Session Replay: record 10% of sessions, 100% of sessions with errors
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  enableLogs: true,

  // SDK debug output in dev only (stripped from production bundle via tree-shaking)
  debug: process.env.NODE_ENV === "development",

  integrations: [
    Sentry.replayIntegration(),
  ],
});

// Capture App Router navigation transitions as spans
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
