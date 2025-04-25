import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";

interface Spotlight {
  id: number;
  x: number;
  y: number;
  color: string;
  scale: number;
  duration: number;
}

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });

      // Add new spotlight at cursor position
      if (Math.random() < 0.1) { // 10% chance to create spotlight on each mouse move
        const newSpotlight = {
          id: nextId,
          x: e.clientX,
          y: e.clientY,
          color: `hsl(${Math.random() * 60 + 170}, 100%, 50%)`, // Teal variations
          scale: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 1 + 0.5
        };
        setSpotlights(prev => [...prev.slice(-5), newSpotlight]); // Keep last 5 spotlights
        setNextId(prev => prev + 1);
      }
    };

    // Add random spotlights
    const interval = setInterval(() => {
      const newSpotlight = {
        id: nextId,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: `hsl(${Math.random() * 60 + 170}, 100%, 50%)`, // Teal variations
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 1 + 0.5
      };
      setSpotlights(prev => [...prev.slice(-5), newSpotlight]); // Keep last 5 spotlights
      setNextId(prev => prev + 1);
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [nextId]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background to-background/90 min-h-screen flex items-center">
      {/* Animated background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, hsl(183, 100%, 45%, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at ${70 - mousePosition.x * 30}% ${30 + mousePosition.y * 30}%, hsl(173, 100%, 45%, 0.3) 0%, transparent 50%)`
        }}
      />
      
      {/* Grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        />
      </div>

      {/* Spotlights */}
      <AnimatePresence>
        {spotlights.map((spotlight) => (
          <motion.div
            key={spotlight.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.8, scale: spotlight.scale }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: spotlight.duration }}
            className="absolute pointer-events-none"
            style={{
              left: spotlight.x,
              top: spotlight.y,
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle at center, ${spotlight.color} 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Content */}
      <div ref={ref} className="relative container mx-auto px-4 py-20 md:py-32 flex flex-col items-center">
        {/* Gradient elements */}
        <motion.div 
          className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-50"
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div 
          className="absolute top-1/3 -right-24 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-50"
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
            Blairing Records
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
            <span className="block mb-2">Premium Beats by</span>
            <span className="bg-gradient-to-r from-primary to-teal-400 text-transparent bg-clip-text">
              WTD.TY
            </span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Elevate your sound with exclusive beats crafted for artists who demand excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/beats">
              <Button 
                className="bg-primary hover:bg-primary/90 text-lg h-12 px-8 rounded-full"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className="relative flex items-center">
                  <span className="mr-2">Browse Beats</span>
                  <motion.div
                    animate={hovered ? { x: 5 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="text-lg h-12 px-8 rounded-full border-primary/20 text-foreground hover:bg-primary/5"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-4xl mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {[
            { number: "50+", label: "Beats" },
            { number: "100+", label: "Satisfied Artists" },
            { number: "10K+", label: "Streams" },
            { number: "5★", label: "Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
