import * as React from 'react';
import { cloneElement, ReactNode } from 'react';
import Header from './header';
import Nav from './nav'
import Footer from './footer'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import HeaderAlert from '../ui/Alert/headerAlert';
import { useCtx } from '../../context/context';
import { DefaultProps } from '../../interface/propsType';
import { useRouter } from 'next/router';

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
export default function Layout (props: DefaultProps) {
	const { children, window } = props;
	const ctx = useCtx();
	const {headerAlertProps} = ctx!;
	const router = useRouter();
	const {pathname} = router;
	return ( <Container maxWidth={false} disableGutters={true}>
		<ElevationScroll {...props}>
			<>
			{headerAlertProps.visible && <HeaderAlert />}
			<AppBar position="sticky" sx={{ bgcolor: "white", color: 'text.primary' }}>
				<Header mw="xl"/>
				{pathname == '/' && <Nav mw="xl" />}
			</AppBar>
			</>
		</ElevationScroll>
		<Container maxWidth={false} sx={{pt: 2}}>
			{children}
		</Container>
		<Footer sx={{position: 'fixed', bottom: 0}} mw="xl" />
	</Container> )
}