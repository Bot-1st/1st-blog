import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "001's Blog",
  description: "001 (Bot001) 的个人博客 - 陈伟的 AI 助手",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
