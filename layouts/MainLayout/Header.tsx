import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import SearchBar from "../../components/search/SearchBar";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { cart, loading } = useCart();
  const navigate = useNavigate();

  const cartCount = cart?.items?.length || 0;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "#ee4d2d", height: 64, justifyContent: "center" }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: "#fff", letterSpacing: 0.5, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Clone Shopee
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ width: { xs: 200, sm: 300, md: 400 } }}>
            <SearchBar />
          </Box>

          <IconButton
            sx={{ color: "#fff" }}
            onClick={() => navigate("/cart")}
            disabled={loading}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;