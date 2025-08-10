import React from "react";
import { Box, Typography, Divider } from "@mui/material";

interface OrderReviewProps {
  cart: {
    items: {
      quantity: number;
      productData: {
        name: string;
        price: number;
        selectedVariant?: {
          name: string;
        };
        sellerID?: {
          storeName: string;
        };
      };
    }[];
  };
}

const OrderReview: React.FC<OrderReviewProps> = ({ cart }) => {
  const total = cart.items.reduce((sum, item) => {
    return sum + item.quantity * item.productData.price;
  }, 0);

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        🧾 Xem lại đơn hàng
      </Typography>

      {cart.items.map((item, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography fontWeight={600}>{item.productData.name}</Typography>
          {item.productData.selectedVariant && (
            <Typography variant="body2" color="text.secondary">
              Biến thể: {item.productData.selectedVariant.name}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Số lượng: {item.quantity}
          </Typography>
          <Typography color="primary">
            {(item.quantity * item.productData.price).toLocaleString()}₫
          </Typography>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}

      <Box sx={{ mt: 3 }}>
        <Typography fontWeight={700}>
          💰 Tổng tiền: {total.toLocaleString()}₫
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderReview;