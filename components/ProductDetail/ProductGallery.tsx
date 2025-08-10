import React, { useState, useRef } from "react";
import { Box } from "@mui/material";

// ✅ Định nghĩa kiểu props
interface ProductGalleryProps {
  images?: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images = [] }) => {
  const fallbackImage = "https://via.placeholder.com/480?text=No+Image";
  const validImages = images.length > 0 ? images : [fallbackImage];
  const [mainImage, setMainImage] = useState<string>(validImages[0]);

  // ✅ Ref cho thumbnail: mảng các HTMLDivElement hoặc null
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = (img: string, idx: number) => {
    setMainImage(img);
    thumbRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <Box>
      {/* Ảnh lớn */}
      <Box
        component="img"
        src={mainImage || fallbackImage}
        alt="Main"
        sx={{
          width: 480,
          height: 480,
          objectFit: "cover",
          borderRadius: 2,
          mb: 1,
          border: "1px solid #ddd",
        }}
      />

      {/* Slider thumbnail */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: 480,
          overflowX: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome
        }}
      >
        {validImages.map((img, idx) => (
          <Box
            key={idx}
            ref={(el) => (thumbRefs.current[idx] = el)}
            component="img"
            src={img || fallbackImage}
            alt={`Thumb ${idx}`}
            sx={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 1,
              cursor: "pointer",
              transition: "0.3s ease",
              flexShrink: 0,
              border:
                img === mainImage ? "2px solid #ee4d2d" : "1px solid #ddd",
              ":hover": {
                opacity: 0.9,
              },
            }}
            onClick={() => handleClick(img, idx)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductGallery;