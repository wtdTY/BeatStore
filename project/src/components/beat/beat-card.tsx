import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import BeatPlayer from "@/components/beat/beat-player";
import { Beat } from "@/types/beat";

interface BeatCardProps {
  beat: Beat;
  featured?: boolean;
}

export default function BeatCard({ beat, featured = false }: BeatCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addToCart(beat);
    toast({
      title: "Added to cart",
      description: `${beat.title} was added to your cart`,
    });
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className={cn(
      "group overflow-hidden transition-all hover:shadow-md dark:hover:shadow-red-950/10",
      featured && "border-red-500/20"
    )}>
      <Link to={`/beat/${beat.id}`} className="block">
        <div className="relative">
          <div className="aspect-[1.6/1] bg-muted overflow-hidden">
            <img 
              src={beat.coverImage} 
              alt={beat.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <button 
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-red-500/90 flex items-center justify-center",
              "shadow-lg transform transition-all duration-300 ease-out",
              isPlaying ? "scale-90" : "scale-0 group-hover:scale-100"
            )}
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-white" />
            ) : (
              <Play className="h-6 w-6 text-white ml-1" />
            )}
          </button>
          
          {featured && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              Featured
            </Badge>
          )}
        </div>
      </Link>

      {isPlaying && (
        <div className="px-4 py-2">
          <BeatPlayer audioUrl={beat.audioUrl} onEnd={() => setIsPlaying(false)} />
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div>
            <Link to={`/beat/${beat.id}`} className="block">
              <h3 className="font-semibold text-lg line-clamp-1 hover:text-red-500 transition-colors">
                {beat.title}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm">
              {beat.producer}
            </p>
          </div>
          <div className="text-lg font-bold text-red-500">
            ${beat.price}
          </div>
        </div>
        
        <div className="flex items-center mt-2 text-xs text-muted-foreground space-x-3">
          <div>{beat.bpm} BPM</div>
          <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
          <div>{beat.key}</div>
          <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
          <div>{beat.genre}</div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button 
          className="w-full bg-red-500 hover:bg-red-600"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        
        <Button variant="ghost" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}