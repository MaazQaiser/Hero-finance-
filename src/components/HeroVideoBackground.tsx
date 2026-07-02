"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const videos = [
  { src: "/videos/showroom-1.mp4", label: "Sports car in showroom" },
  { src: "/videos/showroom-2.mp4", label: "Close-up of premium car" },
  { src: "/videos/showroom-3.mp4", label: "Luxury car at sunset" },
];

const CROSSFADE_MS = 1200;
const DISPLAY_MS = 6000;

export function HeroVideoBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const transitioningRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const displayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (displayTimerRef.current) {
      clearTimeout(displayTimerRef.current);
      displayTimerRef.current = null;
    }
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const pauseVideo = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.pause();
  }, []);

  const prepareAndPlay = useCallback(async (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return false;

    try {
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        video.load();
        await new Promise<void>((resolve, reject) => {
          const onReady = () => {
            cleanup();
            resolve();
          };
          const onError = () => {
            cleanup();
            reject(new Error("Video failed to load"));
          };
          const cleanup = () => {
            video.removeEventListener("canplay", onReady);
            video.removeEventListener("error", onError);
          };
          video.addEventListener("canplay", onReady);
          video.addEventListener("error", onError);
        });
      }

      video.currentTime = 0;
      await video.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimers();
    if (reducedMotionRef.current) return;

    displayTimerRef.current = setTimeout(() => {
      void goToNextRef.current();
    }, DISPLAY_MS);
  }, [clearTimers]);

  const goToNext = useCallback(async () => {
    if (reducedMotionRef.current || transitioningRef.current) return;

    transitioningRef.current = true;
    clearTimers();

    const current = activeIndexRef.current;
    const next = (current + 1) % videos.length;

    setIncomingIndex(next);
    await prepareAndPlay(next);

    fadeTimerRef.current = setTimeout(() => {
      pauseVideo(current);

      activeIndexRef.current = next;
      setActiveIndex(next);
      setIncomingIndex(null);
      transitioningRef.current = false;

      scheduleNext();
    }, CROSSFADE_MS);
  }, [clearTimers, pauseVideo, prepareAndPlay, scheduleNext]);

  const goToNextRef = useRef(goToNext);
  goToNextRef.current = goToNext;

  const handleVideoEnded = useCallback(
    (index: number) => {
      if (reducedMotionRef.current) return;
      if (index !== activeIndexRef.current) return;
      if (transitioningRef.current) return;
      void goToNextRef.current();
    },
    [],
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      const prefersReduced = motionQuery.matches;
      reducedMotionRef.current = prefersReduced;

      if (prefersReduced) {
        clearTimers();
        transitioningRef.current = false;
        const firstVideo = videoRefs.current[0];
        if (firstVideo) {
          firstVideo.pause();
          firstVideo.currentTime = 0;
        }
        return;
      }

      void prepareAndPlay(0).then((started) => {
        if (started) scheduleNext();
      });
    };

    applyMotionPreference();
    motionQuery.addEventListener("change", applyMotionPreference);

    return () => {
      motionQuery.removeEventListener("change", applyMotionPreference);
      clearTimers();
    };
  }, [clearTimers, prepareAndPlay, scheduleNext]);

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
            muted
            playsInline
            preload="auto"
            onEnded={() => handleVideoEnded(index)}
            aria-hidden
          />
        );
      })}
    </>
  );
}
