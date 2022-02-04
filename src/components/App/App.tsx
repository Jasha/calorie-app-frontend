import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import CalorieRoutes from 'routes/Routes';

const theme = createTheme();

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <CalorieRoutes />
  </ThemeProvider>
);

export default App;
