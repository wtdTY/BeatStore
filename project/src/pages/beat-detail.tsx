import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { allBeats } from "@/data/beats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import BeatPlayer from "@/components/beat/beat-player";
import { Play, ShoppingCart, Heart, Share2, Download, PlayCircle, Music2, AudioWaveformIcon as WaveformIcon, Info } from "lucide-react";
import { Beat } from "@/types/beat";

export default function BeatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [beat, setBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Find the beat by ID
    const foundBeat = allBeats.find(b => b.id === id);
    
    if (foundBeat) {
      setBeat(foundBeat);
      setSelectedLicense(foundBeat.licenseOptions[0].name);
      
      // Update page title
      document.title = `${foundBeat.title} by ${foundBeat.producer} - BeatStore`;
    }
  }, [id]);

  const handleAddToCart = () => {
    if (beat) {
      addToCart(beat);
      toast({
        title: "Added to cart",
        description: `${beat.title} was added to your cart`,
      });
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!beat) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Beat not found</h2>
        <p className="text-muted-foreground mb-6">
          The beat you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/beats">
          <Button>Browse Beats</Button>
        </Link>
      </div>
    );
  }

  const selectedLicenseOption = beat.licenseOptions.find(
    option => option.name === selectedLicense
  );

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column - Beat info */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <Link to="/beats" className="text-muted-foreground hover:text-foreground text-sm">
                ← Back to beats
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Beat cover */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-card">
                  <img 
                    src={beat.coverImage} 
                    alt={beat.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <button 
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                    onClick={handlePlayPause}
                  >
                    <div className="h-16 w-16 rounded-full bg-red-500/90 flex items-center justify-center">
                      {isPlaying ? (
                        <span className="h-6 w-6 border-l-2 border-r-2 border-white ml-0.5"></span>
                      ) : (
                        <Play className="h-6 w-6 text-white ml-1" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Beat details */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{beat.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">by {beat.producer}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{beat.genre}</Badge>
                  <Badge variant="secondary">{beat.bpm} BPM</Badge>
                  <Badge variant="secondary">{beat.key}</Badge>
                  <Badge variant="secondary">{beat.duration}</Badge>
                </div>
                
                <p className="text-muted-foreground mb-6">{beat.description}</p>
                
                {isPlaying && (
                  <div className="mb-6">
                    <BeatPlayer audioUrl={beat.audioUrl} onEnd={() => setIsPlaying(false)} />
                  </div>
                )}
                
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 md:flex-none bg-red-500 hover:bg-red-600"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <>
                        <span className="h-4 w-4 border-l-2 border-r-2 border-current mr-2"></span>
                        Pause Beat
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Play Beat
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="details" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="specs" className="flex items-center gap-2">
                  <Music2 className="h-4 w-4" />
                  Specs
                </TabsTrigger>
                <TabsTrigger value="waveform" className="flex items-center gap-2">
                  <WaveformIcon className="h-4 w-4" />
                  Waveform
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="p-4 bg-card rounded-lg border border-border">
                <h3 className="font-medium mb-3">Beat Details</h3>
                <p className="text-muted-foreground mb-4">{beat.description}</p>
                
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {beat.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="specs" className="p-4 bg-card rounded-lg border border-border">
                <h3 className="font-medium mb-3">Technical Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm text-muted-foreground">BPM</h4>
                    <p>{beat.bpm}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground">Key</h4>
                    <p>{beat.key}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground">Genre</h4>
                    <p>{beat.genre}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground">Duration</h4>
                    <p>{beat.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground">Format</h4>
                    <p>WAV + MP3</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground">Stems</h4>
                    <p>Available with Premium</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="waveform" className="p-4 bg-card rounded-lg border border-border">
                <h3 className="font-medium mb-3">Beat Waveform</h3>
                <div className="h-32 flex items-center justify-center bg-muted rounded-lg p-4">
                  <BeatPlayer audioUrl={beat.audioUrl} onEnd={() => setIsPlaying(false)} />
                </div>
                <div className="text-center mt-4">
                  <Button onClick={handlePlayPause} variant="outline" className="mx-auto">
                    {isPlaying ? (
                      <>
                        <span className="h-4 w-4 border-l-2 border-r-2 border-current mr-2"></span>
                        Pause
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Play
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Similar beats */}
            <div>
              <h3 className="text-xl font-bold mb-4">You May Also Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allBeats
                  .filter(b => b.id !== beat.id && b.genre === beat.genre)
                  .slice(0, 2)
                  .map(similarBeat => (
                    <Link to={`/beat/${similarBeat.id}`} key={similarBeat.id}>
                      <div className="flex gap-4 p-3 rounded-lg bg-card hover:bg-card/90 transition-colors border border-border">
                        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            src={similarBeat.coverImage}
                            alt={similarBeat.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{similarBeat.title}</h4>
                          <p className="text-sm text-muted-foreground">{similarBeat.producer}</p>
                          <p className="text-sm font-medium text-red-500 mt-1">${similarBeat.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          
          {/* Right column - License options and purchase */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Choose Your License</CardTitle>
                <CardDescription>
                  Select the right license for your project needs
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* License options */}
                <div className="grid gap-3">
                  {beat.licenseOptions.map((option) => (
                    <div 
                      key={option.name}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-red-500/50 ${
                        selectedLicense === option.name 
                          ? "border-red-500 bg-red-500/5" 
                          : "border-border"
                      }`}
                      onClick={() => setSelectedLicense(option.name)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{option.name} License</h3>
                        <span className="font-bold text-lg">${option.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {option.rights}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Add to cart button */}
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                
                {/* Immediate download */}
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Buy Now (${selectedLicenseOption?.price})
                </Button>
                
                {/* License details */}
                <div className="p-4 bg-card rounded-lg border border-border text-sm">
                  <h4 className="font-medium mb-2">License Details:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 text-lg">✓</span>
                      {selectedLicense === "Basic" ? (
                        "MP3 files only"
                      ) : selectedLicense === "Premium" ? (
                        "WAV files + MP3 files"
                      ) : (
                        "WAV + MP3 + Tracked Out Stems"
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 text-lg">✓</span>
                      {selectedLicense === "Exclusive" ? (
                        "Exclusive ownership rights"
                      ) : (
                        "Non-exclusive rights"
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 text-lg">✓</span>
                      Unlimited streaming
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 text-lg">✓</span>
                      {selectedLicense === "Basic" ? (
                        "10,000 distribution copies"
                      ) : selectedLicense === "Premium" ? (
                        "Unlimited distribution"
                      ) : (
                        "Unlimited distribution + ownership"
                      )}
                    </li>
                  </ul>
                </div>
                
                {/* Guarantee */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  100% Secure Checkout with 30-Day Money Back Guarantee
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}