import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import productService from "../../services/productService";
import ProductCard from "./ProductCard";
import { Product } from "../../services/productService";

const TopSearchGallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getPopular();
        const data = res.data?.data?.products;

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("Không tìm thấy mảng sản phẩm trong response:", res);
          setProducts([]);
        }
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm phổ biến:", err);
        setError("Không thể tải sản phẩm phổ biến.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        🔥 Sản phẩm được tìm kiếm nhiều
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          "& > *": {
            minWidth: "calc((100% - 8px * 4) / 5)", // 👈 chia đều 5 thẻ, trừ khoảng cách
            flexShrink: 0,
          },
          "&::-webkit-scrollbar": { height: 30 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: 3,
          },
        }}
      >
        {products.map((item, index) => (
          <Box key={item.id}>
            <ProductCard product={item} rank={index + 1} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopSearchGallery;