import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import cartService from "../../services/cartService";

interface CartItemProps {
  item: {
    _id: string;
    productId: string;
    quantity: number;
    productData: {
      name: string;
      price: number;
      imageURL?: string;
      selectedVariant?: {
        _id: string;
        name: string;
        price?: number;
      };
    };
  };
  isSelected?: boolean;
  onToggle?: (itemId: string) => void;
  onCartUpdate?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  isSelected,
  onToggle,
  onCartUpdate,
}) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [loading, setLoading] = useState(false);
console.log("CartItem rendered with item:", item);
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await cartService.updateItem({
        productId: item.productId,
        quantity,
      });
      onCartUpdate?.();
    } catch (err) {
      console.error("❌ Lỗi update giỏ:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await cartService.removeItem(item.productId);
      onCartUpdate?.();
    } catch (err) {
      console.error("❌ Lỗi xoá sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Checkbox
        checked={!!isSelected}
        onChange={() => onToggle?.(item._id)} // ✅ dùng _id chính xác
        sx={{ mr: 1 }}
      />

      <Box sx={{ width: 80, height: 80, mr: 2 }}>
        <img
          src={item.productData.imageURL || "/placeholder.png"}
          alt={item.productData.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography fontWeight={600}>{item.productData.name}</Typography>
        {item.productData.selectedVariant && (
          <Typography variant="body2" color="text.secondary">
            Biến thể: {item.productData.selectedVariant.name}
          </Typography>
        )}
        <Typography color="primary" mt={0.5}>
          {item.productData.price.toLocaleString()}₫
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          type="number"
          size="small"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          inputProps={{ min: 1 }}
          sx={{ width: 80 }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleUpdate}
          disabled={loading}
        >
          Cập nhật
        </Button>
        <IconButton onClick={handleRemove} disabled={loading}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;