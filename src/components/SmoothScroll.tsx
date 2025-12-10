import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make Lenis globally accessible for other components if needed (like Header)
export let lenis: Lenis | null = null;

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker for smoother animation sync
    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing to prevent stuttering
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis?.destroy();
      lenis = null;
      gsap.ticker.remove((time) => {
        lenis?.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
};
