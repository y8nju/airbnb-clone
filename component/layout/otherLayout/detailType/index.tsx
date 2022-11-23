import * as React from 'react';
import { cloneElement, ReactNode } from 'react';
import Header from '../../header';
import Footer from '../../footer'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useCtx } from '../../../../context/context';
import { ChidrenProps } from '../../../../interface/propsType';
import { grey } from '@mui/material/colors';

export default function DetailTypeLayout (props: ChidrenProps) {
	const { children } = props;
	const ctx = useCtx();
	const {headerAlertProps} = ctx!;
	return ( <Container maxWidth={false} disableGutters={true}>
        <AppBar position="static" sx={{ bgcolor: "white", color: 'text.primary' }}>
            <Header />
        </AppBar>
		<Container maxWidth={false} sx={{pt: 2}}>
			{children}
		</Container>
		<Footer sx={{bgcolor: grey[100]}} />
	</Container> )
}