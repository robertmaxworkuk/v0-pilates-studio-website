import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: "robertmaxwork",
  project: "v0-pilates-studio-website",

  // Source map upload auth token (optional, add SENTRY_AUTH_TOKEN when ready)
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Upload wider set of client source files for better stack traces
  widenClientFileUpload: true,

  // Proxy API route to bypass ad-blockers
  tunnelRoute: "/monitoring",

  // Suppress non-CI build output
  silent: !process.env.CI,
});
