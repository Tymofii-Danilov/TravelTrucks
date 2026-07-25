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
