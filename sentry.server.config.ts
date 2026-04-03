// This file configures the initialization of Sentry on the server.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? "https://93b576fea5428984b0a59e272d62cddb@o4511156410253312.ingest.de.sentry.io/4511156700774480",

  tracesSampleRate: 1,

  enableLogs: true,

  sendDefaultPii: true,

  includeLocalVariables: true,
});
