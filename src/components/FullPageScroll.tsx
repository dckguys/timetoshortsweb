"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import styles from "./FullPageScroll.module.css";

export default function FullPageScroll({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const lastNavTime = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionCountRef = useRef(0);
  const COOLDOWN_MS = 300;

  // 섹션 개수 파악
  useEffect(() => {
    if (wrapperRef.current) {
      sectionCountRef.current =
        wrapperRef.current.querySelectorAll("[data-section]").length;
    }
  }, []);

  const getSections = useCallback((): HTMLElement[] => {
    if (!wrapperRef.current) return [];
    return Array.from(
      wrapperRef.current.querySelectorAll<HTMLElement>("[data-section]")
    );
  }, []);

  const goToSection = useCallback((index: number) => {
    const now = Date.now();
    if (
      index < 0 ||
      index >= sectionCountRef.current ||
      index === currentIndexRef.current ||
      isAnimating.current ||
      now - lastNavTime.current < COOLDOWN_MS
    )
      return;

    isAnimating.current = true;
    lastNavTime.current = now;
    currentIndexRef.current = index;
    setCurrentIndex(index);

    // 안전장치: transitionend가 안 걸릴 경우 대비
    setTimeout(() => {
      isAnimating.current = false;
    }, 800);
  }, []);

  // transition 끝나면 잠금 해제
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName === "transform") {
        isAnimating.current = false;
      }
    };

    wrapper.addEventListener("transitionend", onEnd);
    return () => wrapper.removeEventListener("transitionend", onEnd);
  }, []);

  // scrollable 섹션 내부 스크롤 체크
  const checkSectionScroll = useCallback(
    (deltaY: number): "navigate-up" | "navigate-down" | "allow" | "block" => {
      const sections = getSections();
      const idx = currentIndexRef.current;
      const section = sections[idx];

      // scrollable 섹션인지 확인
      const isScrollable = section.scrollHeight > section.clientHeight + 2;
      if (!isScrollable) return "allow";

      const atTop = section.scrollTop <= 0;
      const atBottom =
        section.scrollTop + section.clientHeight >= section.scrollHeight - 2;

      if (deltaY < 0 && atTop) return "navigate-up";
      if (deltaY > 0 && atBottom) {
        // 마지막 섹션이면 더 이상 넘기지 않음
        if (idx === sections.length - 1) return "block";
        return "navigate-down";
      }
      // 내부에서 스크롤 가능
      return "allow";
    },
    [getSections]
  );

  // ── Wheel (데스크톱) ──
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isAnimating.current || Date.now() - lastNavTime.current < COOLDOWN_MS) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 50) return;

      const idx = currentIndexRef.current;
      const result = checkSectionScroll(e.deltaY);

      if (result === "allow") {
        // 내부 스크롤 허용
        return;
      }
      if (result === "navigate-up") {
        e.preventDefault();
        goToSection(idx - 1);
        return;
      }
      if (result === "navigate-down") {
        e.preventDefault();
        goToSection(idx + 1);
        return;
      }
      if (result === "block") {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      goToSection(idx + direction);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goToSection, getSections, checkSectionScroll]);

  // ── Touch (모바일) ──
  useEffect(() => {
    let startY = 0;
    let startTime = 0;
    let isSwiping = false;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
      isSwiping = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isSwiping || isAnimating.current) return;

      const deltaY = startY - e.touches[0].clientY;
      const result = checkSectionScroll(deltaY);

      // scrollable 섹션: 내부 스크롤 허용
      if (result === "allow") return;

      // 나머지: 네이티브 스크롤 차단
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isSwiping || isAnimating.current) return;
      isSwiping = false;

      const deltaY = startY - e.changedTouches[0].clientY;
      const elapsed = Date.now() - startTime;

      // 스와이프 판정: 최소 40px 이동 또는 빠른 플릭(300ms 이내 30px)
      const isSwipe =
        Math.abs(deltaY) > 40 ||
        (Math.abs(deltaY) > 30 && elapsed < 300);

      if (!isSwipe) return;

      const idx = currentIndexRef.current;
      const result = checkSectionScroll(deltaY);

      if (result === "navigate-up") {
        goToSection(idx - 1);
        return;
      }
      if (result === "navigate-down") {
        goToSection(idx + 1);
        return;
      }
      if (result === "allow" || result === "block") return;

      const direction = deltaY > 0 ? 1 : -1;
      goToSection(idx + direction);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goToSection, getSections, checkSectionScroll]);

  // ── Keyboard ──
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToSection(currentIndexRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToSection(currentIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToSection]);

  // ── Navigation 이벤트 ──
  useEffect(() => {
    const handler = (e: Event) => {
      const { detail: targetId } = e as CustomEvent<string>;

      // 네비게이션 클릭 시 애니메이션 잠금 강제 해제
      isAnimating.current = false;

      if (targetId === "top") {
        goToSection(0);
        return;
      }

      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const sections = getSections();
      const targetSection = targetEl.hasAttribute("data-section")
        ? targetEl
        : targetEl.querySelector<HTMLElement>("[data-section]");

      if (targetSection) {
        const index = sections.indexOf(targetSection);
        if (index >= 0) goToSection(index);
      }
    };

    window.addEventListener("navigateToSection", handler);
    return () => window.removeEventListener("navigateToSection", handler);
  }, [getSections, goToSection]);

  return (
    <main className={styles.container}>
      <div
        ref={wrapperRef}
        className={styles.wrapper}
        style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
      >
        {children}
      </div>
    </main>
  );
}
