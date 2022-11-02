import * as React from 'react';
import { cloneElement, ReactNode } from 'react';
import Header from './header';
import Nav from './nav'
import Footer from './footer'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
interface Props {
	window?: () => Window;
	children: React.ReactElement;
}
function ElevationScroll(props: Props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}
export default function Layout (props: Props) {
	return ( <Container maxWidth={false} disableGutters={true}>
		<ElevationScroll {...props}>
			<AppBar position="sticky" sx={{ bgcolor: "white", color: 'text.primary' }}>
				<Header />
				<Nav />
			</AppBar>
			</ElevationScroll>
			{props.children}
			<Footer />
	</Container> )
}