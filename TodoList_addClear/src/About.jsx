import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function About() {
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
    return(
    <>
    <h1>With my app you can...</h1>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <main>This app is using the light mode</main>
    </ThemeProvider>
    </>
    );
  }