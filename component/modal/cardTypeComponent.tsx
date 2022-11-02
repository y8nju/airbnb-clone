import * as React from 'react';
import { Box, Button, Card, CardHeader, CardContent, Divider, IconButton, IconButtonProps, Typography} from '@mui/material/'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { red } from '@mui/material/colors';

interface Props {
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactElement;
}

export default function CardTypeComponent(props: Props) {
	return (<Box style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
		<Card>
			<CardHeader
				action={
				<IconButton onClick={() => props.onClose(false)}>
					<CloseOutlinedIcon />
				</IconButton>
				}
				title="로그인 또는 회원 가입"
				titleTypographyProps={{
				fontSize: '1rem',
				fontWeight: 600,
				textAlign: 'center'
				}}
				sx={{ borderBottom: 1, borderBottomColor: 'grey.200' }}
			/>
			<CardContent>
				<Typography variant="h6" color="text.primary"
					style={{fontWeight: 600}}>
					에어비앤비에 오신 것을 환영합니다.
				</Typography>
				<Typography color="text.secondary" 
					style={{fontSize: '10px'}}>
					전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및 데이터 요금이 부과됩니다.
				</Typography>
				<Button variant="contained" disableElevation
					sx={{ width: 1, my: 2, bgcolor: red[600] }}>
					계속
				</Button>
				<Box style={{textAlign: 'center', position: 'relative'}}>
					<Divider style={{ width: '100%', position: 'absolute', top: '50%', zIndex: 0}} />
					<span style={{ fontSize: '10px', backgroundColor: 'white', padding: '0 16px', position: 'relative', zIndex: 5}} >또는</span>
				</Box>
			</CardContent>
		</Card>
	</Box>)
}