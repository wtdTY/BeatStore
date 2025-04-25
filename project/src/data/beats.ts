import { Beat } from "@/types/beat";

export const featuredBeats: Beat[] = [
  {
    id: "1",
    title: "Midnight Haze",
    producer: "WTD.TY",
    price: 49.99,
    bpm: 140,
    key: "G Minor",
    genre: "Trap",
    description: "Dark and moody trap beat with haunting melodies and hard-hitting 808s. Perfect for emotional rap songs and atmospheric tracks.",
    coverImage: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600",
    audioUrl: "https://sample-videos.com/audio/mp3/wave.mp3",
    tags: ["dark", "emotional", "trap", "808s"],
    duration: "3:25",
    licenseOptions: [
      { name: "Basic", price: 49.99, rights: "Non-exclusive, unlimited streams" },
      { name: "Premium", price: 99.99, rights: "Non-exclusive, unlimited streams, distribution" },
      { name: "Exclusive", price: 299.99, rights: "Full rights, exclusive ownership" }
    ]
  },
  {
    id: "2",
    title: "Summer Vibes",
    producer: "WTD.TY",
    price: 39.99,
    bpm: 95,
    key: "C Major",
    genre: "R&B",
    description: "Smooth R&B beat with warm synths and silky drums. Captures the essence of summer evenings and good times.",
    coverImage: "https://images.pexels.com/photos/2295671/pexels-photo-2295671.jpeg?auto=compress&cs=tinysrgb&w=600",
    audioUrl: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3",
    tags: ["smooth", "summer", "r&b", "chill"],
    duration: "3:10",
    licenseOptions: [
      { name: "Basic", price: 39.99, rights: "Non-exclusive, unlimited streams" },
      { name: "Premium", price: 89.99, rights: "Non-exclusive, unlimited streams, distribution" },
      { name: "Exclusive", price: 249.99, rights: "Full rights, exclusive ownership" }
    ]
  },
  {
    id: "3",
    title: "Future Bounce",
    producer: "WTD.TY",
    price: 59.99,
    bpm: 128,
    key: "A Minor",
    genre: "Hip Hop",
    description: "High-energy hip hop beat with futuristic synths and bouncy drums. Stand out with this unique sound that blends classic and modern elements.",
    coverImage: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600",
    audioUrl: "https://sample-videos.com/audio/mp3/wave.mp3",
    tags: ["energetic", "futuristic", "hip hop", "bounce"],
    duration: "2:55",
    licenseOptions: [
      { name: "Basic", price: 59.99, rights: "Non-exclusive, unlimited streams" },
      { name: "Premium", price: 119.99, rights: "Non-exclusive, unlimited streams, distribution" },
      { name: "Exclusive", price: 349.99, rights: "Full rights, exclusive ownership" }
    ]
  }
];

export const allBeats: Beat[] = [
  ...featuredBeats,
  {
    id: "4",
    title: "Urban Nights",
    producer: "WTD.TY",
    price: 44.99,
    bpm: 90,
    key: "E Minor",
    genre: "Drill",
    description: "Hard-hitting drill beat with sliding 808s and crisp hi-hats. Captures the essence of urban nightlife.",
    coverImage: "https://images.pexels.com/photos/2263410/pexels-photo-2263410.jpeg?auto=compress&cs=tinysrgb&w=600",
    audioUrl: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3",
    tags: ["drill", "urban", "dark", "sliding 808s"],
    duration: "3:05",
    licenseOptions: [
      { name: "Basic", price: 44.99, rights: "Non-exclusive, unlimited streams" },
      { name: "Premium", price: 94.99, rights: "Non-exclusive, unlimited streams, distribution" },
      { name: "Exclusive", price: 279.99, rights: "Full rights, exclusive ownership" }
    ]
  },
  {
    id: "5",
    title: "Mellow Dreams",
    producer: "WTD.TY",
    price: 34.99,
    bpm: 70,
    key: "D Major",
    genre: "Lofi",
    description: "Relaxing lofi beat with nostalgic piano and warm textures. Perfect for studying, chilling, or introspective tracks.",
    coverImage: "https://images.pexels.com/photos/2618804/pexels-photo-2618804.jpeg?auto=compress&cs=tinysrgb&w=600",
    audioUrl: "https://sample-videos.com/audio/mp3/wave.mp3",
    tags: ["lofi", "chill", "relaxing", "study"],
    duration: "3:40",
    licenseOptions: [
      { name: "Basic", price: 34.99, rights: "Non-exclusive, unlimited streams" },
      { name: "Premium", price: 79.99, rights: "Non-exclusive, unlimited streams, distribution" },
      { name: "Exclusive", price: 229.99, rights: "Full rights, exclusive ownership" }
    ]
  },
  {
    id: "6",
    title: "Tropical Rhythm",
    producer: "WTD.TY",
    price: 54.99,
    bpm: 105,
    key: "F Major",
    genre: "Afrobeats",
    description: "Infectious afrobeats with vibrant percussion and tropical melodies. Brings the summer party vibe to any track.",
    coverImage: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=600",
    audioUrl: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3",
    tags: ["afrobeats", "tropical", "summer", "dance"],
    duration: "3:15",
    licenseOptions: [
      { name: "Basic", price: 54.99, rights: "Non-exclusive, unlimited streams" },
      { name: "Premium", price: 109.99, rights: "Non-exclusive, unlimited streams, distribution" },
      { name: "Exclusive", price: 319.99, rights: "Full rights, exclusive ownership" }
    ]
  }
];