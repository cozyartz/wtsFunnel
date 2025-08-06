import { useEffect, useRef, useState } from 'react';

const TextScramble = ({ text, trigger = true, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);
  
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    if (trigger && !isScrambling) {
      setIsScrambling(true);
      let iteration = 0;
      const originalText = text;
      const textLength = originalText.length;
      
      intervalRef.current = setInterval(() => {
        setDisplayText(
          originalText
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        if (iteration >= textLength) {
          clearInterval(intervalRef.current);
          setIsScrambling(false);
        }
        
        iteration += 1 / 3;
      }, 30);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [trigger, text, isScrambling, chars]);
  
  return (
    <span className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
};

export default TextScramble;