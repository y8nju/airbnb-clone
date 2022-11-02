import { Container } from '@mui/system';
import { cloneElement, ReactNode } from 'react';
import Header from './header';
import Nav from './nav'
import Footer from './footer'
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
  }
function ElevationScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
export default function Layout ({children}: {children: ReactNode}, props: Props) {

    return ( <Container maxWidth={false} disableGutters={true}>
        
      <ElevationScroll {...props}>
        <AppBar position="sticky" sx={{ bgcolor: "white", color: 'text.primary' }}>
            <Header />
            <Nav />
        </AppBar>
        </ElevationScroll>
        {children}
        <Footer />
    </Container> )
}