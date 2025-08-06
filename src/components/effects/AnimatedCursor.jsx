import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';

const AnimatedCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [magnetTarget, setMagnetTarget] = useState(null);
  const cursorRef = useRef(null);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);
  
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Calculate rotation based on velocity
  const cursorRotation = useTransform([velocityX, velocityY], ([vx, vy]) => {
    const angle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
    return angle;
  });

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let magnetX = 0;
    let magnetY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Check for magnetic elements
      const magneticElements = document.querySelectorAll('a, button, .cursor-pointer, input, textarea');
      let closestElement = null;
      let closestDistance = Infinity;
      
      magneticElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
        );
        
        if (distance < 100 && distance < closestDistance) {
          closestDistance = distance;
          closestElement = element;
          magnetX = centerX;
          magnetY = centerY;
        }
      });
      
      if (closestElement) {
        // Apply magnetic effect
        const strength = Math.max(0, 1 - closestDistance / 100) * 0.3;
        const targetX = mouseX + (magnetX - mouseX) * strength;
        const targetY = mouseY + (magnetY - mouseY) * strength;
        
        cursorX.set(targetX - 12);
        cursorY.set(targetY - 12);
        setIsPointer(true);
        setMagnetTarget(closestElement);
        
        // Calculate rotation toward magnetic element
        const angle = Math.atan2(magnetY - mouseY, magnetX - mouseX) * (180 / Math.PI) + 90;
        setRotation(angle);
      } else {
        cursorX.set(mouseX - 12);
        cursorY.set(mouseY - 12);
        setIsPointer(false);
        setMagnetTarget(null);
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Main pointer */}
        <motion.div
          className="relative w-6 h-6"
          animate={{
            scale: isPointer ? 1.3 : 1,
            rotate: isPointer ? rotation : cursorRotation,
          }}
          transition={{ 
            scale: { duration: 0.2 },
            rotate: { duration: 0.1 }
          }}
        >
          {/* Arrow/Triangle shape */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            <motion.path
              d="M12 2L7 20L12 17L17 20L12 2Z"
              animate={{
                fill: isPointer ? '#3B82F6' : '#FFFFFF',
                stroke: isPointer ? '#1E40AF' : '#3B82F6',
                filter: isPointer ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' : 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))',
              }}
              strokeWidth="1"
              transition={{ duration: 0.2 }}
            />
          </svg>
          
          {/* Magnetic field indicator */}
          {isPointer && (
            <motion.div
              className="absolute inset-0 -m-3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" className="absolute -inset-3">
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="0.5"
                  strokeDasharray="2 4"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "center" }}
                />
              </svg>
            </motion.div>
          )}
        </motion.div>
        
        {/* Trail effect */}
        <motion.div
          className="absolute top-3 left-3 w-0.5 h-0.5 bg-primary-400 rounded-full"
          style={{
            opacity: useTransform(
              [velocityX, velocityY],
              ([vx, vy]) => Math.min(1, Math.sqrt(vx * vx + vy * vy) / 1000)
            ),
          }}
        />
      </motion.div>
      
      <style jsx="true" global="true">{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedCursor;