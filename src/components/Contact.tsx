"use client";

import { useState, FormEvent } from "react";
import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./ui/SectionContainer";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import styles from "./Contact.module.css";

const categoryOptions = [
  "뷰티&패션",
  "미디어&엔터테인먼트",
  "식음료",
  "리테일(유통)",
  "반려동물",
  "건강기능식",
  "IT/앱서비스",
  "제조",
  "교육/강의",
  "여행&숙박",
  "콘텐츠",
  "기타",
];

const videoOptions = [
  "있음(배포만 진행)",
  "없음(제작+배포 필요)",
  "일부 있음(편집 필요)",
];

const budgetOptions = [
  "150만 원 미만(Standard)",
  "150~500만 원(Deluxe)",
  "500~1,500만 원(Premium)",
  "1,500만 원 이상(Enterprise)",
  "미정",
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        company: formData.get("company"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        category: formData.get("category"),
        description: formData.get("description"),
        has_video: formData.get("hasVideo"),
        budget: formData.get("budget"),
        note: formData.get("note") || null,
      }),
    });

    setIsSubmitting(false);

    if (!res.ok) {
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <SectionContainer id="contact" narrow scrollable>
        <div className={styles.successMessage}>
          <h2 className={styles.successTitle}>상담 신청이 완료되었습니다!</h2>
          <p className={styles.successDesc}>
            담당자가 확인 후 빠르게 연락드리겠습니다.
          </p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="contact" narrow scrollable align="left">
      <AnimatedSection>
        <SectionHeading
          subtitle="타임투쇼츠와 함께 지금 바로 시작하세요."
          className={styles.heading}
        >
          이제, 세상이 <span className="accent">당신의 브랜드</span>로 물들여질 차례입니다
        </SectionHeading>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>담당자 성함/직급</label>
              <input type="text" className={styles.input} required name="name" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>소속 (회사명)</label>
              <input type="text" className={styles.input} required name="company" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>휴대전화</label>
              <input type="tel" className={styles.input} required name="phone" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>이메일</label>
              <input type="email" className={styles.input} required name="email" />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>업종 / 카테고리</label>
            <select className={styles.select} required name="category">
              <option value="">선택해주세요</option>
              {categoryOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>의뢰 건 (제품/서비스/콘텐츠) 설명</label>
            <textarea className={styles.textarea} rows={3} required name="description" />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>원본 영상 유무</label>
              <select className={styles.select} required name="hasVideo">
                <option value="">선택해주세요</option>
                {videoOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>광고 예산</label>
              <select className={styles.select} required name="budget">
                <option value="">선택해주세요</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>기타 문의사항</label>
            <textarea
              className={styles.textarea}
              rows={2}
              name="note"
              placeholder="(요청하시는 업무의 스코프, 일정 등을 가급적 상세히 적어주시면 담당자를 통해 연락드리도록 하겠습니다)"
            />
          </div>

          <div className={styles.submitWrap}>
            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "제출 중..." : "무료 상담 및 견적 요청하기 →"}
            </Button>
          </div>
        </form>
      </AnimatedSection>
    </SectionContainer>
  );
}
