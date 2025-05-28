import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import RoadMap from './components/RoadMap';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f6fa'
    }
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.MuiListItem-button': {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <RoadMap />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 