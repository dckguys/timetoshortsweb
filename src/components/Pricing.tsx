"use client";

import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./ui/SectionContainer";
import SectionHeading from "./ui/SectionHeading";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import styles from "./Pricing.module.css";

const distributionPlans = [
  {
    name: "Standard (30건)",
    desc: "시장 반응을 확인하고 싶은\n초기 브랜드를 위한 실속형 패키지",
    features: [
      "Youtube 10건",
      "100% 재업로드 보장",
      "Instagram 10건",
      "중복 회피 편집",
      "TikTok 10건",
      "기본 성과 리포트",
    ],
    price: "1,500,000₩ (VAT 별도)",
    popular: false,
  },
  {
    name: "Deluxe (90건)",
    desc: "알고리즘 반응을 이끌어내는\n타임투쇼츠의 주력 상품",
    features: [
      "Youtube 30건",
      "Standard 혜택 포함",
      "Instagram 30건",
      "키워드/해시태그 최적화",
      "TikTok 30건",
      "상세 성과 리포트",
    ],
    price: "4,300,000₩ (VAT 별도)",
    popular: true,
  },
  {
    name: "Premium (300건)",
    desc: "카테고리 내 트렌드를 선점하는\n물량 공세",
    features: [
      "Youtube 100건",
      "Deluxe 혜택 포함",
      "Instagram 100건",
      "전담 매니저 배정(1:1)",
      "TikTok 100건",
      "주간/월간 심층 분석",
    ],
    price: "13,000,000₩ (VAT 별도)",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing">
      {/* 배포형 상품 */}
      <SectionContainer scrollable>
        <AnimatedSection>
          <SectionHeading
            subtitle="목표하는 파급력의 크기에 맞춰 최적의 플랜을 선택하세요."
            className={styles.pricingHeading}
          >
            <span className={styles.titleAccent}>Pricing Plan (배포형 상품)</span>
          </SectionHeading>
        </AnimatedSection>

        <div className={styles.cards}>
          {distributionPlans.map((plan, idx) => (
            <AnimatedSection key={idx} delay={0.15 * (idx + 1)}>
              <div className={`${styles.card} ${plan.popular ? styles.popularCard : ""}`}>
                {plan.popular && (
                  <div className={styles.popularBadgeWrap}>
                    <Badge variant="filled">Most Popular</Badge>
                  </div>
                )}
                <h3 className={`${styles.planName} ${plan.popular ? "accent" : ""}`}>
                  {plan.name}
                </h3>
                <p className={styles.planDesc}>
                  {plan.desc.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < plan.desc.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <ul className={styles.features}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className={styles.feature}>
                      <span className={styles.checkIcon}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className={`${styles.priceTag} ${plan.popular ? styles.pinkPrice : ""}`}>
                  {plan.price}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </SectionContainer>

      {/* 제작+배포형 상품 */}
      <SectionContainer>
        <AnimatedSection>
          <SectionHeading
            subtitle="목표하는 파급력의 크기에 맞춰 최적의 플랜을 선택하세요."
            className={styles.pricingHeading}
          >
            <span className={styles.titleAccent}>Pricing Plan (제작+배포형 상품)</span>
          </SectionHeading>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={styles.gradientCard}>
            <h3 className={styles.cardTitle}>
              영상이 없으신가요?
              <br />
              <span className="accent">기획부터 제작까지 한 번에.</span>
            </h3>
            <p className={styles.cardDesc}>
              바이럴에 최적화된 숏폼 콘텐츠를 직접 제작해 드립니다.
            </p>
            <ul className={styles.productionList}>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span className="accent bold">기획</span> 터지는 소구점 발굴 및 스크립트 작성
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span className="accent bold">촬영</span> 전문 모델 및 스튜디오
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span className="accent bold">편집</span> 시선을 끄는 컷 편집과 자막 효과
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span className="accent bold">가격</span> 건당 별도 문의 (제작 규모에 따라 상이)
              </li>
            </ul>
          </div>
        </AnimatedSection>
      </SectionContainer>

      {/* 기업형 상품 */}
      <SectionContainer>
        <AnimatedSection>
          <SectionHeading
            subtitle="목표하는 파급력의 크기에 맞춰 최적의 플랜을 선택하세요."
            className={styles.pricingHeading}
          >
            <span className={styles.titleAccent}>Pricing Plan (기업형 상품, 대량 배포)</span>
          </SectionHeading>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={styles.gradientCard}>
            <h3 className={styles.cardTitle}>
              <span className="accent">300건 이상의 초대형 프로젝트</span>가
              <br />
              필요하신가요?
            </h3>
            <p className={styles.cardDesc}>
              기업 전용 커스텀 플랜을 제안해 드립니다.
            </p>
            <Button as="a" href="#contact" variant="primary" size="lg">
              별도 문의하기 ↗
            </Button>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </section>
  );
}
