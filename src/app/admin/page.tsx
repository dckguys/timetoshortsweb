"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./admin.module.css";

interface Inquiry {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  category: string;
  description: string;
  has_video: string;
  budget: string;
  note: string | null;
  contacted: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInquiries = useCallback(async (pw: string) => {
    setLoading(true);
    const res = await fetch("/api/admin/inquiries", {
      headers: { "x-admin-password": pw },
    });

    if (!res.ok) {
      setError("인증 실패");
      setLoading(false);
      return;
    }

    const { data } = await res.json();
    setInquiries(data);
    setAuthenticated(true);
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    fetchInquiries(password);
  };

  const toggleContacted = async (id: number, current: boolean) => {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id, contacted: !current }),
    });

    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, contacted: !current } : item
      )
    );
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!authenticated) {
    return (
      <div className={styles.loginWrap}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h1 className={styles.loginTitle}>Admin</h1>
          <input
            type="password"
            className={styles.loginInput}
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? "확인 중..." : "로그인"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>문의 관리</h1>
        <span className={styles.count}>총 {inquiries.length}건</span>
      </header>

      <div className={styles.list}>
        {inquiries.map((item) => (
          <div
            key={item.id}
            className={`${styles.card} ${item.contacted ? styles.contacted : ""}`}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardMeta}>
                <span className={styles.date}>{formatDate(item.created_at)}</span>
                <span className={item.contacted ? styles.statusDone : styles.statusPending}>
                  {item.contacted ? "연락 완료" : "대기 중"}
                </span>
              </div>
              <button
                className={`${styles.checkBtn} ${item.contacted ? styles.checked : ""}`}
                onClick={() => toggleContacted(item.id, item.contacted)}
              >
                {item.contacted ? "✓ 처리완료" : "연락 처리"}
              </button>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>담당자</span>
                  <span className={styles.value}>{item.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>소속</span>
                  <span className={styles.value}>{item.company}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>전화</span>
                  <span className={styles.value}>{item.phone}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>이메일</span>
                  <span className={styles.value}>{item.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>업종</span>
                  <span className={styles.value}>{item.category}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>영상 유무</span>
                  <span className={styles.value}>{item.has_video}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>예산</span>
                  <span className={styles.value}>{item.budget}</span>
                </div>
              </div>

              <div className={styles.descSection}>
                <span className={styles.label}>의뢰 내용</span>
                <p className={styles.descText}>{item.description}</p>
              </div>

              {item.note && (
                <div className={styles.descSection}>
                  <span className={styles.label}>기타 문의</span>
                  <p className={styles.descText}>{item.note}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {inquiries.length === 0 && (
          <p className={styles.empty}>아직 접수된 문의가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
