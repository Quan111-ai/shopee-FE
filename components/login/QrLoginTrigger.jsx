import React from "react";
import { Box, Typography } from "@mui/material";
import QrIcon from "@mui/icons-material/QrCode2"; // Shopee-style icon

const QrLoginTrigger = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      bgcolor: "#fff8e1",           // Màu nền vàng nhẹ giống Shopee
      borderRadius: 1.5,
      px: 1.5,
      py: 0.75,
      cursor: "pointer",
      boxShadow: 1,
      "&:hover": { bgcolor: "#fff3c0" }
    }}
  >
    <QrIcon sx={{ fontSize: 24, color: "#ee4d2d" }} />
    <Typography fontSize={14} fontWeight={500} color="#333">
      Đăng nhập với mã QR
    </Typography>
  </Box>  
);

export default QrLoginTrigger;