import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating "N" bubble bottom-left is Next.js's own dev-mode route
  // indicator (route type, bundler, etc.) — never part of the deployed
  // site — but it's easy to mistake for stray site UI while developing,
  // so it's switched off here too. Build/runtime errors still surface.
  devIndicators: false,
};

export default nextConfig;
