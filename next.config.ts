import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const remotePatterns: RemotePattern[] = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "1337",
    pathname: "/uploads/**",
  },
];

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

if (strapiUrl) {
  try {
    const parsed = new URL(strapiUrl);
    const port = parsed.port || undefined;
    const protocol = parsed.protocol.replace(":", "") as "http" | "https";

    // Aynı ana bilgisayar/port zaten ekli değilse listeye ekleyelim.
    const exists = remotePatterns.some(
      (pattern) =>
        pattern.protocol === protocol &&
        pattern.hostname === parsed.hostname &&
        (pattern.port ?? "") === (port ?? ""),
    );

    if (!exists) {
      const dynamicPattern: RemotePattern = {
        protocol,
        hostname: parsed.hostname,
        pathname: "/uploads/**",
      };

      if (port) {
        dynamicPattern.port = port;
      }

      remotePatterns.push(dynamicPattern);
    }
  } catch {
    // Geçersiz URL — varsayılan localhost pattern kullanılır
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    qualities: [75, 85, 90],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: http://localhost:1337 https:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
