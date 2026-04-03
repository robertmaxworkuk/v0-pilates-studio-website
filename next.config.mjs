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

  // Suppress non-CI build output (avoids noise during local development)
  silent: !process.env.CI,

  // Upload wider set of source maps for readable stack traces in Sentry
  widenClientFileUpload: true,

  // tunnelRoute: "/monitoring", // enable to bypass ad-blockers (increases server load)
});
