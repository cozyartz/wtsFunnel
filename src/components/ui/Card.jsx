import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  ...props 
}) => {
  const baseClasses = 'bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;