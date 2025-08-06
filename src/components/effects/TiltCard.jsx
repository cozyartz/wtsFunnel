import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const TiltCard = ({ children, className = '', glareEnable = true }) => {
  return (
    <Tilt
      className={className}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      glareEnable={glareEnable}
      glareMaxOpacity={0.3}
      glareColor="#3B82F6"
      glarePosition="all"
      glareBorderRadius="0.75rem"
      scale={1.02}
      transitionSpeed={2000}
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </Tilt>
  );
};

export default TiltCard;