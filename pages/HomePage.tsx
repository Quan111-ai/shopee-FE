import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import ProductGrid from "../components/product/ProductGrid";
import BannerSlider from "../components/banner/BannerSlider";
import CategoryGroupDesktop from "../components/category/CategoryGroupDesktop";
import MallShopSection from "../components/shop/MallShopSection";
import TopSearchGallery from "../components/product/TopSearchGallery"; // ✅ Giao diện tìm kiếm phổ biến

const HomePage: React.FC = () => {
  return (
    <Box sx={{ px: 4, py: 3 }}>
      {/* Banner khuyến mãi */}
      <Box sx={{ mb: 4 }}>
        <BannerSlider />
      </Box>

      {/* Danh mục ngành hàng */}
      <Box sx={{ mb: 4 }}>
        <CategoryGroupDesktop />
      </Box>

      {/* ✅ Khu vực Shop Mall */}
      <Box sx={{ mb: 4 }}>
        <MallShopSection />
      </Box>

      {/* ✅ Giao diện tìm kiếm phổ biến */}
      <Box sx={{ mb: 4 }}>
        <TopSearchGallery />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Grid sản phẩm */}
      <ProductGrid />
    </Box>
  );
};

export default HomePage;