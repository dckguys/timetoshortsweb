"use client";

import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./ui/SectionContainer";
import SectionHeading from "./ui/SectionHeading";
import Badge from "./ui/Badge";
import styles from "./Service.module.css";

export default function Service() {
  return (
    <section id="service">
      {/* Part 1: 압도적인 물량 */}
      <SectionContainer
        align="left"
        style={{
          backgroundImage: "url(/images/BG_Section04.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <AnimatedSection>
          <Badge variant="solid">Successful Viral Agency</Badge>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <SectionHeading>
            고객의 눈에 띄는 유일한 해법,
            <br />
            <span className="accent">결국 &lsquo;압도적인 물량&rsquo;입니다</span>
          </SectionHeading>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <p className={styles.desc}>
            타임투쇼츠의 전략은 단순합니다.
            <br />
            고객이 유튜브를 켜도, 인스타를 켜도, 틱톡을 켜도
            <br />
            오로지 당신을 마주치게 하는 것.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.45}>
          <p className={styles.highlight}>
            <span className="accent">압도적인 물량</span>이 당신의 브랜드를{" "}
            <span className="accent">가장 핫한 트렌드</span>로 만듭니다.
          </p>
        </AnimatedSection>
      </SectionContainer>

      {/* Part 2: 크리에이터 포인트 */}
      <SectionContainer
        align="right"
        style={{
          backgroundImage: "url(/images/BG_Section05.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <AnimatedSection>
          <SectionHeading>
            타임투쇼츠의 크리에이터들이 만드는
            <br />
            <span className="accent">진짜 트렌드</span>
          </SectionHeading>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={styles.points}>
            <div className={styles.pointCard}>
              <Badge variant="outline">POINT 1. Real Creator Network</Badge>
              <p className={styles.pointDesc}>
                유령 계정이나 매크로 봇은 쓰지 않습니다.
                <br />
                타임투쇼츠가 보유한 수백 명의 소속 크리에이터가
                <br />
                각자의 계정에서 직접 업로드하여{" "}
                <span className="bold white">&lsquo;진성 트래픽&rsquo;</span>을 만들어냅니다
              </p>
            </div>

            <div className={styles.pointCard}>
              <Badge variant="outline">POINT 2. Smart Variation</Badge>
              <p className={styles.pointDesc}>
                원본 영상에 미세한 편집과 변형을 더해 플랫폼이
                <br />
                <span className="bold white">서로 다른 새로운 콘텐츠로 인식</span>하도록 재가공합니다
              </p>
            </div>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </section>
  );
}
