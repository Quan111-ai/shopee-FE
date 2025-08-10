import React from "react";
import { Box, Typography, Avatar, Chip } from "@mui/material";
import { Seller } from "../../services/sellerService";

type Props = {
  shop: Seller;
};

const MallShopCard: React.FC<Props> = ({ shop }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #eee",
        borderRadius: 2,
        textAlign: "center",
        boxShadow: 1,
        "&:hover": { boxShadow: 3 },
      }}
    >
      <Avatar
        src={shop.avatar || ""}
        alt={shop.storeName}
        sx={{ width: 64, height: 64, mx: "auto", mb: 1 }}
      />
      <Typography variant="subtitle1" fontWeight={600}>
        {shop.storeName}
      </Typography>
      <Chip label={shop.level} color="error" size="small" sx={{ mt: 1 }} />
    </Box>
  );
};

export default MallShopCard;