import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../component/layout'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme';
import { grey } from '@mui/material/colors';
import { ContextProvider } from '../context/context';
import { SessionProvider } from 'next-auth/react';
import HalfTypeLayout from '../component/layout/otherLayout/halfType/halfTypeLayout';
import NoLayout from '../component/layout/noLayout';
import DetailTypeLayout from '../component/layout/otherLayout/detailType';

const layouts: {[key: string] : any}= {
	'defaultType': Layout,
	'detailType': DetailTypeLayout,
	'halfType': HalfTypeLayout,
	'noLayout': NoLayout
}
type AppLayoutProps = AppProps & {
	Component: {layout: string}
	pageProps: any
}
export default function App({ Component, pageProps }: AppLayoutProps) {
	// console.log('App', Component);
	// const { isLayout } = Component as NextPage & {isLayout: boolean};
//	console.log(Component.layout);
	const CurrentLayout = layouts[Component.layout ?? 'defaultType'] || ((children: React.ReactElement) => <>{children}</>);
	//console.log(CurrentLayout);
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
					<CurrentLayout>
						<Component {...pageProps} />
					</CurrentLayout>
			</ContextProvider>
		</SessionProvider>
	</ThemeProvider>)
}
