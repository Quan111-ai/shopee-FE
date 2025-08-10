import React from "react";
import { Box, Typography, Avatar, Chip } from "@mui/material";

export interface Seller {
  _id: string;
  storeName: string;
  storeDescription?: string;
  avatar?: string;
  rank?: "Đồng" | "Bạc" | "Vàng" | "Kim Cương";
  email?: string;
}

interface Props {
  seller: Seller;
}

const SellerCard: React.FC<Props> = ({ seller }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Avatar
        src={seller.avatar || ""}
        alt={seller.storeName}
        sx={{ width: 56, height: 56 }}
      />
      <Box flex={1}>
        <Typography variant="subtitle1" fontWeight={600}>
          {seller.storeName}
        </Typography>
        {seller.storeDescription && (
          <Typography variant="body2" color="text.secondary">
            {seller.storeDescription}
          </Typography>
        )}
        {seller.rank && (
          <Chip
            label={`🏅 ${seller.rank}`}
            size="small"
            sx={{ mt: 0.5 }}
            color={
              seller.rank === "Kim Cương"
                ? "primary"
                : seller.rank === "Vàng"
                ? "warning"
                : seller.rank === "Bạc"
                ? "default"
                : "secondary"
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default SellerCard;