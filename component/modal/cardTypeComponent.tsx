import * as React from 'react';
import { Box, Card, CardHeader, IconButton, IconButtonProps} from '@mui/material/'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useCtx } from '../../context/context';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


interface Props {
	title: string | boolean, 
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

export default function CardTypeComponent(props: Props) {
	const ctx = useCtx();
	const { mode, setMode } =ctx!
	return (<Box style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
		<Card style={{width: 500}}>
			<CardHeader
				action={
					mode == 'SignUp' ? (<IconButton onClick={() => setMode('Checked')}>
						<KeyboardArrowLeftIcon />
					</IconButton>) : (
					<IconButton onClick={() => props.onClose(false)}>
						<CloseOutlinedIcon />
					</IconButton>)
				}
				title={props.title}
				titleTypographyProps={{
				fontSize: '1rem',
				fontWeight: 600,
				textAlign: 'center'
				}}
				sx={{ borderBottom: 1, borderBottomColor: 'grey.200' }}
			/>
			{props.children}
		</Card>
	</Box>)
}