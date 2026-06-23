"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const videos = [
  {
    src: "/videos/showroom-1.mp4",
    label: "Sports car in showroom",
  },
  {
    src: "/videos/showroom-2.mp4",
    label: "Close-up of premium car",
  },
  {
    src: "/videos/showroom-3.mp4",
    label: "Luxury car at sunset",
  },
];

const CROSSFADE_MS = 1200;
const MIN_PLAY_MS = 6000;

export function HeroVideoBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [useStaticFallback, setUseStaticFallback] = useState(false);
  const [videosReady, setVideosReady] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => {
      const next = (current + 1) % videos.length;
      setIncomingIndex(next);

      const incomingVideo = videoRefs.current[next];
      if (incomingVideo) {
        incomingVideo.currentTime = 0;
        void incomingVideo.play().catch(() => {
          setUseStaticFallback(true);
        });
      }

      transitionTimeoutRef.current = setTimeout(() => {
        setActiveIndex(next);
        setIncomingIndex(null);
      }, CROSSFADE_MS);

      return current;
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setUseStaticFallback(true);
      return;
    }

    const firstVideo = videoRefs.current[0];
    if (!firstVideo) return;

    void firstVideo.play().then(() => {
      setVideosReady(true);
      playTimeoutRef.current = setTimeout(goToNext, MIN_PLAY_MS);
    }).catch(() => {
      setUseStaticFallback(true);
    });

    return clearTimers;
  }, [clearTimers, goToNext]);

  useEffect(() => {
    if (useStaticFallback || incomingIndex !== null) return;

    playTimeoutRef.current = setTimeout(goToNext, MIN_PLAY_MS);
    return clearTimers;
  }, [activeIndex, clearTimers, goToNext, incomingIndex, useStaticFallback]);

  if (useStaticFallback) {
    return (
      <Image
        src="/images/hero.png"
        alt="Premium car in cinematic lighting"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    );
  }

  return (
    <>
      {videos.map((video, index) => {
        const isActive = index === activeIndex;
        const isIncoming = index === incomingIndex;
        const isVisible = isActive || isIncoming;

        return (
          <video
            key={video.src}
            ref={(element) => {
              videoRefs.current[index] = element;
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            } ${isIncoming ? "z-[1]" : isActive ? "z-0" : "-z-10"}`}
            src={video.src}
            poster="/images/hero.png"
            muted
            playsInline
            loop={videos.length === 1}
            preload={index === 0 ? "auto" : "metadata"}
            aria-hidden
          />
        );
      })}

      {!videosReady && (
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
      )}
    </>
  );
}
