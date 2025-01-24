import { useEffect, useRef } from 'react';

const PARTICLE_CONFIG = {
  count: 150,
  size: {
    min: 0.5,
    max: 3,
  },
  speed: {
    min: 0.1,
    max: 0.5,
  },
  opacity: {
    min: 0.3,
    max: 0.7,
  },
  colors: ['#FFD700', '#B8860B', '#DAA520'],
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (PARTICLE_CONFIG.size.max - PARTICLE_CONFIG.size.min) + PARTICLE_CONFIG.size.min,
        speedX: (Math.random() - 0.5) * (PARTICLE_CONFIG.speed.max - PARTICLE_CONFIG.speed.min),
        speedY: (Math.random() - 0.5) * (PARTICLE_CONFIG.speed.max - PARTICLE_CONFIG.speed.min),
        opacity: Math.random() * (PARTICLE_CONFIG.opacity.max - PARTICLE_CONFIG.opacity.min) + PARTICLE_CONFIG.opacity.min,
        color: PARTICLE_CONFIG.colors[Math.floor(Math.random() * PARTICLE_CONFIG.colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground; 