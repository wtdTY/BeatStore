import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BeatCard from "@/components/beat/beat-card";
import { featuredBeats } from "@/data/beats";

export default function FeaturedBeats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                Featured Beats
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our handpicked selection of premium beats from top producers, ready for your next hit.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredBeats.map((beat) => (
            <motion.div key={beat.id} variants={itemVariants}>
              <BeatCard beat={beat} featured={true} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}