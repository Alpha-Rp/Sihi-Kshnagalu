import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale' | 'rotate';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

const animations = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slide: {
    hidden: (direction: string) => ({
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 1
    }
  },
  scale: {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  },
  rotate: {
    hidden: { rotate: -180, opacity: 0, scale: 0 },
    visible: { rotate: 0, opacity: 1, scale: 1 }
  }
};

const ScrollAnimation = ({
  children,
  animation = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = ''
}: ScrollAnimationProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const selectedAnimation = animations[animation];
  const variant = animation === 'slide' ? selectedAnimation.hidden(direction) : selectedAnimation.hidden;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: variant,
        visible: {
          ...selectedAnimation.visible,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation; 