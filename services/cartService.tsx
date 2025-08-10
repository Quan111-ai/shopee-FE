import axios from "../utils/axiosInstance";
import { mapCartItems } from "../utils/mapCart";
import { Cart } from "../types/cart";

export interface CartItemVariant {
  _id: string;
  name: string;
  price: number;
  attributes?: Record<string, any>;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  selectedVariant?: string;
}

export interface UpdateCartItemPayload {
  productId: string;
  quantity: number;
}

export interface ConfirmedItem {
  productId: string;
  name: string;
  imageURL?: string;
  price: number;
  quantity: number;
  subTotal: number;
  variant?: CartItemVariant | null;
}

export interface Confirmation {
  items: ConfirmedItem[];
  totalAmount: number;
  shippingFee: number;
  discount: number;
  totalPayable: number;
}

const cartService = {
  // 🛒 Lấy giỏ hàng đã map lại dữ liệu chuẩn cho frontend
  getCart: async (): Promise<Cart> => {
    const res = await axios.get("/cart");
    const rawCart = res.data?.data;

    return {
      _id: rawCart._id,
      userId: rawCart.userId,
      items: mapCartItems(rawCart.items),
    };
  },

  // ➕ Thêm sản phẩm vào giỏ
  addToCart: ({ productId, quantity, selectedVariant }: AddToCartPayload) =>
    axios.post("/cart/add", { productId, quantity, selectedVariant }),

  // 🔄 Cập nhật số lượng sản phẩm
  updateItem: ({ productId, quantity }: UpdateCartItemPayload) =>
    axios.put("/cart/update", { productId, quantity }),

  // ❌ Xoá sản phẩm khỏi giỏ
  removeItem: (productId: string) =>
    axios.delete(`/cart/remove/${productId}`),

  // 🧹 Xoá toàn bộ giỏ hàng
  clearCart: () => axios.delete("/cart/clear"),

  // 💳 Thanh toán giỏ hàng
  checkout: (discountCode?: string) =>
    axios.post("/cart/checkout", discountCode ? { discountCode } : {}),

  // ✅ Xác nhận đơn hàng trước khi thanh toán
  confirmCheckout: async (): Promise<Confirmation> => {
    const res = await axios.get("/cart/confirm");
    return res.data?.data;
  },

  // ✅ Tick chọn hoặc bỏ chọn sản phẩm để thanh toán
  selectItem: (itemId: string, isSelected: boolean) =>
  axios.patch(`/cart/select/${itemId}`, { isSelected }),
};

export default cartService;