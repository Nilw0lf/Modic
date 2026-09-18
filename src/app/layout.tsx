import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteUrl } from "@/lib/metadata";
import "katex/dist/katex.min.css";
import "./globals.css";
import "@/styles/refinements.css";
import "@/styles/learning.css";
import "@/styles/art-direction.css";
const sans = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});
const mono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Modic — See how the world behaves.",
    template: "%s · Modic",
  },
  description:
    "Interactive experiments for probability, risk, decisions, markets and complex systems.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Modic — See how the world behaves.",
    description:
      "An interactive field guide to probability, risk, decisions, markets and complex systems.",
    type: "website",
    url: "/",
    siteName: "Modic",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("modic-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="page-shell">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
