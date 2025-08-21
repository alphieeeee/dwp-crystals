import { gsap } from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const usePageTransition = () => {
  const pageTransitionIn = () => {
    const mainEl = document.getElementById("main-container");
    const overlayEl = document.querySelectorAll(".transition-overlay");
    if (mainEl && overlayEl.length) {
      gsap.set(mainEl, { autoAlpha: 0 });
      gsap.to(overlayEl, {
        delay: 0.5,
        duration: 0.6,
        autoAlpha: 0,
        ease: "sine.out",
        force3D: true,
      });
      gsap.to(mainEl, {
        duration: 0.6,
        autoAlpha: 1,
        ease: "sine.out",
        force3D: true,
      });
    }
  };

  const pageTransitionOut = (href: string, router: AppRouterInstance) => {
    const mainEl = document.getElementById("main-container");
    const overlayEl = document.querySelectorAll(".transition-overlay");
    if (mainEl && overlayEl.length) {
      gsap.to(mainEl, {
        duration: 0.6,
        autoAlpha: 0,
        ease: "sine.in",
        force3D: true,
      });
      gsap.to(overlayEl, {
        duration: 0.6,
        autoAlpha: 1,
        ease: "sine.in",
        force3D: true,
        onComplete: () => {
          setTimeout(() => {
            router.push(href);
          }, 100);
        },
      });
    }
  };

  return {
    pageTransitionIn,
    pageTransitionOut,
  };
};
