interface LicenseOption {
  name: string;
  price: number;
  rights: string;
}

export interface Beat {
  id: string;
  title: string;
  producer: string;
  price: number;
  bpm: number;
  key: string;
  genre: string;
  description: string;
  coverImage: string;
  audioUrl: string;
  tags: string[];
  duration: string;
  licenseOptions: LicenseOption[];
}