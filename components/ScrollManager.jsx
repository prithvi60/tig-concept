import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props;

  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);
  const prevCurSection = useRef(0);
  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    // console.log("change section",section)
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [data.el, section]);

  // useFrame(() => {
  //   if (isAnimating.current) {
  //     lastScroll.current = data.scroll.current;
  //     return;
  //   }

  //   const curSection = Math.floor(data.scroll.current * data.pages);

  //   console.log(
  //     "section",
  //     curSection,
  //   );
  //   onSectionChange(curSection);

  //   // if (data.scroll.current > lastScroll.current && curSection === 0) {
  //   //   onSectionChange(1);
  //   // }
  //   // if (
  //   //   data.scroll.current < lastScroll.current &&
  //   //   data.scroll.current < 1 / (data.pages - 1)
  //   // ) {
  //   //   onSectionChange(0);
  //   // }
  //   lastScroll.current = data.scroll.current;
  // });
  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }
  
    const curSection = Math.floor(data.scroll.current * data.pages);
  
    if (curSection !== prevCurSection.current) {
      prevCurSection.current = curSection;
      onSectionChange(curSection);
    }
  
    lastScroll.current = data.scroll.current;
  });

  return null;
};
