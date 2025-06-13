import { Box, Container, Grid, Typography, Paper, Avatar, TextField, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

// Chat Demo Section Component
const ChatDemoSection = () => (
  <Box sx={{ py: 4, bgcolor: "#f2eee5" }}>
  <Container maxWidth="lg">
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      {/* Main Chat Interface */}
      <Grid width={"45%"}>
        <Paper
          elevation={5}
          sx={{
            borderRadius: "20px",
            bgcolor: "#f2eee5",
            overflow: "hidden",
            height: "500px",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: "#329066",
              p: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png"
              sx={{ width: 50, height: 50, mr: 2 }}
            />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#fdf5f3", fontWeight: "bold" }}
              >
                COSAI - BEAUTY AI ASSISTANT
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "#00ff56",
                    borderRadius: "50%",
                    mr: 0.5,
                  }}
                />
                <Typography sx={{ color: "#00ff56", fontSize: "12px" }}>
                  Online
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Chat Messages */}
          <Box sx={{ p: 2, height: "350px", overflowY: "auto" }}>
            {/* AI Message */}
            <Box sx={{ display: "flex", mb: 2 }}>
              <Avatar
                src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png"
                sx={{ width: 35, height: 35, mr: 1 }}
              />
              <Paper
                sx={{
                  bgcolor: "#329066",
                  color: "#fdf5f3",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "80%",
                }}
              >
                <Typography variant="body2">
                  Chào bạn! Mình là <strong>COSAI</strong> tư vấn viên AI của{" "}
                  <strong>Comestic Selling</strong>. Mình có thể giúp gì cho bạn?
                </Typography>
              </Paper>
            </Box>

            {/* User Message */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Paper
                sx={{
                  bgcolor: "#f9a65a",
                  color: "#023a15",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "80%",
                }}
              >
                <Typography variant="body2">
                  Da tôi hơi khô và nhạy cảm. Tôi đang tìm kiếm một sản phẩm dưỡng ẩm, cấp ẩm cho da.
                </Typography>
              </Paper>
            </Box>

            {/* AI Response */}
            <Box sx={{ display: "flex", mb: 2 }}>
              <Avatar
                src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png"
                sx={{ width: 35, height: 35, mr: 1 }}
              />
              <Paper
                sx={{
                  bgcolor: "#329066",
                  color: "#fdf5f3",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "80%",
                }}
              >
                <Typography variant="body2">
                  Với làn da khô và nhạy cảm, mình đề xuất các sản phẩm có chứa:
                  <br />• <strong>Dầu dừa</strong> (Coconut Oil)
                  <br />• <strong>Bơ hạt mỡ</strong> (Shea Butter)
                  <br />• <strong>Mật ong</strong>
                  <br />• <strong>Nước hoa hồng</strong> (Rose Water)
                  <br /><br />
                  Bạn muốn xem sản phẩm cụ thể không?
                </Typography>
              </Paper>
            </Box>
          </Box>

          {/* Input */}
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              placeholder="Nhập câu hỏi của bạn..."
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  bgcolor: "white",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        bgcolor: "#329066",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <SendIcon sx={{ color: "white", fontSize: 18 }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Paper>
      </Grid>

      {/* Floating Chat Avatar */}
      <Grid width={"45%"}>
        <Paper
          elevation={5}
          sx={{
            borderRadius: "20px",
            bgcolor: "#f2eee5",
            overflow: "hidden",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ position: "relative", textAlign: "center" }}>
            <Avatar
              src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png"
              sx={{
                width: 200,
                height: 200,
                mx: "auto",
                boxShadow: "0 20px 40px rgba(50, 144, 102, 0.3)",
                border: "8px solid #329066",
              }}
            />
            {/* Floating Chat Button */}
            <Box
              sx={{
                position: "absolute",
                bottom: -20,
                right: "20%",
                bgcolor: "#329066",
                borderRadius: "50%",
                p: 1,
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
            >
              <Typography sx={{ color: "white", fontSize: "12px", px: 1 }}>
                CHATBOX
              </Typography>
            </Box>
          </Box>
          {/* Chat Messages */}
          <Box sx={{ p: 2, height: "350px", overflowY: "auto", mt: 2 }}>
            {/* AI Message */}
            <Box sx={{ display: "flex", mb: 2 }}>
              <Avatar
                src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png"
                sx={{ width: 35, height: 35, mr: 1 }}
              />
              <Paper
                sx={{
                  bgcolor: "#329066",
                  color: "#fdf5f3",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "80%",
                }}
              >
                <Typography variant="body2">
                  Chào bạn! Mình là <strong>COSAI</strong> tư vấn viên AI của{" "}
                  <strong>Comestic Selling</strong>. Mình có thể giúp gì cho bạn?
                </Typography>
              </Paper>
            </Box>

            {/* User Message */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Paper
                sx={{
                  bgcolor: "#f9a65a",
                  color: "#023a15",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "80%",
                }}
              >
                <Typography variant="body2">
                  Da tôi hơi khô và nhạy cảm. Tôi đang tìm kiếm một sản phẩm dưỡng ẩm, cấp ẩm cho da.
                </Typography>
              </Paper>
            </Box>

            {/* AI Response */}
            <Box sx={{ display: "flex", mb: 2 }}>
              <Avatar
                src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png"
                sx={{ width: 35, height: 35, mr: 1 }}
              />
              <Paper
                sx={{
                  bgcolor: "#329066",
                  color: "#fdf5f3",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "80%",
                }}
              >
                <Typography variant="body2">
                  Với làn da khô và nhạy cảm, mình đề xuất các sản phẩm có chứa:
                  <br />• <strong>Dầu dừa</strong> (Coconut Oil)
                  <br />• <strong>Bơ hạt mỡ</strong> (Shea Butter)
                  <br />• <strong>Mật ong</strong>
                  <br />• <strong>Nước hoa hồng</strong> (Rose Water)
                  <br /><br />
                  Bạn muốn xem sản phẩm cụ thể không?
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  </Container>
</Box>
);

export default ChatDemoSection;