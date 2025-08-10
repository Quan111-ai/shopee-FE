import React from "react";
import { Grid } from "@mui/material";
import { Seller } from "../../services/sellerService";
import MallShopCard from "./MallShopCard";

type Props = {
  shops: Seller[];
};

const MallShopList: React.FC<Props> = ({ shops }) => {
  if (!Array.isArray(shops)) {
    console.warn("⚠️ shops không phải mảng:", shops);
    return <div>Không có shop nào để hiển thị.</div>;
  }

  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      {shops.map((shop) => (
        <Grid
          key={shop._id}
          sx={{ gridColumn: { xs: "span 4", sm: "span 4", md: "span 3" } }}
        >
          <MallShopCard shop={shop} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MallShopList;