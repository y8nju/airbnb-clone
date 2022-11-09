import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../component/layout'
import { createTheme, ThemeProvider } from '@mui/material'
import { grey, orange } from '@mui/material/colors';
import { ContextProvider } from '../context/context';
import { SessionProvider } from 'next-auth/react';
import { NextPage } from 'next';
import HalfTypeLayout from '../component/layout/otherLayout/halfType/halfTypeLayout';
import NoLayout from '../component/layout/noLayout';
import { ChidrenProps, DefaultProps } from '../interface/propsType';

const layouts = {
	default: Layout,
	halfType: HalfTypeLayout,
	noLayout: NoLayout
}

export type PageWithLayoutType =
NextPage & ((props:DefaultProps) => JSX.Element)
 | NextPage & ((props:ChidrenProps) => JSX.Element)
 | NextPage & ((props:ChidrenProps) => JSX.Element)

type AppLayoutProps = AppProps & {
	Component: PageWithLayoutType
	pageProps: any
  }

export default function App({ Component, pageProps }: AppLayoutProps) {
	// console.log('App', Component);
	// const { isLayout } = Component as NextPage & {isLayout: boolean};
	const Layout = layouts[Component.layout] || ((children: React.ReactElement) => <>{children}</>);
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
