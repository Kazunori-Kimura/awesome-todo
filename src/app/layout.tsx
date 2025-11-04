import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Awesome Todo - 生産性を向上させるTODOアプリ",
  description: "Next.js 16とTailwind CSS v4で構築された、モバイル対応のモダンなTODOアプリケーション。タスクの追加、編集、削除、検索機能を提供します。",
  keywords: ["todo", "タスク管理", "生産性", "Next.js", "React", "Tailwind CSS"],
  authors: [{ name: "Awesome Todo Team" }],
  creator: "Awesome Todo Team",
  publisher: "Awesome Todo Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kazunori-kimura.github.io'),
  alternates: {
    canonical: '/awesome-todo',
  },
  openGraph: {
    title: "Awesome Todo",
    description: "生産性を向上させるモダンなTODOアプリ",
    url: '/awesome-todo',
    siteName: "Awesome Todo",
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Awesome Todo",
    description: "生産性を向上させるモダンなTODOアプリ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
