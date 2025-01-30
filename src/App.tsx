import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Heart,
  Calendar,
  Gift,
  Home,
  Camera,
  Music,
  Phone,
  Mail,
  Instagram,
  Clock,
  MapPin,
  MessageCircle,
  X,
  Star,
} from "lucide-react";
import ParticleBackground from "./components/ParticleBackground";
import Card3D from "./components/Card3D";
import ScrollReveal from "./components/ScrollReveal";
import ScrollAnimation from "./components/ScrollAnimation";
import Map from "./components/Map";

const FadeInSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

interface GalleryImage {
  url: string;
  category: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
    category: "Wedding",
    title: "Royal Wedding Ceremony",
  },
  {
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
    category: "Engagement",
    title: "Garden Engagement",
  },
  {
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80",
    category: "Birthday",
    title: "Luxury Birthday Celebration",
  },
  {
    url: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&q=80",
    category: "Wedding",
    title: "Traditional Ceremony",
  },
  {
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80",
    category: "Birthday",
    title: "Elegant Party Setup",
  },
  {
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    category: "Wedding",
    title: "Elegant Reception",
  },
];

interface ServiceProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const Service = ({ icon: Icon, title, description, delay }: ServiceProps) => (
  <FadeInSection delay={delay}>
    <Card3D className="group">
      <div className="service-card p-8">
        <div className="absolute top-0 right-0 w-24 h-24 morphing-bg opacity-20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <Icon className="w-12 h-12 text-[#B8860B] mb-6 transform group-hover:scale-110 transition-transform duration-500" />
        <h3 className="fancy-heading text-2xl font-bold mb-4">{title}</h3>
        <p className="text-enhanced leading-relaxed">{description}</p>
      </div>
    </Card3D>
  </FadeInSection>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-[#FFD700] to-[#B8860B] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 z-50"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e: MouseEvent) => {
      if (cursor && cursorDot) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block fixed pointer-events-none z-50"
      >
        <div className="relative -left-4 -top-4 w-8 h-8 rounded-full border-2 border-[#FFD700] transition-transform duration-200" />
      </div>
      <div
        ref={cursorDotRef}
        className="hidden md:block fixed pointer-events-none z-50"
      >
        <div className="relative -left-1 -top-1 w-2 h-2 rounded-full bg-[#B8860B] transition-transform duration-100" />
      </div>
    </>
  );
};

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-[#FFD700]/10 to-[#B8860B]/10 rounded-full floating-slow" />
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-[#B8860B]/10 to-[#FFD700]/10 rounded-full floating-medium" />
      <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-gradient-to-r from-[#FFD700]/5 to-[#B8860B]/5 rounded-full floating-fast" />
    </div>
  );
};

const AnimatedCounter = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, inView]);

  return (
    <div ref={ref} className="count-animation">
      {count}+
    </div>
  );
};

const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="text-center mb-20">
    <div className="relative inline-block">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold relative z-10 heading-gradient"
      >
        {title}
        <div className="heading-line" />
      </motion.h2>
      <div className="absolute -inset-x-6 -inset-y-4">
        <div className="w-full h-full bg-gradient-to-r from-[#FFD700]/10 to-[#B8860B]/10 blur-xl rounded-full" />
      </div>
    </div>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-gray-700 text-lg max-w-2xl mx-auto mt-4"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// Add this hook to handle magnetic effect
const useMagneticEffect = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const maxDistance = 50;
      const magnetStrength = 0.5;

      const moveX = (distanceX / maxDistance) * magnetStrength * 10;
      const moveY = (distanceY / maxDistance) * magnetStrength * 10;

      element.style.setProperty("--mx", `${moveX}px`);
      element.style.setProperty("--my", `${moveY}px`);
    };

    const handleMouseLeave = () => {
      element.style.setProperty("--mx", "0px");
      element.style.setProperty("--my", "0px");
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);
};

function App() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}`
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-[#FFF8DC]/30">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent"
            >
              Sihi Kshanagalu
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-gray-800 hover:text-[#B8860B] transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-gray-800 hover:text-[#B8860B] transition-colors"
              >
                Services
              </a>
              <a
                href="#gallery"
                className="text-gray-800 hover:text-[#B8860B] transition-colors"
              >
                Gallery
              </a>
              <a
                href="#testimonials"
                className="text-gray-800 hover:text-[#B8860B] transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-white px-6 py-2 rounded-full hover:shadow-[0_0_30px_rgba(184,134,11,0.3)] transition-all duration-300"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0">
          {/* Multiple layered background for depth */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80')] bg-cover bg-center animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-10 animate-slide" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#B8860B]/20 mix-blend-overlay" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />

          {/* Animated decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-[#B8860B]/10 to-transparent rounded-full blur-3xl animate-pulse-slower" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative inline-block mb-8 w-full max-w-full px-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#B8860B]/20 blur-2xl"
              />
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hero-text relative z-10"
                data-text="Sihi Kshanagalu"
              >
                Sihi Kshanagalu
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-2xl md:text-3xl text-white/90 mb-12 font-light tracking-wide hero-subtitle"
            >
              WHERE SWEET MOMENTS TURN INTO SWEET MEMORIES
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="relative"
            >
              <a
                href="#contact"
                className="hero-button group relative inline-flex items-center gap-2 px-12 py-4"
              >
                <span className="relative z-10 text-lg font-medium text-white">
                  Book Your Event
                </span>
                <motion.span
                  className="absolute inset-0 overflow-hidden rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#B8860B] transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#B8860B] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer" />
                </motion.span>
                <span className="absolute inset-0 rounded-full border-2 border-[#FFD700] scale-105 group-hover:scale-110 transition-transform duration-500" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </header>

      {/* Add this inside the hero section, after the existing decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"
          />
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8860B]/30 to-transparent"
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#B8860B]"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-32" id="about">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading title="About Us" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-4">Who We Are</h3>
                <p className="text-gray-700 leading-relaxed">
                  At Sihi Kshanagalu, we specialize in making every occasion
                  truly memorable. From traditional ceremonies to modern
                  celebrations, we bring creativity, elegance, and
                  professionalism to every event we plan.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Our Vision and Mission
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Vision:</strong> To be a trusted name in event
                  management, known for our creativity and impeccable service.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Mission:</strong> To turn your dreams into
                  unforgettable events with passion and precision.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-black/5" id="why-choose-us">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading title="Why Choose Us?" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card3D>
                <div className="why-choose-card p-8">
                  <div className="icon-wrapper">
                    <div className="icon-circle" />
                    <Star className="w-12 h-12 text-[#B8860B] relative z-10" />
                  </div>
                  <h3 className="fancy-heading text-2xl font-bold mb-4">
                    Personalized Planning
                  </h3>
                  <p className="text-enhanced">
                    Every event is tailored to your vision.
                  </p>
                </div>
              </Card3D>
              <Card3D>
                <div className="why-choose-card p-8">
                  <div className="icon-wrapper">
                    <div className="icon-circle" />
                    <Star className="w-12 h-12 text-[#B8860B] relative z-10" />
                  </div>
                  <h3 className="fancy-heading text-2xl font-bold mb-4">
                    Comprehensive Services
                  </h3>
                  <p className="text-enhanced">
                    From decor to catering, photography, and entertainment, we
                    handle everything.
                  </p>
                </div>
              </Card3D>
              <Card3D>
                <div className="why-choose-card p-8">
                  <div className="icon-wrapper">
                    <div className="icon-circle" />
                    <Star className="w-12 h-12 text-[#B8860B] relative z-10" />
                  </div>
                  <h3 className="fancy-heading text-2xl font-bold mb-4">
                    Expert Team
                  </h3>
                  <p className="text-enhanced">
                    A passionate team committed to excellence and creativity.
                  </p>
                </div>
              </Card3D>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32" id="statistics">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B8860B] mb-2">
                <AnimatedCounter end={500} />
              </div>
              <p className="text-gray-700">Events Organized</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B8860B] mb-2">
                <AnimatedCounter end={1000} />
              </div>
              <p className="text-gray-700">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B8860B] mb-2">
                <AnimatedCounter end={50} />
              </div>
              <p className="text-gray-700">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#B8860B] mb-2">
                <AnimatedCounter end={10} />
              </div>
              <p className="text-gray-700">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32" id="services">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading
              title="Extraordinary Services"
              subtitle="Crafting unforgettable moments with precision, creativity, and elegance"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Service
                icon={Heart}
                title="Weddings"
                description="Transform your dream wedding into reality with our bespoke planning services, where every detail is crafted to perfection."
                delay={0.2}
              />
              <Service
                icon={Calendar}
                title="Engagements"
                description="Create magical moments with our expertly planned engagement ceremonies, blending tradition with modern elegance."
                delay={0.3}
              />
              <Service
                icon={Gift}
                title="Birthdays"
                description="Celebrate life's milestones with extraordinary themed parties that leave lasting impressions."
                delay={0.4}
              />
              <Service
                icon={Home}
                title="Housing Ceremonies"
                description="Begin your new chapter with a beautifully orchestrated housewarming celebration."
                delay={0.5}
              />
              <Service
                icon={Camera}
                title="Photography"
                description="Capture timeless moments with our professional photography services, creating memories that last forever."
                delay={0.6}
              />
              <Service
                icon={Music}
                title="Entertainment"
                description="Elevate your event with curated entertainment that keeps your guests enchanted throughout."
                delay={0.7}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-32 bg-black/5" id="additional-services">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading title="Additional Services" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card3D>
                <div className="premium-service-card-v2">
                  <div className="card-content">
                    <div className="icon-container">
                      <Camera className="service-icon-v2" />
                      <div className="icon-bg" />
                    </div>
                    <h3 className="fancy-heading text-2xl font-bold mb-4">
                      Photography
                    </h3>
                    <p className="text-enhanced">
                      Capture every precious moment with our professional
                      photography and videography services.
                    </p>
                  </div>
                  <div className="card-overlay" />
                </div>
              </Card3D>
              <Card3D>
                <div className="premium-service-card-v2">
                  <div className="card-content">
                    <div className="icon-container">
                      <Music className="service-icon-v2" />
                      <div className="icon-bg" />
                    </div>
                    <h3 className="fancy-heading text-2xl font-bold mb-4">
                      Dancers and Entertainment
                    </h3>
                    <p className="text-enhanced">
                      Add life to your celebrations with skilled performers,
                      including traditional and modern dancers.
                    </p>
                  </div>
                  <div className="card-overlay" />
                </div>
              </Card3D>
              <Card3D>
                <div className="premium-service-card-v2">
                  <div className="card-content">
                    <div className="icon-container">
                      <MessageCircle className="service-icon-v2" />
                      <div className="icon-bg" />
                    </div>
                    <h3 className="fancy-heading text-2xl font-bold mb-4">
                      Catering Services
                    </h3>
                    <p className="text-enhanced">
                      Treat your guests to delicious and customized menus
                      crafted by our expert catering partners.
                    </p>
                  </div>
                  <div className="card-overlay" />
                </div>
              </Card3D>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-32" id="process">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading title="Our Process" subtitle="How We Work" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-4xl font-bold text-[#B8860B] mb-4">
                    01
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Consultation</h3>
                  <p className="text-gray-700">
                    Understanding your vision and preferences.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-2 bg-gradient-to-r from-[#FFD700] to-[#B8860B] transform translate-x-1/2" />
              </div>
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-4xl font-bold text-[#B8860B] mb-4">
                    02
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Planning</h3>
                  <p className="text-gray-700">
                    Designing a detailed event plan, including themes, budgets,
                    and timelines.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-2 bg-gradient-to-r from-[#FFD700] to-[#B8860B] transform translate-x-1/2" />
              </div>
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-4xl font-bold text-[#B8860B] mb-4">
                    03
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Execution</h3>
                  <p className="text-gray-700">
                    Coordinating with vendors, ensuring smooth logistics, and
                    managing every detail.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-2 bg-gradient-to-r from-[#FFD700] to-[#B8860B] transform translate-x-1/2" />
              </div>
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-4xl font-bold text-[#B8860B] mb-4">
                    04
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Delivery</h3>
                  <p className="text-gray-700">
                    Creating a seamless and stress-free experience for you and
                    your guests.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <p className="text-gray-700 text-lg">
                We promise attention to detail, transparent communication, and
                an event that exceeds your expectations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-black/5" id="testimonials">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading
              title="What Our Clients Say"
              subtitle="Here are some heartfelt words from our satisfied clients"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="quote-card">
                <div className="quote-mark">❝</div>
                <p className="testimonial-text">
                  "Sihi Kshanagalu transformed our wedding into a dream come
                  true. Every detail was perfect!"
                </p>
                <div className="author-info">
                  <div className="author-avatar">A</div>
                  <p className="author-name">— Asha & Rohan</p>
                </div>
              </div>
              <div className="quote-card">
                <div className="quote-mark">❝</div>
                <p className="testimonial-text">
                  "The surprise birthday party they planned for my wife left her
                  speechless. Highly recommended!"
                </p>
                <div className="author-info">
                  <div className="author-avatar">K</div>
                  <p className="author-name">— Karan S.</p>
                </div>
              </div>
              <div className="quote-card">
                <div className="quote-mark">❝</div>
                <p className="testimonial-text">
                  "Our corporate event was flawless, and the catering was
                  exceptional. Great job!"
                </p>
                <div className="author-info">
                  <div className="author-avatar">M</div>
                  <p className="author-name">— Meera, Business Manager</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32" id="faq">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading title="FAQs and Policies" />
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="faq-card-v2">
                  <div className="faq-header-v2">
                    <h3 className="text-2xl font-bold">
                      Do you provide customizable packages?
                    </h3>
                    <div className="expand-icon-v2">+</div>
                  </div>
                  <div className="faq-content-v2">
                    <p className="text-enhanced">
                      Yes, all our services are tailored to your specific needs
                      and budget.
                    </p>
                  </div>
                </div>
                <div className="faq-card-v2">
                  <div className="faq-header-v2">
                    <h3 className="text-2xl font-bold">
                      Can you handle last-minute bookings?
                    </h3>
                    <div className="expand-icon-v2">+</div>
                  </div>
                  <div className="faq-content-v2">
                    <p className="text-enhanced">
                      While we recommend advance booking, we can accommodate
                      last-minute requests based on availability.
                    </p>
                  </div>
                </div>
                <div className="faq-card-v2">
                  <div className="faq-header-v2">
                    <h3 className="text-2xl font-bold">
                      What is included in your packages?
                    </h3>
                    <div className="expand-icon-v2">+</div>
                  </div>
                  <div className="faq-content-v2">
                    <p className="text-enhanced">
                      Our packages typically include decor, catering,
                      photography, and entertainment. However, we can customize
                      based on your requirements.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12 space-y-4 text-center">
                <p className="text-gray-700">
                  <strong>Booking Policy:</strong> A 50% deposit is required to
                  secure your booking.
                </p>
                <p className="text-gray-700">
                  <strong>Cancellation Policy:</strong> Refunds are available
                  for cancellations made more than 30 days in advance.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 bg-black/5" id="gallery">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeading
              title="Our Gallery"
              subtitle="A glimpse into our world of extraordinary celebrations"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, index) => (
                <ScrollReveal key={index} delay={0.2 * index}>
                  <div
                    className="relative group cursor-pointer overflow-hidden rounded-2xl gallery-item hover-glow"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <p className="text-[#FFD700] text-sm mb-2">
                          {image.category}
                        </p>
                        <h3 className="text-white text-xl font-bold">
                          {image.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-32 relative overflow-hidden" id="location">
        <div className="absolute inset-0 bg-[#FFF8DC]/30" />
        
        <div className="container mx-auto px-4 relative">
          <ScrollAnimation animation="fade" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-[#2C3E50]">Visit Us</h2>
              <p className="text-gray-600 text-lg">Come discuss your special moments with us</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <ScrollAnimation animation="scale" delay={0.2}>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Map />
                  <div className="mt-6 flex items-center justify-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-[#B8860B]" />
                    <p>Sihi Kshanagalu event planners, Bangalore</p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-[#FFF8DC]/30" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-48 -left-24 bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute w-[400px] h-[400px] -bottom-32 -right-16 bg-gradient-to-tl from-[#B8860B]/10 to-transparent rounded-full blur-3xl animate-float-medium" />
        </div>

        <div className="container mx-auto px-4 relative">
          <ScrollAnimation animation="fade" duration={0.8}>
            <div className="text-center mb-16">
              <div className="relative inline-block">
                <h2 className="text-5xl font-bold mb-6 text-[#2C3E50] relative">
                  Get in Touch
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD700] via-[#B8860B] to-[#FFD700] transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left" />
                </h2>
                <div className="absolute -inset-x-6 -inset-y-4">
                  <div className="w-full h-full bg-gradient-to-r from-[#FFD700]/5 to-[#B8860B]/5 blur-xl rounded-full" />
                </div>
              </div>
              <p className="text-gray-600 text-lg mt-4">
                Let's create something extraordinary together
              </p>
            </div>

            <div className="flex justify-center items-center gap-20">
              {/* Phone */}
              <ScrollAnimation animation="scale" delay={0.2}>
                <motion.a
                  href="tel:+917760842581"
                  className="contact-icon-wrapper group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="contact-icon-inner">
                    <div className="contact-icon-circle">
                      <Phone className="contact-icon" />
                    </div>
                    <div className="contact-icon-glow" />
                  </div>
                </motion.a>
              </ScrollAnimation>

              {/* Email */}
              <ScrollAnimation animation="scale" delay={0.3}>
                <motion.a
                  href="mailto:sihikshanagalu15@gmail.com"
                  className="contact-icon-wrapper group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="contact-icon-inner">
                    <div className="contact-icon-circle">
                      <Mail className="contact-icon" />
                    </div>
                    <div className="contact-icon-glow" />
                  </div>
                </motion.a>
              </ScrollAnimation>

              {/* Instagram */}
              <ScrollAnimation animation="scale" delay={0.4}>
                <motion.a
                  href="https://instagram.com/sihi.kshanagalu.events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon-wrapper group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="contact-icon-inner">
                    <div className="contact-icon-circle">
                      <Instagram className="contact-icon" />
                    </div>
                    <div className="contact-icon-glow" />
                  </div>
                </motion.a>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/10 to-[#FFD700]/10" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-5 animate-slide-slow" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#B8860B] to-[#FFD700] bg-clip-text text-transparent inline-block">
                Sihi Kshanagalu
              </h3>
            </div>

            {/* Divider */}
            <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-[#B8860B] to-[#FFD700] rounded-full" />

            {/* Copyright */}
            <p className="text-gray-600 font-medium">
              &copy; {new Date().getFullYear()} Sihi Kshanagalu. All rights reserved.
            </p>
          </motion.div>
        </div>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B]" />
      </footer>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-[#FFD700] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[#FFD700] text-sm mb-2">
                  {selectedImage.category}
                </p>
                <h3 className="text-white text-2xl font-bold">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
      <CustomCursor />
      <FloatingElements />
    </div>
  );
}

export default App;
