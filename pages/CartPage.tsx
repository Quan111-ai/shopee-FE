import React, { useState } from "react";
import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import { CartItem as CartItemType } from "../types/cart";
import cartService from "../services/cartService";

const CartPage: React.FC = () => {
  const { cart, loading, refreshCart } = useCart();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleToggle = async (itemId: string) => {
    const isCurrentlySelected = selectedItems.includes(itemId);
    const newState = !isCurrentlySelected;

    try {
      await cartService.selectItem(itemId, newState); // ✅ gọi API với item._id
      setSelectedItems((prev) =>
        newState
          ? [...prev, itemId]
          : prev.filter((id) => id !== itemId)
      );
    } catch (err) {
      console.error("❌ Lỗi cập nhật trạng thái chọn sản phẩm:", err);
    }
  };

  const handleCheckout = ({
    discountCode,
    selectedProductIds,
  }: {
    discountCode: string;
    selectedProductIds: string[];
  }) => {
    navigate("/order/review", {
      state: { discountCode, selectedProductIds },
    });
  };

  if (loading || !cart) {
    return (
      <Box sx={{ px: 4, py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        🛒 Giỏ hàng của bạn
      </Typography>

      {cart.items.length === 0 ? (
        <Typography>Giỏ hàng của bạn đang trống.</Typography>
      ) : (
        <>
          {cart.items.map((item) => {
         console.log("🧪 item._id:", item._id);
          return (
          <CartItem
          key={item._id}
          item={item}
          isSelected={selectedItems.includes(item._id)}
          onToggle={handleToggle}
          onCartUpdate={refreshCart}
          />
          );
          })}

          <Divider sx={{ my: 3 }} />

          <CartSummary
            cart={cart}
            selectedProductIds={selectedItems}
            onCartUpdate={refreshCart}
            onCheckout={handleCheckout}
          />
        </>
      )}
    </Box>
  );
};

export default CartPage;