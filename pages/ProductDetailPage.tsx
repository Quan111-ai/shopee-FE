import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import productService from "../services/productService";
import cartService from "../services/cartService";

import ProductGallery from "../components/ProductDetail/ProductGallery";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import ProductPrice from "../components/ProductDetail/ProductPrice";
import ProductVariant from "../components/ProductDetail/ProductVariant";
import AddToCartButton from "../components/ProductDetail/AddToCartButton";

// ✅ Kiểu dữ liệu cơ bản
interface Variant {
  _id: string;
  name?: string;
  price?: number;
}

interface Product {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  imageURL?: string;
  gallery?: string[];
  categoryID?: string;
  sellerID?: string;
  variants?: Variant[];
  activeDeals?: { discountPercentage?: number }[];
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getById(id || "");
        const prod = response.data.data.product;
        setProduct(prod);
        setSelectedVariant(prod.variants?.[0]?._id || null);
      } catch (err) {
        console.error("❌ Lỗi load sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    try {
      await cartService.addToCart({
        productId: product._id,
        selectedVariant,
        quantity: 1,
      });
      console.log("✅ Đã thêm vào giỏ:", product._id);
      // 👉 Có thể gắn toast hoặc gọi refreshCart() nếu dùng useCart
    } catch (err) {
      console.error("❌ Lỗi khi thêm vào giỏ:", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        Sản phẩm không tồn tại hoặc đã bị xóa
      </Box>
    );
  }

  return (
    <Box sx={{ px: 6, py: 4, maxWidth: 1200, mx: "auto" }}>
      {/* Top section: ảnh + thông tin */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Trái: ảnh */}
        <Box sx={{ flex: "0 0 480px" }}>
          <ProductGallery images={product.gallery || [product.imageURL || ""]} />
        </Box>

        {/* Phải: thông tin */}
        <Box sx={{ flex: 1 }}>
          <ProductInfo
            name={product.name}
            category={product.categoryID}
            seller={product.sellerID}
          />

          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.activeDeals?.[0]?.discountPercentage}
          />

          <ProductVariant
            variants={product.variants || []}
            onSelect={setSelectedVariant}
          />

          <AddToCartButton
            onAdd={handleAddToCart}
            disabled={!selectedVariant}
          />
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* Dưới: mô tả chi tiết */}
      <Box>
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              fontSize: 18,
              fontWeight: 600,
              mb: 1,
              color: "#333",
            }}
          >
            Mô tả sản phẩm
          </Box>
          <Box sx={{ whiteSpace: "pre-line", color: "#555" }}>
            {product.description}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;