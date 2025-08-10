import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  redirectUrl: string;
  isDisplayed: boolean;
}

export default function BannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axiosInstance
      .get("/banner")
      .then((res) => {
        const displayed = res.data.data.items.filter(
          (b: Banner) => b.isDisplayed
        );
        setBanners(displayed);
      })
      .catch((err) => {
        console.error("Không thể load banner:", err);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners]);

  if (banners.length === 0) return null;

  return (
    <div style={styles.slider}>
      {banners.map((banner, index) => (
        <a
          key={banner._id}
          href={banner.redirectUrl}
          style={{
            ...styles.slide,
            display: index === current ? "block" : "none",
          }}
        >
          <img
            src={banner.imageUrl}
            alt={banner.title}
            style={styles.image}
          />
        </a>
      ))}
      <div style={styles.dots}>
        {banners.map((_, index) => (
          <span
            key={index}
            style={{
              ...styles.dot,
              backgroundColor: index === current ? "#f53d2d" : "#ccc",
            }}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  slider: {
    position: "relative",
    width: "100%",
    height: "300px",
    overflow: "hidden",
    borderRadius: "8px",
  },
  slide: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  },
  dots: {
    position: "absolute",
    bottom: "12px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};