import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/cart-context";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Flame, 
  User 
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  scrolled: boolean;
}

export default function Header({ scrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
      scrolled 
        ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <Flame className="text-red-500 h-6 w-6" />
          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">Blairing Records</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "transition-colors hover:text-red-500", 
              isActive ? "text-red-500 font-medium" : "text-foreground"
            )}
          >
            Home
          </NavLink>
          <NavLink 
            to="/beats" 
            className={({ isActive }) => cn(
              "transition-colors hover:text-red-500", 
              isActive ? "text-red-500 font-medium" : "text-foreground"
            )}
          >
            Beats
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => cn(
              "transition-colors hover:text-red-500", 
              isActive ? "text-red-500 font-medium" : "text-foreground"
            )}
          >
            Contact
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <ModeToggle />

          {/* Cart */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 px-1.5 min-w-5 h-5 flex items-center justify-center bg-red-500"
                >
                  {cart.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 w-full bg-card border-b border-border transition-all duration-300 overflow-hidden",
        mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="flex flex-col p-4 space-y-3">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "py-2 transition-colors hover:text-red-500", 
              isActive ? "text-red-500 font-medium" : "text-foreground"
            )}
          >
            Home
          </NavLink>
          <NavLink 
            to="/beats" 
            className={({ isActive }) => cn(
              "py-2 transition-colors hover:text-red-500", 
              isActive ? "text-red-500 font-medium" : "text-foreground"
            )}
          >
            Beats
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => cn(
              "py-2 transition-colors hover:text-red-500", 
              isActive ? "text-red-500 font-medium" : "text-foreground"
            )}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}