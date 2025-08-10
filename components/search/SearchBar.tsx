import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed) {
      navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "#fff",
        borderRadius: 2,
        px: 2,
        height: 38,
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="🔍 Tìm sản phẩm, thương hiệu và hơn thế nữa..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          disableUnderline: true,
          sx: { fontSize: 14 },
        }}
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon sx={{ color: "#999" }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;