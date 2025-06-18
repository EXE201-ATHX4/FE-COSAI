import { useState } from "react";
import { Box, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import banner from "../../assets/banner.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setCurrentBanner((prev) => (prev === 0 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", mb: 0 }}>
      <Box
        sx={{
          position: "relative",
          height: { xs: "300px", sm: "400px", md: "500px" },
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={banner}
          alt="Nước Tẩy Trang"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />
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
