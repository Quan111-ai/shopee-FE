import { CartItem } from "../types/cart";

export const mapCartItems = (rawItems: any[]): CartItem[] => {
  return rawItems.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
    productData: {
      ...item.productId,
      selectedVariant: item.productId.selectedVariant,
    },
  }));
};