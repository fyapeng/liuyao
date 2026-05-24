import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "六爻排盘与断盘辅助",
  description:
    "用于六爻排盘、世应、纳甲、六亲、六神与时间规则辅助阅读的演示网页。"
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
