export type Camper = {
  location?: string;
  form?: 'semi_integrated' | 'integrated' | 'alcove' | 'panel_van';
  transmission?: 'automatic' | 'manual';
  engine?: 'diesel' | 'petrol' | 'electric' | 'hybrid';
};
