"use client";

import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./ui/SectionContainer";
import SectionHeading from "./ui/SectionHeading";
import Badge from "./ui/Badge";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about">
      {/* Part 1: 좋은 것은 마땅히 */}
      <SectionContainer
        align="left"
        style={{
          backgroundImage: "url(/images/BG_Section02.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <AnimatedSection>
          <Badge variant="solid">Good things deserve to be known</Badge>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <SectionHeading>
            <span className="accent">좋은 것은 마땅히</span>
            <br />
            세상에 널리 알려져야 합니다.
          </SectionHeading>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <p className={styles.desc}>
            우리는 가치 있는 브랜드가
            <br />
            수많은 콘텐츠 속에 묻히지 않도록 세상에 퍼뜨립니다.
          </p>
        </AnimatedSection>
      </SectionContainer>

      {/* Part 2: 알고리즘의 선택 */}
      <SectionContainer
        align="right"
        style={{
          backgroundImage: "url(/images/BG_Section03.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <AnimatedSection>
          <SectionHeading>
            하지만 잘 만든 영상 하나만으로는
            <br />
            <span className="accent">알고리즘의 선택</span>을 받기 쉽지 않습니다
          </SectionHeading>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <p className={styles.desc}>
            아무리 뛰어난 제품도, 아무리 재밌는 콘텐츠도
            <br />
            고객의 스크롤 0.5초를 잡지 못하면 사라집니다
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <p className={styles.question}>
            지금 여러분의 브랜드는 고객들에게 진짜 &lsquo;노출&rsquo;되고 있나요?
          </p>
        </AnimatedSection>
      </SectionContainer>
    </section>
  );
}
