import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import RoadMap from './components/RoadMap';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4caf50',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      marginBottom: '2rem',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={{ 
          textAlign: 'center', 
          py: 4,
        }}>
          <Typography variant="h1" component="h1">
            Системный лидген - Домашние задания
          </Typography>
          <RoadMap />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 