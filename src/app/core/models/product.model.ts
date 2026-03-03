export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: Category;
  price: number;
  images: string[];
  description?: string;
  featured?: boolean;
}

export type Category =
  | 'Todos'
  | 'Collares'
  | 'Pendientes'
  | 'Gargantillas';
