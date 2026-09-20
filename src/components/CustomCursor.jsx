import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.12,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const enterLink = () => {
      gsap.to(cursor, {
        scale: 1.8,
        duration: 0.3,
      });

      gsap.to(follower, {
        scale: 1.4,
        opacity: 0.4,
        duration: 0.3,
      });
    };

    const leaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      });

      gsap.to(follower, {
        scale: 1,
        opacity: 0.2,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor]"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", enterLink);
      element.addEventListener("mouseleave", leaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", enterLink);
        element.removeEventListener("mouseleave", leaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 md:block"
      />

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
      />
    </>
  );
};

export default CustomCursor;