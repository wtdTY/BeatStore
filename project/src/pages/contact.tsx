import { useEffect } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/contact-form";

export default function ContactPage() {
  // Set page title
  useEffect(() => {
    document.title = "Contact Us - BeatStore";
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Get In Touch</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Have questions about licensing, custom beats, or anything else? We're here to help you find your sound.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-500/10 p-2.5 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">support@beatstore.com</p>
                    <p className="text-muted-foreground">licensing@beatstore.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-500/10 p-2.5 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">(Mon-Fri, 9am-5pm PST)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-500/10 p-2.5 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office</h3>
                    <p className="text-muted-foreground">123 Music Avenue</p>
                    <p className="text-muted-foreground">Los Angeles, CA 90028</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-500/10 p-2.5 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Monday-Friday: 9am-5pm PST</p>
                    <p className="text-muted-foreground">Saturday-Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-6">Send A Message</h2>
              <ContactForm />
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "What types of licenses do you offer?",
                  answer: "We offer three types of licenses: Basic (MP3 only), Premium (WAV+MP3), and Exclusive (all files+full rights)."
                },
                {
                  question: "How do I receive my beats after purchase?",
                  answer: "After completing your purchase, you'll receive an email with download links for all purchased beats."
                },
                {
                  question: "Can I get a custom beat made?",
                  answer: "Yes! We offer custom beat production services. Contact us with your requirements for a quote."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and Apple Pay for secure transactions."
                }
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}