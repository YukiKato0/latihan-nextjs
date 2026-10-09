export interface ICategories {
  id: string;
  label: string;
  icon: string;
  subCategories: string[];
}

export interface IProducts {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  isBestSeller: boolean;
}

export type CategoriesFormData = Omit<ICategories, "id">;
export type ProductsFormData = Omit<IProducts, "id">;
