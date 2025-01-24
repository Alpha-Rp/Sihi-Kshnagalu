import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

const Card3D = ({ children, className = '' }: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateXValue = ((e.clientY - centerY) / rect.height) * 20;
      const rotateYValue = ((e.clientX - centerX) / rect.width) * 20;

      setRotateX(-rotateXValue);
      setRotateY(rotateYValue);
      setScale(1.05);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setScale(1);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-[#B8860B]/20 rounded-2xl transform -translate-z-10"
        style={{
          transform: 'translateZ(-10px)',
          filter: 'blur(10px)',
        }}
      />
    </motion.div>
  );
};

export default Card3D; 