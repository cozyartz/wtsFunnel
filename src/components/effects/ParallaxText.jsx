import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxText = ({ children, speed = 1, className = '' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    
    gsap.fromTo(element, 
      {
        y: 0,
      },
      {
        y: () => speed * -100,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default ParallaxText;