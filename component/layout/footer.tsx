import { AppBar, Box, Breakpoint, Container, Divider, Theme, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { grey } from '@mui/material/colors';

interface Props {
	sx?: any,
	mw?: Breakpoint,
}
export default function Footer (props: Props) {
	const router = useRouter();
	const { pathname } = router;
	
	return ( <Box component="footer"
		sx={[{width: '100vw', bgcolor: "white", color: 'text.primary', borderTop: 1, borderTopColor: 'grey.300' },
			pathname == '/trips' && {bgcolor: grey[100]}, props.sx]}>
		<Container maxWidth={props.mw}>
			<Toolbar sx={{ borderBottom: 1, borderBottomColor: 'grey.300' }}>
				<Typography variant="body1">
					© 2022 Airbnb, Inc.
				</Typography>
			</Toolbar>
			<Box sx={{py: 1}}>
				<Typography style={{fontSize: '10px'}}>
					웹사이트 제공자: Y8NJU | 해당 웹사이트는 에어비앤비 플랫폼을 클론한 프로젝트로 실제 예약 서비스를 제공하지 않습니다
				</Typography>
			</Box>
		</Container>
	</Box> )
}