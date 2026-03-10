"use client";

import { Fragment } from "react";

import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./ui/SectionContainer";
import SectionHeading from "./ui/SectionHeading";
import Badge from "./ui/Badge";
import styles from "./Process.module.css";

const steps = [
  {
    step: "STEP 01. 전달",
    desc: "홍보할 원본 영상(또는 링크)를\n전달받습니다",
  },
  {
    step: "STEP 02. 가공 및 확산",
    desc: "중복 회피를 위한 편집 후,\n수백 명의 크리에이터 채널에 동시에 업로드합니다.",
  },
  {
    step: "STEP 03. 리포트",
    desc: "총 조회수, 도달률 등\n성과 데이터를 정리하여 제공합니다.",
  },
];

export default function Process() {
  return (
    <SectionContainer id="process" align="center">
      <AnimatedSection>
        <SectionHeading size="lg">
          <span className="accent">과정</span><span className={styles.gray}>은 </span>숏츠<span className={styles.gray}>처럼, </span>
          <span className="accent">결과</span><span className={styles.gray}>는 </span>롱폼<span className={styles.gray}>처럼</span>
        </SectionHeading>
      </AnimatedSection>

      <div className={styles.steps}>
        {steps.map((item, idx) => (
          <Fragment key={idx}>
            {idx > 0 && (
              <AnimatedSection delay={0.15 * (idx + 1)} className={styles.arrowWrap}>
                <svg className={styles.arrow} width="100" height="32" viewBox="-4 -4 102 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="12" x2="87" y2="12" stroke="currentColor" strokeWidth="3.5" />
                  <path d="M80 4L90 12L80 20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </AnimatedSection>
            )}
            <AnimatedSection delay={0.15 * (idx + 1)}>
              <div className={styles.stepCard}>
                <Badge variant="outline">{item.step}</Badge>
                <p className={styles.stepDesc}>
                  {item.desc.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < item.desc.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </AnimatedSection>
          </Fragment>
        ))}
      </div>
    </SectionContainer>
  );
}
