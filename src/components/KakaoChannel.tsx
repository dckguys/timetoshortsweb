"use client";

export default function KakaoChannel() {
  return (
    <a
      href="http://pf.kakao.com/_pxcPxen"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        width: "60px",
        height: "60px",
        overflow: "visible",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
      }}
    >
      <img
        src="/images/kakao.png"
        alt="카카오 채널 문의"
        width={60}
        height={60}
        style={{ display: "block" }}
      />
    </a>
  );
}
