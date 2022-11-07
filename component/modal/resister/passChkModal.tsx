import { Box, Button, Card, CardContent, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import { red } from '@mui/material/colors';
import { useCtx } from '../../../context/context';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CheckCircle, Cancel, Error } from '@mui/icons-material/';
import { signIn, SignInResponse, useSession } from "next-auth/react";

interface OnClose {
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
    closeMenu: () => void;
}
export default function PassChk(props: OnClose) {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [inpError, setInpError] = useState<boolean>(false);
	const [diffrent, setDiffrent] = useState<boolean>(false);
	const {onClose, closeMenu} = props;
	const {status} = useSession();
	const ctx = useCtx();
	const {userEmail, setMode, setLoading, loading} = ctx!
	
	useEffect(()=> {
		if(inpError) {
			setInpError(false);
		}
		if(diffrent) {
			setDiffrent(false);
		}
	}, [password])

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const submitHandle = async (code: string) => {
		if(password!.length < 8) {
			setInpError(true);
		}else {
			if(code === 'Enter' || code === undefined) {
				setLoading(true);
				const result = (await signIn('credentials', {
					redirect: false,
					email: userEmail,
					password: password
				})) as SignInResponse;
				console.log('result', result)
				if(result.ok == true) {
					console.log('로그인')
					onClose(false);
					closeMenu();
				}else {
					console.log('확인요망')
					setDiffrent(true);
				}
				setLoading(false);
			}
		}
	}

	return (<CardContent sx={{p: 3}}>
		{diffrent && 
			<Card variant="outlined" sx={{display: 'flex', mb: 4}}>
				<Box sx={{p: 1.5}}>
					<Error sx={{mr: 1, mt: 0.5, fontSize: 50}} color={'error'} />
				</Box>
				<Box sx={{p: 1.5, pl: 0}}>
					<Typography variant="body1" sx={{fontWeight: 500, mb: 0.5}}>다시 시도해주세요.</Typography>
					<Typography variant="body2" sx={{fontWeight: 300}}>올바르지 않은 비밀번호입니다. 다시 시도하거나 다른 로그인 방법을 선택하세요.</Typography>
				</Box>
			</Card>
		}
		<FormControl sx={{ width: 1}} variant="outlined">
			<InputLabel htmlFor="password" color="info" >비밀번호</InputLabel>
				<OutlinedInput
					id="password"
					type={showPassword ? 'text' : 'password'}
					value={password}
					error={inpError}
					onChange={(e)=>setPassword(e.target.value)}
					label="비밀번호"
					color="info"
					endAdornment={
					<InputAdornment position="end">
						<IconButton
						aria-label="toggle password visibility"
						onClick={handleClickShowPassword}
						onMouseDown={handleMouseDownPassword}
						edge="end"
						>
						{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
						</IconButton>
					</InputAdornment>
					}
				/>
				{inpError &&
					<FormHelperText 
						sx={{display: 'flex', alignItems: 'center', color:"#d32f2f"}}>
						<Error sx={{mr: 1, mt: 0.5}} fontSize="small" />
						<span>비밀번호는 최소 8자 이상이어야 합니다. 다시 시도해 주세요.</span>
					</FormHelperText>
				}
				<LoadingButton variant="contained" disableElevation
					type="submit"
					loading={loading}
					sx={{ width: 1, my: 2, bgcolor: red[600], p:1.4}}
					onClick={() => submitHandle('Enter')}
				>로그인</LoadingButton>
			</FormControl>
			<Box sx={{pb: 6}}>
				<Link href="#" color="inherit" sx={{fontSize: '12px'}}
					onClick={()=>setMode('PassFind')}>비밀번호를 잊으셨나요?</Link>
			</Box>
		</CardContent>)
}