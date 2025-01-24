import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
}: ScrollRevealProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const directionOffset = {
    up: 50,
    down: -50,
    left: 50,
    right: -50,
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' || direction === 'down' ? directionOffset[direction] : 0,
      x: direction === 'left' || direction === 'right' ? directionOffset[direction] : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal; 