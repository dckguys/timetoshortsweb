import type { Metadata } from "next";
import Script from "next/script";
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18019580058"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18019580058');
          `}
        </Script>
      </head>
      <body>
        {children}
        <KakaoChannel />
      </body>
    </html>
  );
}
