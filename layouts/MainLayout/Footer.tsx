import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => (
  <Box sx={{ bgcolor: "#f5f5f5", py: 2, mt: 4, textAlign: "center" }}>
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} Shopee Clone by Gia. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;