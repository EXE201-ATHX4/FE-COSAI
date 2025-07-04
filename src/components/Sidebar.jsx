import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  LocalShipping as ShippingIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Stars as StarsIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitIcon,
} from "@mui/icons-material";

const Sidebar = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: "account", label: "Thông tin tài khoản", icon: <PersonIcon /> },
    { id: "orders", label: "Đơn hàng của tôi", icon: <ShippingIcon /> },
    // { id: "favorites", label: "Sản phẩm yêu thích", icon: <FavoriteIcon /> },
    // { id: "address", label: "Địa chỉ giao hàng", icon: <LocationIcon /> },
    { id: "points", label: "Điểm tích lũy", icon: <StarsIcon /> },
    { id: "settings", label: "Cài đặt tài khoản", icon: <SettingsIcon /> },
    { id: "logout", label: "Đăng xuất", icon: <ExitIcon />, color: "error" },
  ];

  return (
    <Card
      sx={{
        width: 280,
        height: "fit-content",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{ width: 60, height: 60, mr: 2, backgroundColor: "#4CAF50" }}
          >
            <PersonIcon sx={{ color: "white" }} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: "#333", fontWeight: "600" }}>
              {localStorage.getItem("userName")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#023A15", fontSize: "0.8rem" }}
            >
              Email: {localStorage.getItem("userEmail")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#023A15", fontSize: "0.8rem" }}
            >
              Số điện thoại: 0903783442
            </Typography>
          </Box>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                // selected={activeItem === item.id}
                onClick={() => onItemClick(item.id)}
                sx={{
                  borderRadius: "8px",
                  mb: 0.5,
                  backgroundColor:
                    activeItem === item.id ? "#4CAF50" : "transparent",

                  "&:hover": {
                    backgroundColor:
                      activeItem === item.id
                        ? "#45a049"
                        : "rgba(76, 175, 80, 0.1)",
                  },
                  "& .MuiListItemIcon-root": {
                    color:
                      activeItem === item.id
                        ? "white"
                        : item.color === "error"
                        ? "#f44336"
                        : "#666",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      color:
                        activeItem === item.id
                          ? "white"
                          : item.color === "error"
                          ? "#f44336"
                          : "#666",
                      fontWeight: activeItem === item.id ? "600" : "400",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
