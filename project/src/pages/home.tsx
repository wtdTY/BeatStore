import { useEffect } from "react";
import HeroSection from "@/components/hero/hero-section";
import FeaturedBeats from "@/components/featured/featured-beats";
import GenreCategories from "@/components/categories/genre-categories";
import ContactForm from "@/components/contact/contact-form";
import { motion } from "framer-motion";

export default function HomePage() {
  useEffect(() => {
    document.title = "Blairing Records - Premium Beats by WTD.TY";
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturedBeats />
      <GenreCategories />
      
      {/* How It Works */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-teal-400 text-transparent bg-clip-text">
                How It Works
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Finding and purchasing your next hit is simple with our streamlined process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Browse & Find",
                description: "Explore our catalog of premium beats filtered by genre, mood, or style."
              },
              {
                step: "02",
                title: "License & Download",
                description: "Choose your license type and complete your purchase securely."
              },
              {
                step: "03",
                title: "Create & Publish",
                description: "Record your vocals, mix your track, and share your music with the world."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg border border-border relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 text-8xl font-bold text-primary/10">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 relative z-10">{item.title}</h3>
                <p className="text-muted-foreground relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-teal-400 text-transparent bg-clip-text">
                  Get In Touch
                </span>
              </h2>
              <p className="text-muted-foreground">
                Have questions or need custom beats? We're here to help you find your sound.
              </p>
            </div>
            
            <div className="bg-card p-6 md:p-8 rounded-lg border border-border shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}