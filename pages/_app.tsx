import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../component/layout'
import { createTheme, ThemeProvider } from '@mui/material'
import { orange } from '@mui/material/colors';

export default function App({ Component, pageProps }: AppProps) {
	const outerTheme = createTheme({
		palette: {
			primary: {
				main: '#ff5a5f',
			},
		},
	});
	return (<ThemeProvider theme={outerTheme}>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</ThemeProvider>)
}
