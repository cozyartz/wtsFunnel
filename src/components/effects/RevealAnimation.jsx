import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const RevealAnimation = ({ 
  children, 
  width = "100%",
  delay = 0,
  duration = 0.5,
  slideFrom = "bottom" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const slideVariants = {
    bottom: { y: 75, opacity: 0 },
    top: { y: -75, opacity: 0 },
    left: { x: -75, opacity: 0 },
    right: { x: 75, opacity: 0 },
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: slideVariants[slideFrom],
          visible: {
            x: 0,
            y: 0,
            opacity: 1,
          },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealAnimation;