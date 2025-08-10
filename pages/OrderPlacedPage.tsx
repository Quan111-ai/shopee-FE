import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderPlacedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ px: 6, py: 4, maxWidth: 720, mx: "auto", textAlign: "center" }}>
      <Typography variant="h4" fontWeight={700} color="success.main" mb={3}>
        🎉 Đặt hàng thành công!
      </Typography>

      <Typography variant="body1" mb={2}>
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Bạn có thể kiểm tra trạng thái đơn hàng trong phần "Đơn hàng của tôi".
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" onClick={() => navigate("/")}>
          🏠 Về trang chủ
        </Button>
        <Button variant="outlined" onClick={() => navigate("/orders/me")}>
          📦 Xem đơn hàng
        </Button>
      </Box>
    </Box>
  );
};

export default OrderPlacedPage;