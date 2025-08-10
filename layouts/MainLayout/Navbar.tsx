import React from "react";
import { Box, Button } from "@mui/material";

const categories: string[] = ["Thời trang", "Điện tử", "Gia dụng", "Sách", "Thể thao"];

const Navbar: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      gap: 2,
      px: 2,
      py: 1,
      backgroundColor: "#fff",
      borderBottom: "1px solid #eee",
    }}
  >
    {categories.map((cat) => (
      <Button key={cat} variant="text" sx={{ color: "#333", textTransform: "none" }}>
        {cat}
      </Button>
    ))}
  </Box>
);

export default Navbar;