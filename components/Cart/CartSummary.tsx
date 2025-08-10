import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

interface CartSummaryProps {
  cart: {
    items: {
      productId: string;
      quantity: number;
      productData: {
        price: number;
      };
    }[];
  };
  selectedProductIds?: string[];
  onCartUpdate?: () => void;
  onCheckout?: (params: {
    discountCode: string;
    selectedProductIds: string[];
  }) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  selectedProductIds = [],
  onCartUpdate,
  onCheckout,
}) => {
  const [discountCode, setDiscountCode] = useState("");

  const total = cart.items.reduce((sum, item) => {
    if (!selectedProductIds.includes(item.productId)) return sum;
    return sum + item.quantity * item.productData.price;
  }, 0);

  const handleCheckout = () => {
    onCheckout?.({
      discountCode,
      selectedProductIds,
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography fontWeight={600} mb={2}>
        💳 Tổng kết đơn hàng
      </Typography>

      <Typography>
        🔢 Tổng tiền: {total.toLocaleString()}₫
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          label="Mã giảm giá"
          size="small"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleCheckout}
          disabled={selectedProductIds.length === 0}
        >
          Thanh toán
        </Button>
      </Box>
    </Box>
  );
};

export default CartSummary;