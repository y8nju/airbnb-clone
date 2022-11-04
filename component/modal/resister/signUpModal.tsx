import { Box, Button, CardContent, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { red } from '@mui/material/colors';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CheckCircle, Cancel, Error } from '@mui/icons-material/';
import { useCtx } from '../../../context/context';

export const CheckCircleIcon = () => {
	return <CheckCircle style={{fontSize: '14px', marginRight: '2px', verticalAlign: 'sub'}} />
}
export const CancelIcon = () => {
	return <Cancel style={{fontSize: '14px', marginRight: '2px', verticalAlign: 'sub'}}/>
}

export default function Signup() {
	const [errorMsg, setErrorMsg] = useState<string|null>(null);
	const [emailType, setEmailType] = useState(false);
	const [firstName, setFirstName] = useState<string|undefined>(undefined);
	const [lastName, setLastName] = useState<string|undefined>(undefined);
	const [birth, setBirth] = useState<string|undefined>(undefined);
	const [age, setAge] = useState<number|null>(null);
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passType, setPassType] = useState({
		level: '약함',
		account: 0,
		length: 0,
		regex: false,
		error: false
	})
	const [termsChk, setTermsChk] = useState<boolean>(false);
	const [marketingChk, setMarketingChk] = useState<boolean>(false);
	const [essentialData, setEssentialData] = useState<boolean>(true);

	const ctx = useCtx();
	const {userEmail, setUserEmail, setMode, emailRegex} = ctx!
	
    const passRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/
	const passLevelRegx = /([0-9])|([A-Za-z\d]){8, }/;
	const passSubRegx = /[0-9]|[!@#$%^*+=-]/;

	useEffect(()=> {
		if((!emailRegex.test(userEmail!) || password.length < 8 || !(age! > 18) || !termsChk ||  !firstName || !lastName  )) {
			setEssentialData(true);
		} else {
			setEssentialData(false);
		}
	}, [firstName, lastName, age, password, termsChk, userEmail ])

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	  };
	
	  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	  };
	const emailChk = (text: string) => {
		setUserEmail(text);
		if(text.length > 0) {
			if(!emailRegex.test(text)) {
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
	const passChk = (text: string) => {
		setPassword(text);
		setPassType((passType) => ({ ...passType, length: text.length }))
		if(text.length > 0 && text.length < 8 ) {
			setPassType((passType) => ({ ...passType, error: true }))
		} else {
			setPassType((passType) => ({ ...passType, error: false }))
		}
		if(text.length < 8) {
			setPassType((passType) => ({ ...passType, level: '약함' }))
		} else if( passRegex.test(text)) {
			setPassType((passType) => ({ ...passType, level: '강함' }))
		} else if(passLevelRegx.test(text)) {
			setPassType((passType) => ({ ...passType, level: '보통' }))
		}
	}
	const birthChk = (text: any) => {
		// const diff = today.getTime() - userBirth.getTime();
		// const daysPast = Math.floor(diff / (1000 * 60 * 60 * 24));
		// const age = Math.floor(daysPast / 365.25);
		// 만나이
		const userBirth = new Date(text + 'T00:00:00.000Z');

		const now = new Date();
		const dd = String(now.getDate()).padStart(2, '0');
		const mm = String(now.getMonth() + 1).padStart(2, '0');
		const yyyy = now.getFullYear();
		const nowYMD = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000Z';
		const today = new Date(nowYMD);
		var age = today.getFullYear() - userBirth.getFullYear();
		userBirth.setFullYear(today.getFullYear());

		if (today < userBirth) {
			age--;
		}
		setAge(age);
		setBirth(text);
		console.log(userBirth, today);
		console.log(age);
	}
	const submitHandle = () => {
		setMode('Login');
	}

	return (<CardContent sx={{p: 3}}>
		<FormControl fullWidth={true}>
		<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="firstName"
						value={firstName}
						label="이름(예: 길동)"
						color="info"
						onChange={(e)=>setFirstName(e.target.value)}
					/>
					</Grid>
					<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="lastName"
						value={lastName}
						label="성(예:홍)"
						color="info"
						onChange={(e)=>setLastName(e.target.value)}
					/>
					</Grid>
					<Grid item xs={12} style={{paddingTop: 0}}>
						<FormHelperText sx={{mx: '14px'}}>정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.</FormHelperText>
					</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ width: 1}} variant="outlined">
					<InputLabel htmlFor="password" color="info" >생년월일</InputLabel>
					<OutlinedInput
						id="birth"
						type="date" 
						value={birth}
						onChange={(e)=>birthChk(e.target.value)}
						error={(age !== null && age < 18) ? true : false}
						label="생년월일"
						color="info"
						endAdornment={ (age == null && 
							<InputAdornment position='start' style={{position: 'absolute', width: '40%', height: '100%', pointerEvents: 'none' }} >
								<div className='datePlaceHolder'></div>
							</InputAdornment>	)}
					/>
						<FormHelperText 
							sx={[{display: 'flex'}, (age !== null && age < 18) && {color:"#d32f2f"}]}>
							{(age !== null && age < 18) && <Error sx={{mr: 1, mt: 0.5}} fontSize="small" /> }
							<span>만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른 회원에게 공개되지 않습니다.</span>
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField fullWidth label="이메일" id="email" type="email" sx={{mt: 2}} color="info" 
					error={emailType}
					helperText={errorMsg}
					value={userEmail}
					onChange={(e)=>emailChk(e.target.value)} />
					<FormHelperText>예약 확인과 영수증을 이메일로 보내드립니다.</FormHelperText>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ width: 1}} variant="outlined">
					<InputLabel htmlFor="password" color="info" >비밀번호</InputLabel>
						<OutlinedInput
							id="password"
							type={showPassword ? 'text' : 'password'}
							value={password}
							error={passType.error}
							onChange={(e)=>passChk(e.target.value)}
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
						{passType.length > 0 && <>
							<FormHelperText 
								error={passType.level == '약함' ? true : false}
								sx={passType.level !== '약함' ? {color: "#2e7d32"} : (passType.length == 0 ? {color:'#d32f2f'} :undefined)}
								> {passType.level !== '약함' ? <CheckCircleIcon /> : <CancelIcon /> } 
								비밀번호 보안 수준: {passType.level}</FormHelperText>
							<FormHelperText 
								> 비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다.</FormHelperText>
							<FormHelperText 
								error={passType.length < 8 ? true : false}
								sx={passType.length >= 8 ? {color: "#2e7d32"} : (passType.length == 0 ? {color:'#d32f2f'} :undefined)}
								>{passType.length >= 8 ? <CheckCircleIcon /> : <CancelIcon /> } 
								최소 8자</FormHelperText>
							<FormHelperText 
								error={!passSubRegx.test(password) ? true : false}
								sx={passSubRegx.test(password) ? {color: "#2e7d32"} : (passType.length == 0 ? {color:'#d32f2f'} :undefined)}
								> {passSubRegx.test(password) ? <CheckCircleIcon /> : <CancelIcon /> } 
								숫자나 기호를 포함하세요</FormHelperText>
						</>}
					</FormControl>
				</Grid>
			</Grid>
			<Button variant="contained" disableElevation
				disabled={essentialData}
				onClick={submitHandle}
				sx={{ width: 1, my: 2, bgcolor: red[600], p:1.4}}>
				계속
			</Button>
		</FormControl>
		<Divider />
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box>
					<FormControlLabel
						label={<Typography sx={{ fontSize: 10, fontWeight: 400 }}>
							개인정보 수집 및 이용에 동의합니다.
						</Typography>}
						control={<Checkbox value="약관동의" color="primary" size="small" 
							checked={termsChk}
							onChange={(e) => setTermsChk(e.target.checked)}/>}
						style={{fontSize: '10px'}}
					/>
				</Box>
				<Box>
					<FormControlLabel
						control={<Checkbox value="마케팅 수신 동의" color="primary" size="small" 
							checked={marketingChk}
							onChange={(e) => setMarketingChk(e.target.checked)}/>}
						label={<Typography sx={{ fontSize: 10, fontWeight: 400 }}>
							마케팅 이메일 수신을 원합니다(선택).
						</Typography>}
					/>
				</Box>
			</Grid>
		</Grid>
		<style jsx>{`
			.datePlaceHolder {
				width: 100%;
				height: 100%;
				background-color: white
			}
		`}</style>
	</CardContent>)

}