import { useEffect, useState } from "react";
import { allBeats } from "@/data/beats";
import BeatCard from "@/components/beat/beat-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SearchIcon, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function BeatsPage() {
  // Set page title
  useEffect(() => {
    document.title = "Browse Beats - BeatStore";
  }, []);

  const [beats, setBeats] = useState(allBeats);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [bpmRange, setBpmRange] = useState([60, 180]);
  const [sortOption, setSortOption] = useState("newest");

  // Filter and sort beats when filters change
  useEffect(() => {
    let filtered = [...allBeats];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(beat => 
        beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beat.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beat.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Genre filter
    if (selectedGenre && selectedGenre !== "all") {
      filtered = filtered.filter(beat => beat.genre === selectedGenre);
    }
    
    // BPM range filter
    filtered = filtered.filter(beat => 
      beat.bpm >= bpmRange[0] && beat.bpm <= bpmRange[1]
    );
    
    // Sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, we'd sort by date
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        break;
    }
    
    setBeats(filtered);
  }, [searchTerm, selectedGenre, bpmRange, sortOption]);

  const genres = ["Trap", "Hip Hop", "R&B", "Drill", "Lofi", "Afrobeats"];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Beats</h1>
          <p className="text-muted-foreground">
            Find the perfect beat for your next project from our extensive collection.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Search bar */}
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search beats by name, producer or genre..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Desktop filters */}
          <div className="hidden md:flex gap-4">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Mobile filters */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Beats</SheetTitle>
                  <SheetDescription>
                    Adjust filters to find your perfect beat
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Genre</label>
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Genres" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Genres</SelectItem>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">BPM Range</label>
                    <div className="pt-4">
                      <Slider 
                        min={60}
                        max={180}
                        step={1}
                        value={bpmRange}
                        onValueChange={setBpmRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>{bpmRange[0]} BPM</span>
                        <span>{bpmRange[1]} BPM</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Desktop BPM range filter */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm">BPM Range:</div>
            <div className="flex-1">
              <Slider 
                className="w-[300px]"
                min={60}
                max={180}
                step={1}
                value={bpmRange}
                onValueChange={setBpmRange}
              />
            </div>
            <div className="w-32 text-sm text-muted-foreground text-right">
              {bpmRange[0]} - {bpmRange[1]} BPM
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {beats.length} {beats.length === 1 ? 'beat' : 'beats'}
        </div>
        
        {/* Beats grid */}
        {beats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beats.map((beat) => (
              <BeatCard key={beat.id} beat={beat} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No beats found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to find what you're looking for.
            </p>
            <Button 
              className="mt-4"
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("all");
                setBpmRange([60, 180]);
                setSortOption("newest");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}