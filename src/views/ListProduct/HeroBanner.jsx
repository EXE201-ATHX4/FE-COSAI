import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import banner from "../../assets/banner.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

const banners = [banner, banner2, banner3];

function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ position: "relative", overflow: "hidden", mb: 0 }}>
      <Box
        sx={{
          position: "relative",
          height: { xs: "300px", sm: "400px", md: "500px" },
          width: "100%",
        }}
      >
        {banners.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Banner ${index + 1}`}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: currentBanner === index ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              zIndex: currentBanner === index ? 1 : 0,
            }}
          />
        ))}

        {/* Indicator Dots */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            zIndex: 2,
          }}
        >
          {banners.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentBanner(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  currentBanner === index ? "#1976d2" : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Box>

      <Button
        sx={{
          position: "absolute",
          left: { xs: 8, md: 16 },
          top: "50%",
          transform: "translateY(-50%)",
          minWidth: "auto",
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.3)",
          color: "white",
          "&:hover": { bgcolor: "rgba(255,255,255,0.5)" },
          zIndex: 2,
        }}
        onClick={handlePrev}
      >
        <ChevronLeft />
      </Button>

      <Button
        sx={{
          position: "absolute",
          right: { xs: 8, md: 16 },
          top: "50%",
          transform: "translateY(-50%)",
          minWidth: "auto",
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.3)",
          color: "white",
          "&:hover": { bgcolor: "rgba(255,255,255,0.5)" },
          zIndex: 2,
        }}
        onClick={handleNext}
      >
        <ChevronRight />
      </Button>
    </Box>
  );
}

export default HeroBanner;
