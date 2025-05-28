import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import RoadMap from './components/RoadMap';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ 
          py: 4,
        }}>
          <Typography variant="h1" component="h1" sx={{ textAlign: 'left' }}>
            Домашние задания
          </Typography>
          <RoadMap />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 