import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { categoryGroupService } from "../../services/categoryGroupService";

interface CategoryGroup {
  _id: string;
  name: string;
  thumbnail: string;
}

export default function CategoryGroupDesktop() {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    categoryGroupService
      .getAll()
      .then((res) => {
        setGroups(res.data.data); // hoặc res.data tùy backend
      })
      .catch((err) => {
        console.error("Không thể load ngành hàng:", err);
      });
  }, []);

  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        🧭 Danh mục ngành hàng
      </Typography>
      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid
            item
            key={group._id}
            xs={12}
            sx={{
              flexBasis: "20%",
              maxWidth: "20%",
            }}
          >
            <Box
              onClick={() => navigate(`/category/${group._id}`)}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                "&:hover": { opacity: 0.9 },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 1,
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: 1,
                }}
              >
                <img
                  src={group.thumbnail}
                  alt={group.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography variant="body2" fontWeight={500}>
                {group.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}