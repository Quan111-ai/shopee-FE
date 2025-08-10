import { useState, useEffect } from "react";
import cartService from "../services/cartService";
import { Cart } from "../types/cart";

const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = async () => {
    setLoading(true);
    try {
      const cartData = await cartService.getCart();

      // ✅ Kiểm tra giỏ hàng hợp lệ trước khi set
      if (!cartData || typeof cartData !== "object" || !Array.isArray(cartData.items)) {
        setCart(null);
        setError("Giỏ hàng trống hoặc không hợp lệ");
        return;
      }

      setCart(cartData);
      setError(null);
    } catch (err) {
      console.error("❌ Lỗi khi lấy giỏ hàng:", err);
      setCart(null);
      setError("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (payload: {
    productId: string;
    quantity: number;
    selectedVariant?: string;
  }) => {
    await cartService.addToCart(payload);
    await refreshCart();
  };

  const updateItem = async (payload: {
    productId: string;
    quantity: number;
  }) => {
    await cartService.updateItem(payload);
    await refreshCart();
  };

  const removeItem = async (productId: string) => {
    await cartService.removeItem(productId);
    await refreshCart();
  };

  const clearCart = async () => {
    await cartService.clearCart();
    await refreshCart();
  };

  return {
    cart,
    loading,
    error,
    refreshCart,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
  };
};

export default useCart;