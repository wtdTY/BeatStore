import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const genres = [
  { name: "Hip Hop", count: 856, image: "https://images.pexels.com/photos/4626761/pexels-photo-4626761.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Trap", count: 643, image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "R&B", count: 419, image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Pop", count: 352, image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Drill", count: 287, image: "https://images.pexels.com/photos/7662840/pexels-photo-7662840.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Reggaeton", count: 193, image: "https://images.pexels.com/photos/2717073/pexels-photo-2717073.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Lofi", count: 165, image: "https://images.pexels.com/photos/7262799/pexels-photo-7262799.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Afrobeats", count: 142, image: "https://images.pexels.com/photos/6158159/pexels-photo-6158159.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

export default function GenreCategories() {
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                Browse by Genre
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find the perfect beat for your style from our extensive collection across all major genres.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {genres.map((genre, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link to={`/beats?genre=${genre.name.toLowerCase()}`}>
                <Card className="group overflow-hidden transition-all hover:shadow-md dark:hover:shadow-red-950/10">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={genre.image} 
                      alt={genre.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex items-end">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg text-white group-hover:text-red-400 transition-colors">
                          {genre.name}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {genre.count} beats
                        </p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}