// src/theme/index.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#ee4d2d' },     // Màu cam Shopee
    secondary: { main: '#f5f5f5' },   // Nền nhẹ
    text: { primary: '#212121' }
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 }
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&:hover': { backgroundColor: '#d84315' }
        }
      }
    }
  }
});

export default theme;