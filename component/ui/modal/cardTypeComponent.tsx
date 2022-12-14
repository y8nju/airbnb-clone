import React, {useEffect, useState} from 'react';
import { Box, Card, CardHeader, IconButton, IconButtonProps} from '@mui/material/'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useCtx } from '../../../context/context';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


interface Props {
	title?: string | boolean, 
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

const CardTypeComponent = React.forwardRef((props: Props, forwardRef: React.Ref<HTMLDivElement>) => {
	const {title, onClose, children} = props;
	const ctx = useCtx();
	const { mode, setMode } =ctx!
	const accountClose =()=> {
		onClose(false);
		setMode(null);
	}
	return (<Box style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxHeight: '80%' }} ref={forwardRef} tabIndex={0}>
		<Card style={{width: 500, height: '100%', display: 'flex', flexDirection: 'column'}}>
			<CardHeader
				style={title && { borderBottom: '1px solid #eee' }}
				action={
					mode == 'SignUp' && (<IconButton onClick={() => setMode('Checked')}>
						<KeyboardArrowLeftIcon />
					</IconButton>) || 
					mode == 'Checked' && (<IconButton onClick={accountClose}>
						<CloseOutlinedIcon />
					</IconButton>) ||
					mode == 'AlreadyChk' && (<IconButton onClick={accountClose}>
						<CloseOutlinedIcon />
					</IconButton>)
				}
				title={title}
				titleTypographyProps={{
					fontSize: '1rem',
					fontWeight: 600,
					textAlign: 'center'
				}}
			/>
			{children}
		</Card>
	</Box>)
})
export default CardTypeComponent;