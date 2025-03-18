import { Product } from './product.model';

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
}
