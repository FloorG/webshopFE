import { Category } from '../../products/category.model';

export interface NewProduct {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
}
