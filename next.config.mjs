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

  // Source map upload (needs SENTRY_AUTH_TOKEN — add later)
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Upload wider set of client source files
  widenClientFileUpload: true,

  // Suppress non-CI build output
  silent: !process.env.CI,
});
