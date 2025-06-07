import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  TextField, 
  InputAdornment,
  Box,
  Badge,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Person as PersonIcon, 
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon
} from '@mui/icons-material';
import SearchBar from './SearchBar';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Tìm kiếm:', searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: '#52B788',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Toolbar sx={{ padding: '8px 0', minHeight: '70px' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 4 }}>
            <img
              src="/src/assets/logo_no_bg_w.svg"
              alt="Logo"
              style={{  marginRight: 8 ,width: 60, height: 60, borderRadius: '50%' }}
            />
          </Box>

          {/* Navigation Menu */}
          <Box sx={{ display: 'flex', gap: 3, marginRight: 'auto' }}>
            <Button 
              color="inherit" 
              sx={{ 
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              TRANG CHỦ
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              SẢN PHẨM
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              COSAI
            </Button>
          </Box>

          {/* Search Bar */}
          <SearchBar/>

          {/* User Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 ,}}>
            <Button
              
              startIcon={<PersonIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: '10px',
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.3)',
                backgroundColor:'rgb(255, 253, 253)',
                color:"#1E4434",
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Tài khoản
            </Button>
            
            <IconButton
              color="inherit"
              sx={{
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
