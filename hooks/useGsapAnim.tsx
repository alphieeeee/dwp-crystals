"use client";
import React, { RefObject } from "react";
// import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

type RefLike<T extends HTMLElement = HTMLElement> =
  | React.RefObject<T | null>
  | { current: T | null };

const getCurrent = <T extends HTMLElement>(r?: RefLike<T>) =>
  (r?.current ?? null) as T | null;

export const useGsapAnim = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin);
  }, []);

  const animReveal = <T extends HTMLElement>(
    elementRef: RefLike<T>, // element to animate
    triggerRef?: RefLike<HTMLElement>, // trigger element
    delay: number = 0, // delay of animation
    duration: number = 0.5, // duration of animation
    markers: boolean = false, // show markers
    animOnce: boolean = false, // animate once
    inViewport: boolean = true, // animate on viewport
  ) => {
    if (elementRef.current) {
      const el = getCurrent(elementRef);
      if (!el) return;
      const triggerEL = (getCurrent(triggerRef) as HTMLElement) ?? el;
      const revealTL = gsap.timeline({
        paused: true,
        delay: delay,
        defaults: { ease: "sine.inOut" },
      });
      gsap.set(el, { opacity: 0 });
      revealTL.to(el, { duration: duration, opacity: 1 });

      // ENABLE ANIMATION ON VIEWPORT
      if (inViewport) {
        // ENTER
        const revealEnterST = ScrollTrigger.create({
          trigger: triggerEL,
          start: "clamp(top 95%)",
          onEnter: () => revealTL.play(),
          markers: markers,
        });
        // RESET ON LEAVE BACK
        if (!animOnce) {
          const revealLeaveBackST = ScrollTrigger.create({
            trigger: triggerEL,
            start: "top bottom",
            onLeaveBack: () => revealTL.pause(0),
            markers: markers,
          });
        }
      } else {
        revealTL.play();
      }
    }
  };

  const animPanning = <T extends HTMLElement>(
    elementRef: RefLike<T>, // element to animate
    triggerRef?: RefLike<HTMLElement>, // trigger element
    delay: number = 0, // delay of animation
    duration: number = 0.5, // duration of animation
    markers: boolean = false, // show markers
    animOnce: boolean = false, // animate once
    inViewport: boolean = true, // animate on viewport
    onScroll: boolean = false, // animate on scroll
    starting: string = "top 95%", // scroll trigger start
    ending: string = "bottom 5%", // scroll trigger end
    direction: string = 'left', // direction of panning
    from: number = 100, // from position
    to: number = 0, // to position
    fade: string = 'in' // fade in or out
  ) => {
    if (elementRef.current) {
      const el = getCurrent(elementRef);
      if (!el) return;
      const triggerEL = (getCurrent(triggerRef) as HTMLElement) ?? el;
      let fromParams = {};
      let toParams = {};
      const triggerStart = starting;
      const triggerEnd = ending;
      if(direction === 'left' || direction === 'right') {
        if(fade === 'in') {
          fromParams = { opacity: 0, xPercent: from };
          toParams = { opacity: 1, xPercent: to };
        } else if(fade === 'out') {
          fromParams = { opacity: 1, xPercent: from };
          toParams = { opacity: 0, xPercent: to };
        } else {
          fromParams = { xPercent: from };
          toParams = { xPercent: to };
        }
      } else {
        if(fade === 'in') {
          fromParams = { opacity: 0, yPercent: from };
          toParams = { opacity: 1, yPercent: to };
        } else if(fade === 'out') {
          fromParams = { opacity: 1, yPercent: from };
          toParams = { opacity: 0, yPercent: to };
        } else {
          fromParams = { yPercent: from };
          toParams = { yPercent: to };
        }
      }
      const panningTL = gsap.timeline({ paused: true, delay: delay, defaults: { ease: 'sine.inOut' } });
      gsap.set(el, { ...fromParams });
      panningTL.to(el, { duration: duration, ...toParams });

      if(onScroll) {
        const panningEnterST = ScrollTrigger.create({
          animation: panningTL,
          trigger: triggerEL,
          start: `clamp(${triggerStart})`,
          end: `clamp(${triggerEnd})`,
          markers: markers,
          scrub: true,
        });
      } else {
        if(inViewport) {
          // ENTER
          const panningEnterST = ScrollTrigger.create({
            trigger: triggerEL,
            start: 'clamp(top 95%)',
            onEnter: () => panningTL.play(),
            markers: markers,
          });
          // RESET ON LEAVE BACK
          if(!animOnce) {
            const panningLeaveBackST = ScrollTrigger.create({
              trigger: triggerEL,
              start: 'top bottom',
              onLeaveBack: () => panningTL.pause(0),
              markers: markers,
            });
          }
        } else {
          panningTL.play();
        }
      }
    }
  }

  const animScale = <T extends HTMLElement>(
    elementRef: RefLike<T>, // element to animate
    triggerRef?: RefLike<HTMLElement>, // trigger element
    delay: number = 0, // delay of animation
    duration: number = 0.5, // duration of animation
    markers: boolean = false, // show markers
    animOnce: boolean = false, // animate once
    inViewport: boolean = true, // animate on viewport
    origin: string = "center center", // direction of panning
    from: number = 1, // from position
    to: number = 0, // to position
    scale: string = "up", // up in or down
  ) => {
    if (elementRef.current) {
      const el = getCurrent(elementRef);
      if (!el) return;
      const triggerEL = (getCurrent(triggerRef) as HTMLElement) ?? el;
      let fromParams = {};
      let toParams = {};
      if (scale === "up") {
        fromParams = { transformOrigin: origin, scale: from };
        toParams = { scale: to };
      } else {
        fromParams = { transformOrigin: origin, xPercent: from };
        toParams = { xPercent: to };
      }
      const scaleTL = gsap.timeline({
        paused: true,
        delay: delay,
        defaults: { ease: "elastic.out(1, 0.3)" },
      });
      gsap.set(el, { ...fromParams });
      scaleTL.to(el, { duration: duration, ...toParams });

      if (inViewport) {
        // ENTER
        const scaleEnterST = ScrollTrigger.create({
          trigger: triggerEL,
          start: "clamp(top 95%)",
          onEnter: () => scaleTL.play(),
          markers: markers,
        });
        // RESET ON LEAVE BACK
        if (!animOnce) {
          const scaleLeaveBackST = ScrollTrigger.create({
            trigger: triggerEL,
            start: "top bottom",
            onLeaveBack: () => scaleTL.pause(0),
            markers: markers,
          });
        }
      } else {
        scaleTL.play();
      }
    }
  };

  const animWidth = <T extends HTMLElement>(
    elementRef: RefLike<T>, // element to animate
    triggerRef?: RefLike<HTMLElement>, // trigger element
    delay: number = 0, // delay of animation
    duration: number = 0.5, // duration of animation
    markers: boolean = false, // show markers
    animOnce: boolean = false, // animate once
    inViewport: boolean = true, // animate on viewport
    origin: string = "center center", // direction of panning
    from: number = 1, // from position
    to: number = 0, // to position
    scale: string = "up", // up in or down
  ) => {
    if (elementRef.current) {
      const el = getCurrent(elementRef);
      if (!el) return;
      const triggerEL = (getCurrent(triggerRef) as HTMLElement) ?? el;
      let fromParams = {};
      let toParams = {};
      if (scale === "up") {
        fromParams = { transformOrigin: origin, scaleX: from };
        toParams = { scaleX: to };
      } else {
        fromParams = { transformOrigin: origin, xPercent: from };
        toParams = { xPercent: to };
      }
      const scaleWidthTL = gsap.timeline({
        paused: true,
        delay: delay,
        defaults: { ease: "expoScale(0.5,7,none)" },
      });
      gsap.set(el, { ...fromParams });
      scaleWidthTL.to(el, { duration: duration, ...toParams });

      if (inViewport) {
        // ENTER
        const scaleWidthEnterST = ScrollTrigger.create({
          trigger: triggerEL,
          start: "clamp(top 95%)",
          onEnter: () => scaleWidthTL.play(),
          markers: markers,
        });
        // RESET ON LEAVE BACK
        if (!animOnce) {
          const scaleWidthLeaveBackST = ScrollTrigger.create({
            trigger: triggerEL,
            start: "top bottom",
            onLeaveBack: () => scaleWidthTL.pause(0),
            markers: markers,
          });
        }
      } else {
        scaleWidthTL.play();
      }
    }
  };

  const animRandomChars = <T extends HTMLElement>(
    elementRef: RefLike<T>, // element to animate
    triggerRef?: RefLike<HTMLElement>, // trigger element
    delay: number = 0, // delay of animation
    duration: number = 1, // duration of animation
    markers: boolean = false, // show
    animOnce: boolean = false, // animate once
    inViewport: boolean = true, // animate on viewport
    posParams: number = 2, // position parameters
  ) => {
    if (elementRef.current) {
      const el = getCurrent(elementRef);
      if (!el) return;
      const triggerEL = (getCurrent(triggerRef) as HTMLElement) ?? el;
      const mySplitText = new SplitText(elementRef.current, {
        type: "chars, words",
      });
      const splitTextTL = gsap.timeline({
        paused: true,
        delay: delay,
        defaults: { ease: "sine.inOut" },
      });
      const numChars = mySplitText.chars.length;
      for (var i = 0; i < numChars; i++) {
        splitTextTL.from(
          mySplitText.chars[i],
          {
            duration: duration,
            opacity: 0,
          },
          Math.random() * posParams,
        );
        // console.log('splitTextTL: ', splitTextTL);
      }

      if (inViewport) {
        // ENTER
        const randomAnimEnterST = ScrollTrigger.create({
          trigger: elementRef.current,
          start: "top bottom",
          markers: markers,
          onEnter: () => splitTextTL.play(),
        });
        // RESET ON LEAVE BACK
        if (!animOnce) {
          const randomAnimLeaveBackST = ScrollTrigger.create({
            trigger: triggerEL,
            start: "top bottom",
            markers: markers,
            onLeaveBack: () => splitTextTL.pause(0),
          });
        }
      } else {
        splitTextTL.play();
      }
    }
  };

  // const animCount = (
  //   elementRef: RefLike<T>, // element to animate
  //   triggerRef?: RefLike<HTMLElement>, // trigger element
  //   delay: number = 0, // delay of animation
  //   duration: number = 0.5, // duration of animation
  //   markers: boolean = false, // show markers
  //   animOnce: boolean = false, // animate once
  //   inViewport: boolean = true, // animate on scroll
  //   animTo: number = 10, // content to animate
  //   increaseBy: number = 1, // increment value
  // ) => {
  //   if (elementRef.current) {
  //     const el = elementRef.current;
  //     const triggerEL = triggerRef?.current ? triggerRef?.current : el;
  //     const countTL = gsap.timeline({ paused: true, delay: delay, defaults: { ease: 'sine.inOut' } });
  //     countTL.to(el, {
  //       duration: duration,
  //       textContent: animTo,
  //       snap: { textContent: increaseBy }
  //     });
  //     // ENTER
  //     const countEnterST = ScrollTrigger.create({
  //       trigger: triggerEL,
  //       start: 'top 90%',
  //       onEnter: () => countTL.play(),
  //       markers: markers,
  //     });
  //     // RESET ON LEAVE BACK
  //     if(!animOnce) {
  //       const counterLeaveBackST = ScrollTrigger.create({
  //         trigger: triggerEL,
  //         start: 'top bottom',
  //         onLeaveBack: () => countTL.pause(0),
  //         markers: markers,
  //       });
  //     }
  //   }
  // }

  const animScribble = <T extends HTMLElement>(
    elementRef: RefLike<T>, // element to animate
    triggerRef?: RefLike<HTMLElement>, // trigger element
    delay: number = 0, // delay of animation
    duration: number = 0.5, // duration of animation
    markers: boolean = false, // show markers
    animOnce: boolean = false, // animate once
    inViewport: boolean = true, // animate on viewport
  ) => {
    if (elementRef.current) {
      const el = getCurrent(elementRef);
      if (!el) return;
      const triggerEL = (getCurrent(triggerRef) as HTMLElement) ?? el;
      const svgPath = el.querySelector("path");
      const scribbleTL = gsap.timeline({ paused: true, delay: delay });
      gsap.set("svg", { transformPerspective: 100 });
      gsap.set(svgPath, { drawSVG: "0%", opacity: 0 });
      scribbleTL
        .to(
          svgPath,
          { duration: duration, drawSVG: "50%", opacity: 1, ease: "power1.in" },
          "scribble",
        )
        .to(
          svgPath,
          { drawSVG: "100%", duration: 0.5, ease: "power1.out" },
          "scribble+=1",
        );

      // ENABLE ANIMATION ON VIEWPORT
      if (inViewport) {
        // ENTER
        const scribbleEnterST = ScrollTrigger.create({
          trigger: triggerEL,
          start: "clamp(top 95%)",
          onEnter: () => scribbleTL.play(),
          markers: markers,
        });
        // RESET ON LEAVE BACK
        if (!animOnce) {
          const scribbleLeaveBackST = ScrollTrigger.create({
            trigger: triggerEL,
            start: "top bottom",
            onLeaveBack: () => scribbleTL.pause(0),
            markers: markers,
          });
        }
      } else {
        scribbleTL.play();
      }
    }
  };

  const animProgress = <T extends HTMLElement>(
    elementRef: RefLike<T>, // element to animate
    triggerRef?: RefLike<HTMLElement>, // trigger element
    delay: number = 0, // delay of animation
    duration: number = 0.5, // duration of animation
    markers: boolean = false, // show markers
    animOnce: boolean = false, // animate once
    inViewport: boolean = true, // animate on viewport
    animTo: number = 10, // content to animate
    increaseBy: number = 1, // increment value
  ) => {
    if (elementRef.current) {
      const el = getCurrent(elementRef);
      if (!el) return;
      const triggerEL = (getCurrent(triggerRef) as HTMLElement) ?? el;
      const countTL = gsap.timeline({
        paused: true,
        delay: delay,
        defaults: { ease: "sine.inOut" },
      });
      countTL.to(el, {
        duration: duration,
        textContent: animTo,
        snap: { textContent: increaseBy },
      });
      // ENTER
      const countEnterST = ScrollTrigger.create({
        trigger: triggerEL,
        start: "top 90%",
        onEnter: () => countTL.play(),
        markers: markers,
      });
      // RESET ON LEAVE BACK
      if (!animOnce) {
        const counterLeaveBackST = ScrollTrigger.create({
          trigger: triggerEL,
          start: "top bottom",
          onLeaveBack: () => countTL.pause(0),
          markers: markers,
        });
      }
    }
  };

  return {
    animReveal,
    animPanning,
    animScale,
    animWidth,
    animRandomChars,
    // animCount,
    animScribble,
  };
};
