import * as React from 'react';
import { cloneElement, ReactNode } from 'react';
import Header from './header';
import Nav from './nav'
import Footer from './footer'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import HeaderAlert from './Alert/headerAlert';
import { useCtx } from '../../context/context';
import { DefaultProps } from '../../interface/propsType';

function ElevationScroll(props: DefaultProps) {
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
	const ctx = useCtx();
	const {headerAlertProps} = ctx!;
	return ( <Container maxWidth={false} disableGutters={true}>
		<ElevationScroll {...props}>
			<>
			{headerAlertProps.visible && <HeaderAlert />}
			<AppBar position="sticky" sx={{ bgcolor: "white", color: 'text.primary' }}>
				<Header />
				<Nav />
			</AppBar>
			</>
		</ElevationScroll>
		{props.children}
		<Footer />
	</Container> )
}