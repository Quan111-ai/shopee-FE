import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import cartService, { Confirmation } from "../services/cartService";
import OrderReview from "../components/Oder/oderReview";

const OrderReviewPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfirmation = async () => {
      try {
        const res = await cartService.confirmCheckout();
        setConfirmation(res);
      } catch (err) {
        console.error("❌ Lỗi khi xác nhận đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfirmation();
  }, []);

  const handleConfirmCheckout = async () => {
    try {
      await cartService.checkout();
      navigate("/order/placed");
    } catch (err) {
      console.error("❌ Lỗi khi thanh toán:", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!confirmation || confirmation.items.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography>Giỏ hàng trống hoặc không thể xác nhận đơn hàng.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 6, py: 4, maxWidth: 960, mx: "auto" }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        ✅ Xác nhận đơn hàng
      </Typography>

      <OrderReview
        cart={{
          items: confirmation.items.map((item) => ({
            quantity: item.quantity,
            productData: {
              name: item.name,
              price: item.price,
              selectedVariant: item.variant ? { name: item.variant.name } : undefined,
              sellerID: { storeName: "?" }, // Có thể truyền seller chuẩn sau nếu backend trả
            },
          })),
        }}
      />

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button variant="contained" color="success" onClick={handleConfirmCheckout}>
          Xác nhận thanh toán
        </Button>
      </Box>
    </Box>
  );
};

export default OrderReviewPage;