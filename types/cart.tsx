export interface CartItemVariant {
  _id: string;
  name: string;
  price?: number;
  attributes?: Record<string, any>;
}

export interface ProductData {
  _id: string;
  name: string;
  price: number;
  description?: string;
  imageURL?: string;
  sellerID?: string;
  selectedVariant?: CartItemVariant;
}

export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  productData: ProductData;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
}