import { useState } from 'react';
import { Box, TextField, InputAdornment, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginRight: 3 }}>
      <TextField
        size="small"
        placeholder="Tìm kiếm sản phẩm"
        
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  marginLeft: 1,
                }}
              >
                <SearchIcon sx={{ color: '#52B788', fontSize: 30 }} />
              </Box>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={handleSearch}
                sx={{
                //   backgroundColor: '#4CAF50',
                  color: '#316D52',
                  padding: '6px 16px',
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                    border: 'none',
                }}
              >
                Tìm kiếm
              </Button>
            </InputAdornment>
          ),
        }}
        sx={{
          width: { xs: '250px', sm: '350px', md: '450px' },
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 00, 0, 0.15)',
            color: '#52B788',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-input': {
            padding: '12px 16px',
            color: 'black',
            fontSize: '16px',
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'black',
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}

export default SearchBar;