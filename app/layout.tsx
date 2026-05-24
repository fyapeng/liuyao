import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "\u516d\u723b\u6392\u76d8\u4e0e\u89c4\u5219\u8f85\u52a9\u5206\u6790\u7cfb\u7edf",
  description:
    "\u7528\u4e8e\u516d\u723b\u6392\u76d8\u3001\u4e16\u5e94\u3001\u7eb3\u7532\u3001\u516d\u4eb2\u3001\u516d\u795e\u5c55\u793a\u4e0e\u540e\u7eed\u89c4\u5219\u5206\u6790\u6269\u5c55\u7684\u6f14\u793a\u7f51\u9875\u3002"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
