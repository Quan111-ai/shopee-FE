import React from "react";
import { Box, Typography } from "@mui/material";

// ✅ Định nghĩa kiểu dữ liệu cho props
interface Category {
  name: string;
}

interface Seller {
  storeName?: string;
  name?: string;
}

interface ProductInfoProps {
  name: string;
  description: string;
  category?: Category;
  seller?: Seller;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  description,
  category,
  seller,
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h4" fontWeight={600} mb={1}>
      {name}
    </Typography>
    <Typography variant="body2" color="#555" mb={2}>
      Danh mục: {category?.name}
    </Typography>
    <Typography variant="body2" color="#555" mb={2}>
      Người bán: {seller?.storeName || seller?.name}
    </Typography>
    <Typography variant="body1" color="#333">
      {description}
    </Typography>
  </Box>
);

export default ProductInfo;