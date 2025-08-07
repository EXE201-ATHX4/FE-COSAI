import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ setIsLoggedIn, setUserName, handleAccountMenuClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handler for the "Đăng xuất" (Logout) action
  const handleLogout = () => {
    // In a real application, this is where you'd clear user session/token
    console.log("Đang đăng xuất...");
    localStorage.removeItem("isLoggedIn"); // Remove login status from localStorage
    localStorage.removeItem("userName"); // Remove user name from localStorage
    setIsLoggedIn(false); // Update state
    setUserName(""); // Clear user name in state
    if (handleAccountMenuClose) {
      handleAccountMenuClose(); // Close the menu after logout action (if provided)
    }
    navigate("/login"); // Navigate to the login page
  };

  const menuItems = [
    // { text: 'Tổng Quan', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: "Sản Phẩm", icon: <ShoppingBagIcon />, path: "/admin/products" },
    {
      text: "Giao Dịch",
      icon: <AttachMoneyIcon />,
      path: "/admin/transactions",
    },

    { text: "Nhà Cung Cấp", icon: <StoreIcon />, path: "/admin/suppliers" },
    { text: "Người Dùng", icon: <PeopleIcon />, path: "/admin/users" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
          border: "none",
        },
      }}
    >
      {/* Header */}
      <Toolbar
        sx={{
          minHeight: "80px !important",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              lineHeight: 1.3,
            }}
          >
            🌿 Quản Lý Mỹ Phẩm
            <br />
            <span style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
              Thuần Chay
            </span>
          </Typography>
        </Box>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />

      {/* Menu Items */}
      <List sx={{ padding: "16px 8px" }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: "12px",
                margin: "4px 0",
                padding: "12px 16px",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                backgroundColor: isActive
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
                backdropFilter: isActive ? "blur(10px)" : "none",
                boxShadow: isActive ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  transform: "translateX(4px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: isActive ? "4px" : "0px",
                  backgroundColor: "#fff",
                  transition: "width 0.3s ease",
                  borderRadius: "0 4px 4px 0",
                },
                "&:hover::before": {
                  width: "4px",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: "40px",
                  transition: "transform 0.3s ease",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "0.95rem",
                    color: "#fff",
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>

      {/* Footer with Logout Button */}
      <Box
        sx={{
          marginTop: "auto",
          padding: "20px",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Button
          fullWidth
          onClick={handleLogout}
          sx={{
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            transition: "all 0.3s ease",
            textTransform: "none",
            fontSize: "0.95rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgba(255, 82, 82, 0.2)",
              borderColor: "rgba(255, 82, 82, 0.4)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(255, 82, 82, 0.3)",
            },
          }}
          startIcon={<LogoutIcon />}
        >
          Đăng Xuất
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
