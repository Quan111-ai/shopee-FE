import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// ✅ Định nghĩa kiểu dữ liệu cho product
interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sold?: number;
  imageURL?: string;
  discount?: number;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    price,
    originalPrice,
    sold = 0,
    imageURL,
    discount,
  } = product;

  const fallbackImage = "https://via.placeholder.com/220?text=No+Image";

  return (
    <Box
      onClick={() => navigate(`/products/${_id}`)}
      sx={{
        width: 220,
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
        bgcolor: "#fff",
        cursor: "pointer",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        transform: "perspective(1200px)",
        zIndex: 0,
        ":hover": {
          transform:
            "perspective(1200px) translateY(-18px) scale(1.08) rotateX(5deg)",
          boxShadow: "0px 18px 24px rgba(0,0,0,0.3)",
          zIndex: 10,
        },
      }}
    >
      {/* Ảnh sản phẩm */}
      <Box
        component="img"
        src={imageURL || fallbackImage}
        alt={name}
        sx={{
          width: "100%",
          height: 220,
          objectFit: "cover",
          transition: "transform 0.3s ease",
        }}
      />

      {/* Nội dung sản phẩm */}
      <Box sx={{ p: 1.5 }}>
        <Typography
          fontSize={14}
          fontWeight={500}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 0.5,
          }}
        >
          {name}
        </Typography>

        {/* Giá */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontWeight={600} color="#ee4d2d">
            ₫{price.toLocaleString()}
          </Typography>
          {originalPrice && (
            <Typography
              fontSize={13}
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
                fontSize: 12,
                px: 0.8,
                py: 0.2,
                borderRadius: 1,
              }}
            >
              -{discount}%
            </Box>
          )}
        </Box>

        {/* Đã bán */}
        <Typography fontSize={12} color="#777" mt={0.5}>
          Đã bán {sold}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;