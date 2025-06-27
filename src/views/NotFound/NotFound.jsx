import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <Box className="not-found-container">
      {/* Animated Background Elements */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* 404 Number with Animation */}
        <div className="error-number">
          <span className="digit digit-4-1">4</span>
          <span className="digit digit-0">0</span>
          <span className="digit digit-4-2">4</span>
        </div>

        {/* Glitch Effect Text */}
        <Typography 
          variant="h3" 
          className="glitch-text"
          data-text="TRANG KHÔNG TỒN TẠI"
        >
          TRANG KHÔNG TỒN TẠI
        </Typography>

        {/* Description with fade-in animation */}
        <Typography 
          variant="body1" 
          className="description-text"
        >
          Oops! Có vẻ như bạn đã lạc vào một vùng không gian số không tồn tại.
          <br />
          Đường dẫn này có thể đã bị di chuyển hoặc không còn khả dụng nữa.
        </Typography>

        {/* Animated Home Button */}
        <Button
          variant="contained"
          onClick={() => navigate("/home")}
          className="home-button"
          startIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          }
        >
          <span className="button-text">Về trang chủ</span>
          <div className="button-ripple"></div>
        </Button>

        {/* Additional Navigation */}
        <div className="additional-links">
          <Button 
            variant="text" 
            className="link-button"
            onClick={() => window.history.back()}
          >
            ← Quay lại trang trước
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-elements">
        <div className="orbit orbit-1">
          <div className="planet"></div>
        </div>
        <div className="orbit orbit-2">
          <div className="planet"></div>
        </div>
        <div className="orbit orbit-3">
          <div className="planet"></div>
        </div>
      </div>
    </Box>
  );
}