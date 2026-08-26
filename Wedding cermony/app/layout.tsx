import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://three-doors-wedding.shk-saad295.chatgpt.site"),
  title: "Hafiza Arooba Shakeel with Junaid Saddique | Wedding Ceremony",
  description: "Wedding Ceremony — Mehndi, Barat and Walima celebrations of Hafiza Arooba Shakeel with Junaid Saddique.",
  openGraph: {
    title: "Hafiza Arooba Shakeel with Junaid Saddique",
    description: "Wedding Ceremony — Mehndi, Barat and Walima.",
    url: "https://three-doors-wedding.shk-saad295.chatgpt.site",
    siteName: "Hafiza Arooba & Junaid Wedding Ceremony",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Wedding Ceremony of Hafiza Arooba Shakeel with Junaid Saddique" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafiza Arooba Shakeel with Junaid Saddique",
    description: "Wedding Ceremony — Mehndi, Barat and Walima.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
