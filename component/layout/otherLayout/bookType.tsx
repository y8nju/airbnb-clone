import * as React from 'react';
import { cloneElement, ReactNode } from 'react';
import Header from '../header';
import Footer from '../footer'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useCtx } from '../../../context/context';
import { ChidrenProps } from '../../../interface/propsType';
import { grey } from '@mui/material/colors';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';

export default function BookTypeLayout (props: ChidrenProps) {
	const { children } = props;
	const ctx = useCtx();
	return ( <Container maxWidth={false} disableGutters={true} sx={{minHeight: '100vh'}}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "white", color: 'text.primary', borderBottom: 1, borderBottomColor: 'grey.300' }}>
            <Toolbar>
				<Link  href="/">
					<img src="/images/logo.svg" alt="logo" width="102" height="32"
						style={{verticalAlign: 'bottom'}} />
				</Link>
			</Toolbar>
        </AppBar>
		<Container maxWidth="lg" sx={{pt: 4}} >
			{children}
		</Container>
		<Footer sx={{bgcolor: grey[100]}} mw="lg" />
	</Container> )
}