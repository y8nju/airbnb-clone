import { Box, Button, CardContent, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { red } from '@mui/material/colors';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Signup() {
	const [errorMsg, setErrorMsg] = useState<string>(' ');
	const [emailType, setEmailType] = useState(false)
	const [password, setPassword] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	  };
	
	  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	  };
	const emailChane = (text: string) => {
		if(text.length > 0) {
			if(!(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(text))) {
				setErrorMsg('이메일 형식이 아닙니다');
				setEmailType(true);
			}else {
				setErrorMsg('');
				setEmailType(false);
			}
		} else {
			setErrorMsg('');
			setEmailType(false);
		}
	}

	return (<CardContent sx={{p: 3}}>
		
		<FormControl fullWidth={true}>
		<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						autoComplete="given-name"
						name="firstName"
						required
						fullWidth
						id="firstName"
						label="이름(예: 길동)"
						autoFocus
					/>
					</Grid>
					<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="lastName"
						label="성(예:홍)"
						name="lastName"
						autoComplete="family-name"
					/>
					</Grid>
					<Grid item xs={12} style={{paddingTop: 0}}>
						<FormHelperText sx={{mx: '14px'}}>정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.</FormHelperText>
					</Grid>
				<Grid item xs={12}>
					<TextField fullWidth label="생년월일" id="birth" type="date" sx={{mt: 2}} color="info" 
						onChange={(e)=>emailChane(e.target.value)} />
					<FormHelperText>만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른 회원에게 공개되지 않습니다.</FormHelperText>
				</Grid>
				<Grid item xs={12}>
					<TextField fullWidth label="이메일" id="email" type="email" sx={{mt: 2}} color="info" 
					error={emailType}
					helperText={errorMsg}
					onChange={(e)=>emailChane(e.target.value)} />
					<FormHelperText>예약 확인과 영수증을 이메일로 보내드립니다.</FormHelperText>
				</Grid>
				<Grid item xs={12}>
				<FormControl sx={{ width: 1}} variant="outlined">
				<InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={(e)=>setPassword(e.target.value)}
						label="비밀번호"
						endAdornment={
						<InputAdornment position="end">
							<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
							>
							{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
						}
					/>
					<FormHelperText>비밀번호 보안 수준: 약함</FormHelperText>
					<FormHelperText>비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다.</FormHelperText>
					<FormHelperText>최소 8자</FormHelperText>
					<FormHelperText>숫자나 기호를 포함하세요</FormHelperText>
				</FormControl>
				</Grid>
			</Grid>
			<Button variant="contained" disableElevation
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
						control={<Checkbox value="allowExtraEmails" color="primary" size="small" />}
						style={{fontSize: '10px'}}
					/>
				</Box>
				<Box>
					<FormControlLabel
						control={<Checkbox value="allowExtraEmails" color="primary" size="small" />}
						label={<Typography sx={{ fontSize: 10, fontWeight: 400 }}>
							마케팅 이메일 수신을 원합니다(선택).
						</Typography>}
					/>
				</Box>
			</Grid>
		</Grid>
	</CardContent>)

}