import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/cart-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, X, ShoppingCart, CreditCard, ArrowRight } from "lucide-react";
import { useState } from "react";
import BeatPlayer from "@/components/beat/beat-player";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  // Set page title
  useEffect(() => {
    document.title = "Your Cart - BeatStore";
  }, []);

  const handlePlayPause = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    {/* Beat image */}
                    <div className="w-full sm:w-32 sm:h-auto flex-shrink-0">
                      <img 
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-32 sm:h-full object-cover"
                      />
                    </div>
                    
                    {/* Beat details */}
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/beat/${item.id}`}>
                            <h3 className="font-medium hover:text-red-500 transition-colors">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {item.producer}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary">{item.genre}</Badge>
                            <Badge variant="secondary">{item.bpm} BPM</Badge>
                            <Badge variant="secondary">{item.key}</Badge>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-lg">${item.price}</div>
                          <button
                            className="text-muted-foreground hover:text-red-500 transition-colors text-sm mt-1 flex items-center"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="px-2 h-8"
                          onClick={() => handlePlayPause(item.id)}
                        >
                          {playingId === item.id ? (
                            <>
                              <Pause className="h-3 w-3 mr-1" />
                              Stop Preview
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              Preview
                            </>
                          )}
                        </Button>
                        
                        <Link to={`/beat/${item.id}`}>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="px-2 h-8 text-muted-foreground hover:text-foreground"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                      
                      {playingId === item.id && (
                        <div className="mt-3">
                          <BeatPlayer 
                            audioUrl={item.audioUrl} 
                            onEnd={() => setPlayingId(null)}
                            small
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Items total */}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    {/* Discount */}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span>$0.00</span>
                    </div>
                    
                    <Separator />
                    
                    {/* Total */}
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    {/* Promo code */}
                    <div className="flex gap-2 mt-4">
                      <input 
                        type="text" 
                        placeholder="Promo code" 
                        className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background"
                      />
                      <Button variant="outline" className="h-10">Apply</Button>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Checkout
                  </Button>
                  
                  <Link to="/beats" className="w-full">
                    <Button variant="outline" className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven't added any beats to your cart yet.
              Browse our collection to find your next hit.
            </p>
            <Link to="/beats">
              <Button className="bg-red-500 hover:bg-red-600">
                Browse Beats
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}