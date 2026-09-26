export type Language = 'en' | 'bn';

export interface Movie {
  id: string;
  title: string;
  titleBn: string;
  tagline: string;
  taglineBn: string;
  synopsis: string;
  synopsisBn: string;
  director: string;
  cast: string[];
  year: number;
  duration: string;
  durationMinutes: number;
  rating: number;
  voteCount: string;
  genres: string[];
  genresBn: string[];
  posterUrl: string;
  backdropUrl: string;
  videoQuality: '4K ULTRA HD' | '1080p IMAX' | 'DOLBY VISION';
  audioQuality: 'Dolby Atmos 5.1' | 'Dolby Atmos 7.1' | 'Spatial 3D Studio';
  isPremiere?: boolean;
  isFeatured?: boolean;
  accentColor: string;
}

export type Genre =
  | 'All'
  | 'Action'
  | 'Thriller'
  | 'Romance'
  | 'Sci-Fi'
  | 'Drama'
  | 'Adventure'
  | 'Mystery'
  | 'Fantasy';

export interface MoodFilterState {
  mood: string;
  maxMinutes: number;
  vibe: string;
}

export interface SoundPreset {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  baseFreq: number;
  harmonics: number[];
  spatialWidth: number;
}

export interface VIPPlan {
  id: string;
  name: string;
  nameBn: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  featuresBn: string[];
  isPopular?: boolean;
}
