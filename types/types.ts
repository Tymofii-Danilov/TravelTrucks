type engine = 'diesel' | 'petrol' | 'electric' | 'hybrid';
type transmission = 'automatic' | 'manual';
type form = 'semi_integrated' | 'integrated' | 'alcove' | 'panel_van';
export type Amenity =
  | 'ac'
  | 'bathroom'
  | 'kitchen'
  | 'tv'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

export type CamperFilters = {
  location?: string;
  forms?: form[];
  transmissions?: transmission[];
  engines?: engine[];
};

export type CamperFiltersInit = {
  location?: string;
  form?: form;
  transmission?: transmission;
  engine?: engine;
};

export type CamperItem = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: form;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: transmission;
  engine: engine;
  amenities: Amenity[];
  coverImage: string;
  totalReviews: number;
};

export type gallery = {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
};

export type CamperDetails = {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: form;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: transmission;
  engine: engine;
  gallery: gallery[];
  amenities: Amenity[];
};

export type CamperReviews = {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};
