import React from "react";
import { Box, Typography } from "@mui/material";

// ✅ Định nghĩa kiểu props
interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  discount?: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  originalPrice,
  discount,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
    <Typography variant="h5" fontWeight={700} color="#ee4d2d">
      ₫{price.toLocaleString()}
    </Typography>
    {originalPrice && (
      <Typography
        variant="body2"
        sx={{ textDecoration: "line-through", color: "#999" }}
      >
        ₫{originalPrice.toLocaleString()}
      </Typography>
    )}
    {discount && (
      <Box
        sx={{
          bgcolor: "#fceae8",
          color: "#ee4d2d",
          fontSize: 14,
          px: 1,
          py: 0.4,
          borderRadius: 1,
        }}
      >
        -{discount}%
      </Box>
    )}
  </Box>
);

export default ProductPrice;