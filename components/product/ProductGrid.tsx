import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";
import productService from "../../services/productService";

// ✅ Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sold?: number;
  imageURL?: string;
  discount?: number;
}

const LIMIT = 20;

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await productService.getAll({ limit: LIMIT, page });
      const result: Product[] = response.data?.data?.products || [];

      console.log(`📦 Trang ${page}:`, result);

      if (Array.isArray(result)) {
        setProducts((prev) => [...prev, ...result]);
        setHasMore(result.length === LIMIT);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi getAll sản phẩm:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchProducts();
      }
    });

    if (lastProductRef.current) {
      observer.current.observe(lastProductRef.current);
    }
  }, [loading]);

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        📦 Danh sách sản phẩm
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 2,
        }}
      >
        {products.map((item, index) => {
          const isLast = index === products.length - 1;
          return (
            <Box key={item._id} ref={isLast ? lastProductRef : null}>
              <ProductCard product={item} />
            </Box>
          );
        })}
      </Box>

      {loading && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid;