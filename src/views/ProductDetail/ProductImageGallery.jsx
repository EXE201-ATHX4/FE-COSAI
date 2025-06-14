import { useState } from "react";
import { Box, Paper, IconButton, CardMedia } from "@mui/material";
import { ChevronLeft, ChevronRight, ZoomIn } from "@mui/icons-material";

function ProductImageGallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          mb: 2,
          borderRadius: 1,
          overflow: "hidden",
          bgcolor: "white",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "300px", sm: "400px", md: "500px" },
            cursor: isZoomed ? "zoom-out" : "zoom-in",
            overflow: "hidden",
          }}
          onClick={toggleZoom}
        >
          <CardMedia
            component="img"
            src={images[currentImage] || "/placeholder.svg"}
            alt="Product image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: isZoomed ? "cover" : "contain",
              transition: "transform 0.3s ease",
              transform: isZoomed ? "scale(1.5)" : "scale(1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(255,255,255,0.7)",
              borderRadius: "50%",
              p: 0.5,
              zIndex: 2,
            }}
          >
            <ZoomIn sx={{ color: "#0a5c36" }} />
          </Box>
        </Box>

        <IconButton
          sx={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
            zIndex: 2,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handlePrevImage();
          }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
            zIndex: 2,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleNextImage();
          }}
        >
          <ChevronRight />
        </IconButton>
      </Paper>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "3px",
          },
        }}
      >
        {images.map((image, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              width: "80px",
              height: "80px",
              position: "relative",
              cursor: "pointer",
              border:
                index === currentImage
                  ? "2px solid #0a5c36"
                  : "2px solid transparent",
              borderRadius: 1,
              overflow: "hidden",
              flexShrink: 0,
              bgcolor: "white",
            }}
            onClick={() => handleThumbnailClick(index)}
          >
            <CardMedia
              component="img"
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default ProductImageGallery;
