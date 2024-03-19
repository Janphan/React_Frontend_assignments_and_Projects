import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function Home() {
    const lightTheme = createTheme({
        palette: {
          mode: 'light',
        },
      });
    return(
        <>
    <h1>This is home page</h1>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
    </ThemeProvider>
    
    </>
    );
    
  }