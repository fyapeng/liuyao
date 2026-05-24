import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "六爻排盘与规则辅助分析系统",
  description: "用于六爻排盘、世应、纳甲、六亲、六神展示与后续规则分析扩展的演示网页。"
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
