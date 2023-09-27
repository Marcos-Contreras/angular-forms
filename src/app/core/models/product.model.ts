
interface CategoryObject {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string;
  category?: CategoryObject;
}
