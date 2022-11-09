import { Box, Button, CardContent, Divider, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { red } from '@mui/material/colors';
import { AlreadyCheck, useCtx } from '../../../context/context';
import { findEmail } from '../../../lib/api/accountApi';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import popupCenter from '../../layout/popup/popupCenter';


export default function Login() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [emailType, setEmailType] = useState<boolean>(false);
	const ctx = useCtx();
	const {userEmail, setUserEmail, setMode, emailRegex, loading, setLoading, alreadyChk, setAlredayChk} = ctx!
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
			setLoading(true);
			if(resp.result) {
				setMode('Login')
			}else {
				setMode('SignUp');
			}
			setLoading(false);
		}
	}
	const googleSigninHandle = () => {
		popupCenter('/OAuth/google', 'Google Login', )
		
		window.parentCallback = (data: AlreadyCheck) => {
			setAlredayChk(data);
			console.log(data)
		} 
	}

	return (<CardContent sx={{p: 3, height: 'auto'}}>
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
			<LoadingButton variant="contained" disableElevation
				loading={loading}
				sx={{ width: 1, my: 2, bgcolor: red[600], p: 1.4}}
				onClick={submitHandle}
			>
				계속
			</LoadingButton>
		</FormControl>
		<Divider>또는</Divider>
		<Box sx={{mt: 2}}>
			<Button variant="outlined" color="info"
				sx={{ width: 1, p: 1.4}}
				onClick={googleSigninHandle}
				startIcon={<FcGoogle style={{marginLeft: '10px'}}
			/>}>
				<Typography variant='button' flexGrow={1}>구글로 로그인하기</Typography>
			</Button>
		</Box>
	</CardContent>)
	
}