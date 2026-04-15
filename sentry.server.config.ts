// This file configures the initialization of Sentry on the server.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // 100% in dev, 10% in production to avoid billing overload
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  enableLogs: true,

  sendDefaultPii: true,

  // Attach local variable values to stack frames for easier debugging
  includeLocalVariables: true,
});
