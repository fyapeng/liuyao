import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "六爻排盘与规则辅助分析系统",
  description: "用于六爻排盘、动爻识别、变卦生成与规则分析扩展的项目骨架。"
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

