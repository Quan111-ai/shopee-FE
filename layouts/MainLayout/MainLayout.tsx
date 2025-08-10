import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;