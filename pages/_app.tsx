import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../component/layout'
import { createTheme, ThemeProvider } from '@mui/material'
import { grey, orange } from '@mui/material/colors';
import { ContextProvider } from '../context/context';

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
				main: grey[700]
			}
		},
	});
	return (<ThemeProvider theme={customTheme}>
		<ContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ContextProvider>
	</ThemeProvider>)
}
