import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/cart-context";
import Layout from "@/components/layout/layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home";
import BeatsPage from "@/pages/beats";
import BeatDetailPage from "@/pages/beat-detail";
import CartPage from "@/pages/cart";
import ContactPage from "@/pages/contact";
import TermsPage from "@/pages/terms";  // Import the Terms page

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/beats" element={<BeatsPage />} />
              <Route path="/beat/:id" element={<BeatDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms-of-service" element={<TermsPage />} />  {/* Add this route */}
            </Routes>
          </Layout>
        </Router>
        <Toaster />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
