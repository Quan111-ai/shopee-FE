import React, { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { sellerService, Seller } from "../../services/sellerService";
import MallShopList from "./MallShopList";
import bannerShopeeMall from "../../assets/images/shopmall.jpg"; // ảnh bên trái

const MallShopSection: React.FC = () => {
  const [shops, setShops] = useState<Seller[]>([]);

  useEffect(() => {
    sellerService
      .getByLevel("Shop Mall")
      .then((res) => {
        const sellers = Array.isArray(res.data?.data) ? res.data.data : [];
        setShops(sellers);
      })
      .catch((err) => console.error("Lỗi khi lấy Shop Mall:", err));
  }, []);

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Stack direction="row" spacing={4} alignItems="flex-start">
        {/* Bên trái: ảnh banner */}
        <Box sx={{ flex: "0 0 620px" }}>
        <a href="https://shopee.vn/mall" target="_blank" rel="noopener noreferrer">
          <img
            src={bannerShopeeMall}
            alt="Shopee Mall Banner"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 12,
              objectFit: "cover",
            }}
          />
        </a>
        </Box>

        {/* Bên phải: danh sách shop */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight={700} mb={1}>
             Shop Mall chính hãng
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Các shop được Shopee chứng nhận Mall, cam kết chính hãng 100%
          </Typography>

          <MallShopList shops={shops} />
        </Box>
      </Stack>
    </Box>
  );
};

export default MallShopSection;