"use client";

import { motion } from "framer-motion";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" data-section>
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge variant="outline">
            국내 유일 <span className="accent">실명 크리에이터</span> 기반 매스 시딩
          </Badge>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          TIME TO SHORTS
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          단순 배포를 넘어, 조회수가 매출로 이어지는 퍼포먼스 구조를 설계합니다.
        </motion.p>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            as="a"
            href="#contact"
            variant="primary"
            size="lg"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              window.dispatchEvent(
                new CustomEvent("navigateToSection", { detail: "contact" })
              );
            }}
          >
            무료 상담 신청하기 →
          </Button>
          <Button
            as="a"
            href="/api/download"
            variant="secondary"
            size="lg"
          >
            서비스소개서 다운로드
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
