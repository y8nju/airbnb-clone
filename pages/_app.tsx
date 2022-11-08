import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../component/layout'
import { createTheme, ThemeProvider } from '@mui/material'
import { grey, orange } from '@mui/material/colors';
import { ContextProvider } from '../context/context';
import { SessionProvider } from 'next-auth/react';
import { NextPage } from 'next';

export default function App({ Component, pageProps }: AppProps) {
	// console.log('App', Component);
	const { isLayout } = Component as NextPage & {isLayout: boolean};
	const customTheme = createTheme({
		typography: {
			fontFamily: 'Noto Sans KR,  sans-serif'
		},
		palette: {
			primary: {
				main: '#ff5a5f',
			},
			info: {
				main: grey[800],
			}
		},
	});
	return (<ThemeProvider theme={customTheme}>
		<SessionProvider>
			<ContextProvider>
				{isLayout?
					<Layout>
						<Component {...pageProps} />
					</Layout> :
					<Component {...pageProps} />
				}
			</ContextProvider>
		</SessionProvider>
	</ThemeProvider>)
}
