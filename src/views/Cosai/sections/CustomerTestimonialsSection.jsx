import { Box, Typography } from "@mui/material";
import React from "react";

export const CustomerTestimonialsSection = () => {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "68px", py: 2 }}>
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontFamily: "'Anton', Helvetica",
          fontSize: "45px",
          fontWeight: "normal",
          lineHeight: "normal",
        }}
      >
        <Box component="span" sx={{ color: "#023a15" }}>
          TÍNH NĂNG
        </Box>
        <Box component="span" sx={{ color: "#329066" }}>
          {" NỔI BẬT"}
        </Box>
      </Typography>

      <Box
        component="img"
        src="https://c.animaapp.com/mbs5h78mOlSTof/img/line-3.svg"
        alt="Decorative line"
        sx={{
          position: "absolute",
          width: "35%",
          height: "1px",
          left: 0,
          top: "33px",
          objectFit: "cover",
        }}
      />

      <Box
        component="img"
        src="https://c.animaapp.com/mbs5h78mOlSTof/img/line-4-1.svg"
        alt="Decorative line"
        sx={{
          position: "absolute",
          width: "35%",
          height: "1px",
          right: 0,
          top: "33px",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};
