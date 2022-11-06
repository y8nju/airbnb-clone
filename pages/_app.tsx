import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../component/layout'
import { createTheme, ThemeProvider } from '@mui/material'
import { grey, orange } from '@mui/material/colors';
import { ContextProvider } from '../context/context';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
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
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ContextProvider>
		</SessionProvider>
	</ThemeProvider>)
}
