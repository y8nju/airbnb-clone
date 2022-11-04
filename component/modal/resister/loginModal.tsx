import { Box, Button, CardContent, Divider, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { red } from '@mui/material/colors';
import { useCtx } from '../../../context/context';
import { findEmail } from '../../../lib/api/accountApi';
export default function Login() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [emailType, setEmailType] = useState(false);
	const ctx = useCtx();
	const {userEmail, setUserEmail, setMode, emailRegex} = ctx!
	const emailChange = (text: string) => {
		setUserEmail(text);
		if(text.length > 0) {
			if(!(emailRegex.test(text))) {
				setErrorMsg('이메일 형식이 아닙니다');
				setEmailType(true);
			}else {
				setErrorMsg(null);
				setEmailType(false);
			}
		} else {
			setErrorMsg(null);
			setEmailType(false);
		}
	}
	const submitHandle = async () => {
		if(!(emailRegex.test(userEmail as string)) || !userEmail) {
			setErrorMsg('이메일 형식이 아닙니다');
			setEmailType(true);
		}else {
			console.log(userEmail)
			let resp = await findEmail(userEmail!);
			if(resp.result) {
				setMode('Login')
			}else {
				setMode('SignUp');
			}
		}
	}

	return (<CardContent sx={{p: 3}}>
		<Typography variant="h6" color="text.primary"
			style={{fontWeight: 600}}>
			에어비앤비에 오신 것을 환영합니다.
		</Typography>
		<FormControl fullWidth={true}>
			<TextField fullWidth label="이메일" id="email" sx={{mt: 2}} color="info" 
				error={emailType}
				helperText={errorMsg}
				value={userEmail}
				onChange={(e)=>emailChange(e.target.value)} />
			<Button variant="contained" disableElevation
				sx={{ width: 1, my: 2, bgcolor: red[600], p:1.4}}
				onClick={submitHandle}
			>
				계속
			</Button>
		</FormControl>
		<Divider>또는</Divider>
	</CardContent>)
	
}