import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "../../types/cart";

interface ShopGroupProps {
  sellerID: string;
  items: CartItemType[];
  onCartUpdate?: () => void;
}

const ShopGroup: React.FC<ShopGroupProps> = ({ sellerID, items, onCartUpdate }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight={700} color="primary" mb={1}>
        🏬 Shop: {sellerID || "Không rõ shop"}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {items.map((item, index) => {
        const safeKey = `${item.productId?.toString() || "item"}-${index}`;
        return (
          <CartItem
            key={safeKey}
            item={item}
            onCartUpdate={onCartUpdate}
          />
        );
      })}
    </Box>
  );
};

export default ShopGroup;