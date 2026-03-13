import type { Metadata } from "next";
import "./globals.css";
import KakaoChannel from "@/components/KakaoChannel";

export const metadata: Metadata = {
  title: "TIME TO SHORTS | 국내 유일 실명 크리에이터 기반 매스 시딩",
  description: "단순 배포를 넘어, 조회수가 매출로 이어지는 퍼포먼스 구조를 설계합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        {children}
        <KakaoChannel />
      </body>
    </html>
  );
}
