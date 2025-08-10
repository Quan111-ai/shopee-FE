import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

// ✅ Định nghĩa kiểu dữ liệu cho variant
interface Variant {
  _id: string;
  name: string;
  price: number;
}

interface ProductVariantProps {
  variants?: Variant[];
  onSelect?: (variantId: string) => void;
}

const ProductVariant: React.FC<ProductVariantProps> = ({
  variants = [],
  onSelect,
}) => {
  const [selected, setSelected] = useState<string>(variants[0]?._id || "");

  const handleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelected(value);
    onSelect?.(value);
  };

  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id="variant-select-label">Chọn phiên bản</InputLabel>
      <Select
        labelId="variant-select-label"
        value={selected}
        label="Chọn phiên bản"
        onChange={handleChange}
      >
        {variants.map((v) => (
          <MenuItem key={v._id} value={v._id}>
            {v.name} – ₫{v.price.toLocaleString()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductVariant;