import { Box, Button, CardContent, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { grey, red } from '@mui/material/colors';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CheckCircle, Cancel, Error } from '@mui/icons-material/';
import { useCtx } from '../../../context/context';
import { signup } from '../../../lib/api/accountApi';
import AccountType from '../../../interface/accountType';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const CheckCircleIcon = () => {
	return <CheckCircle style={{fontSize: '14px', marginRight: '2px', verticalAlign: 'sub'}} />
}
export const CancelIcon = () => {
	return <Cancel style={{fontSize: '14px', marginRight: '2px', verticalAlign: 'sub'}}/>
}
export const ErrorIcon = () => {
	return <Error style={{fontSize: '14px', marginRight: '2px', verticalAlign: 'sub'}}/>
}
const helperText = {
	email: '예약 확인과 영수증을 이메일로 보내드립니다.',
	name: '정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.',
}
enum SignType {
	SignUp = 'email',
	GoogleSignUp = 'google'
}
export default function Signup() {
	const ctx = useCtx();
	const {userEmail, setUserEmail, emailRegex, setLoading, mode, setMode, setLoginDate} = ctx!
	const {data: session} = useSession();
	const router = useRouter();
    const {provider, providerAccountId} = router.query!;
	const [email, setEmail]= useState<string>(userEmail as string);
	const [emailType, setEmailType] = useState(false);
	const [emailHelperText, setEmailHelperText] = useState<string>(helperText.email);
	const [firstName, setFirstName] = useState<string|undefined>(undefined);
	const [lastName, setLastName] = useState<string|undefined>(undefined);
	const [nameHelperText, setNameHelperText] = useState<string>(helperText.name);
	const [nameError, setNameError] = useState<boolean>(false);
	const [birth, setBirth] = useState<string|undefined>(undefined);
	const [age, setAge] = useState<number|null>(null);
	const [birthError, setBirthError] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passError, setPassError] = useState<boolean>(false);
	const [passType, setPassType] = useState({
		level: '약함',
		account: 0,
		length: 0,
		regex: false,
		error: false
	})
	const [termsChk, setTermsChk] = useState<boolean>(false);
	const [noTerms, setNoTerms] = useState<boolean>(false);
	const [marketingChk, setMarketingChk] = useState<boolean>(false);
	const [essentialData, setEssentialData] = useState<boolean>(true);
	
    const passRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#*])[\da-zA-Z!@#*]{8,}$/
	const passLevelRegx = /([0-9])|([A-Za-z\d]){8, }/;
	const passSubRegx = /[0-9]|[!@#$%^*+=-]/;
	useEffect(()=> {
		if(mode == 'GoogleSignUp'){
			setEmail(userEmail!);
			setTermsChk(true);
			setPassword('googlePassFree');
		}
	}, [firstName])
	useEffect(()=> {
		if((!emailRegex.test(email!) || password.length < 8 || !(age! > 18) || !termsChk ||  !firstName || !lastName  )) {
			setEssentialData(true);
		} else {
			setEssentialData(false);
		}
	}, [firstName, lastName, email, age, password, termsChk, userEmail ]);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	  };
	
	  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	  };
	const passChk = (text: string) => {
		setPassword(text);
		setPassError(false);
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
	const firstNameHandle =(text: string) => {
		setFirstName(text);
		if(nameError) {
			setNameError(false);
			setNameHelperText(helperText.name);
		}
	}
	const lastNameHandle = (text: string) => {
		setLastName(text);
		if(nameError) {
			setNameError(false);
			setNameHelperText(helperText.name);
		}
	}
	const emailHandle = (text: string) => {
		setEmail(text);
		if(emailType) {
			setEmailType(false);
			setEmailHelperText(helperText.email);
		}
	}
	const birthChk = (text: any) => {
		// const diff = today.getTime() - userBirth.getTime();
		// const daysPast = Math.floor(diff / (1000 * 60 * 60 * 24));
		// const age = Math.floor(daysPast / 365.25);
		if(birthError) {
			setBirthError(false);
		}
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
	const submitHandle = async () => {
		setLoading(true)
		const nameRegex = /[a-zA-Z가-힣]/
		if(!nameRegex.test(firstName!) || !nameRegex.test(lastName!)) {
			setNameHelperText('이름에 지원되지 않는 문자가 포함되어 있습니다. 다르게 입력해보세요.')
			setNameError(true);
		}else if(firstName == undefined || lastName == undefined) {
			setNameHelperText('이름을 입력하세요.')
			setNameError(true);
		}
		if(birth == undefined) {
			setBirthError(true);
		}
		if(email.length > 0) {
			if(!emailRegex.test(email)) {
				setEmailHelperText('이메일 형식을 입력하세요');
				setEmailType(true);
			}
		} else if(email.length == 0) {
			setEmailHelperText('이메일이 필요합니다');
			setEmailType(true);
		}
		if(password.length == 0) {
			setPassError(true);
		}
		if(!termsChk) {
			setNoTerms(true);
		}
		const userData = {
			email: email,
			lastName: lastName,
			firstName: firstName, 
			birth: birth,
			password: password,
			marketing: marketingChk ? new Date() : null, 
			visible: null, 
			signupType: SignType[mode as keyof typeof SignType],
			provider: provider ? provider : null, 
			providerAccountId: providerAccountId? providerAccountId : null
		} as AccountType
		const resp = await signup(userData);
		if(resp.result) {
			await signIn('credentials', {
				redirect: false,
				email: userEmail,
				password: password});
			setUserEmail(email);
			setMode('Commitment');
			setUserEmail(email);
			setLoginDate(new Date());
		}
		setLoading(false);
	}

	return (<CardContent sx={{p: 3, overflowY: 'scroll', height: '100%'}}>
		{mode == 'GoogleSignUp' && <Grid container spacing={2} sx={{mb: 4}}>
			<Grid item xs={12} sm={6}>
				<Typography variant='h6' sx={{fontWeight: 600, color: grey[800]}}>
					Complete your information
				</Typography>
				<Typography variant='body2' sx={{ color: grey[700]}} >
					Please review and provide any missing information to finish signin up.
				</Typography>
			</Grid>

		</Grid>}
		<FormControl fullWidth={true}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="firstName"
						value={firstName || ''}
						label="이름(예: 길동)"
						color="info"
						error={nameError}
						onChange={(e)=> firstNameHandle(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="lastName"
						value={lastName || ''}
						label="성(예:홍)"
						color="info"
						error={nameError}
						onChange={(e)=> lastNameHandle(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} style={{paddingTop: 0}}>
					<FormHelperText
						sx={nameError && {color:"#d32f2f"}}>
						{nameError && <ErrorIcon />}
						{nameHelperText}
					</FormHelperText>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ width: 1}} variant="outlined">
					<InputLabel htmlFor="password" color="info" >생년월일</InputLabel>
					<OutlinedInput
						id="birth"
						type="date" 
						value={birth || ''}
						onChange={(e)=> birthChk(e.target.value)}
						error={(age !== null && age < 18 || birthError) ? true : false}
						label="생년월일"
						color="info"
						endAdornment={ (age == null && 
							<InputAdornment position='start' style={{position: 'absolute', width: '40%', height: '100%', pointerEvents: 'none' }} >
								<div className='datePlaceHolder'></div>
							</InputAdornment> )}
					/>
						{!birthError? <FormHelperText 
							sx={[{display: 'flex'}, (age !== null && age < 18) && {color:"#d32f2f"}]}>
							{(age !== null && age < 18) && <Error sx={{mr: 1, mt: 0.5}} fontSize="small" /> }
							<span>만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른 회원에게 공개되지 않습니다.</span>
						</FormHelperText> : 
						<FormHelperText
							sx={{color:"#d32f2f"}}>
							<ErrorIcon /> 계속하시려면 생일을 선택하세요
						</FormHelperText>}
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField fullWidth label="이메일" id="email" type="email" sx={{mt: 2}} color="info" 
						error={emailType}
						value={email || mode == 'GoogleSignUp' && userEmail || ''}
						disabled={mode == 'GoogleSignUp' ? true : false}
						onChange={(e) => emailHandle(e.target.value)} />
					<FormHelperText
						sx={emailType && {color:"#d32f2f"}}>
						{emailType && <ErrorIcon />}
						{emailHelperText}
					</FormHelperText>
				</Grid>
				{mode == 'SignUp' &&<> <Grid item xs={12}>
					<FormControl sx={{ width: 1}} variant="outlined">
					<InputLabel htmlFor="password" color="info" >비밀번호</InputLabel>
						<OutlinedInput
							id="password"
							type={showPassword ? 'text' : 'password'}
							value={password || ''}
							error={passType.error || passError}
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
							{/* <FormHelperText 
								> 비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다.</FormHelperText> */}
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
						{passError && <FormHelperText
							sx={{color:"#d32f2f"}}>
							<ErrorIcon /> 비밀번호를 입력하세요
						</FormHelperText> }
					</FormControl>
				</Grid></>}
			</Grid>
		</FormControl>
		{mode == 'SignUp' && <> <Divider sx={{my: 2}} />
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box>
					<FormControlLabel
						label={<Typography sx={{ fontSize: 12, fontWeight: 400 }}>
							개인정보 수집 및 이용에 동의합니다.
						</Typography>}
						control={<Checkbox value="약관동의" color="primary" size="small" 
							checked={termsChk}
							onChange={(e) => setTermsChk(e.target.checked)}/>}
						style={{fontSize: '10px'}}
					/>
					{noTerms && <FormHelperText
						sx={{color:"#d32f2f"}}>
						<ErrorIcon /> 계속하려면 동의해주세요.
					</FormHelperText> }
				</Box>
				<Box>
					<FormControlLabel
						control={<Checkbox value="마케팅 수신 동의" color="primary" size="small" 
							checked={marketingChk}
							onChange={(e) => setMarketingChk(e.target.checked)}/>}
						label={<Typography sx={{ fontSize: 12, fontWeight: 400 }}>
							마케팅 이메일 수신을 원합니다(선택).
						</Typography>}
					/>
				</Box>
			</Grid>
		</Grid>
		<Divider sx={{my: 2}} />
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant='body2'>
					동의 및 계속하기를 선택하여 에어비앤비 서비스 약관, 결제 서비스 약관, 위치기반서비스 이용약관, 차별 금지 정책, 개인정보 처리방침에 동의합니다.
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" disableElevation
					disabled={essentialData}
					onClick={submitHandle}
					sx={{ width: 1, mt: 1, bgcolor: red[600], p:1.4}}>
					동의 및 계속하기
				</Button>
			</Grid>
		</Grid> </>}
		{mode == 'GoogleSignUp' && <Grid container spacing={2}>
			<Grid item xs={12} sx={{mt: 3}}>
				<Typography align="center">
					This info came from Google
				</Typography>
				<Typography variant="body2" sx={{color: grey[700], mt: 1}}>
					에어비앤비의 마케팅 프로모션, 특별 할인 및 추천 여행정보, 정책 변경사항을 이메일로 보내드립니다.
				</Typography>
				<Box>
					<FormControlLabel sx={{alignItems: 'flex-start'}}
						control={<Checkbox value="마케팅 수신 동의" color="primary" size="small" 
							checked={marketingChk}
							onChange={(e) => setMarketingChk(e.target.checked)}/>}
						label={<Typography variant="body2" sx={{ color: grey[700], pt: 1 }}>
							에어비앤비에서 보내는 마케팅 이메일 수신을 원합니다(선택) <br/>
							계정 관리 설정 또는 메시지의 링크에서 언제든지 수신을 거부할 수 있습니다.
						</Typography>}
					/>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" disableElevation
					disabled={essentialData}
					onClick={submitHandle}
					sx={{ width: 1, mt: 1, p:1.4}}>
					동의 및 계속하기
				</Button>
			</Grid>
		</Grid>}
		
		<style jsx>{`
			.datePlaceHolder {
				width: 100%;
				height: 100%;
				background-color: white
			}
		`}</style>
	</CardContent>)
}