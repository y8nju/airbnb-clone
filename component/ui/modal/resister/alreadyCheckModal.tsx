import { useEffect, useState } from 'react';
import { Button, CardContent, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Error from '@mui/icons-material/Error';
import { useCtx } from "../../../../context/context";
import { signIn, SignInResponse } from 'next-auth/react';
import { findEmail } from '../../../../lib/api/accountApi';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import popupCenter from '../../popup/popupCenter';
import { FcGoogle } from "react-icons/fc";
import { CiMail } from "react-icons/ci";

interface OnClose {
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AlreadyCheck(props: OnClose) {
	const [password, setPassword] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [inpError, setInpError] = useState<boolean>(false);
	const [diffrent, setDiffrent] = useState<boolean>(false);
	const {onClose} = props;

	const ctx = useCtx();
	const {userEmail, setUserEmail, setMode, setLoading, loading, alreadyChk, setAlreadayChk } = ctx!
	const {provider} = alreadyChk;

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
					email: alreadyChk?.alreadyEmail,
					password: password
				})) as SignInResponse;
				console.log('result', result)
				if(result.ok == true) {
					console.log('로그인')
					onClose(false);
					const resp = await findEmail(alreadyChk?.alreadyEmail as string);
					if(resp?.data?.visible == null) {
						setMode('Commitment');
					}else {
						setMode(null)
					}
				}else {
					console.log('확인요망')
					setDiffrent(true);
				}
				setLoading(false);
			}
		}
	}

	const googleSigninHandle = () => {
		popupCenter('/oAuthPage/gOauth', 'Google Login', )
		// 가입 여부 체크 callback
		//@ts-ignore
		window.alreadyCallback = (data: AlreadyCheck) => {
			setAlreadayChk(data);
			console.log(data)
		} 
		// 서약동의 callback
		//@ts-ignore
		window.commitmentCallback = (userEmail: string ) => {
			setUserEmail(userEmail);
			setMode('Commitment');
		}
	}

	const anotherLoginHandle = () => {
		setUserEmail(undefined);
		setMode('Checked');
	}

    return (<CardContent sx={{p: 3, height: 'auto'}}>
        <Grid container spacing={2} sx={{mb: 4}}>
            <Grid item xs={12} sx={{ mb: 1, textAlign: 'center'}} >
				<Typography variant='body2' sx={{mb: 1.5}}>
					{provider == 'credentials' && '회원님 소유의 계정이 존재합니다. 계정으로 로그인하시기 바랍니다.'}
				</Typography>
                <AccountCircleTwoToneIcon style={{ fontSize: '8rem', color: '#495966' }} />
                {provider == 'credentials' && <Typography sx={{fontSize: '12px'}}>
					{alreadyChk?.authUserName}
				</Typography>}
				<Typography variant='body2' sx={{mb: 1.5}}>
					{provider == 'google' && <CiMail size="14px" style={{verticalAlign: 'middle', marginRight: '4px'}} />}
					{alreadyChk?.alreadyEmail}
				</Typography>
            </Grid>

            {provider == 'credentials' && <>
				<Grid item xs={12} sx={{ mb: 1}}>
					<FormControl sx={{ width: 1}} variant="outlined">
					<InputLabel htmlFor="password" color="info" >비밀번호</InputLabel>
						<OutlinedInput
							id="password"
							type={showPassword ? 'text' : 'password'}
							value={password || ''}
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
								<Typography variant='caption'>비밀번호는 최소 8자 이상이어야 합니다. 다시 시도해 주세요.</Typography>
							</FormHelperText>
						}
						{diffrent &&
							<FormHelperText 
								sx={{display: 'flex', alignItems: 'center', color:"#d32f2f"}}>
								<Error sx={{mr: 1, mt: 0.5}} fontSize="small" />
								<Typography variant='caption'>유효하지 않은 비밀번호입니다. 다시 시도하여 주세요.</Typography>
							</FormHelperText>
						}
						<LoadingButton variant="contained" disableElevation
							type="submit"
							loading={loading}
							sx={{ width: 1, my: 2, bgcolor: red[600], p:1.4}}
							onClick={() => submitHandle('Enter')}
						>로그인</LoadingButton>
					</FormControl>
				</Grid>
				<Grid item xs={12} sx={{ mb: 1}}>
					<Box>
						<Link href="#" color="inherit" sx={{fontSize: '12px'}}
							onClick={anotherLoginHandle}>다른 계정으로 로그인하기</Link>
					</Box>
					<Box>
						<Link href="#" color="inherit" sx={{fontSize: '12px'}}
							onClick={()=>setMode('PassFind')}>비밀번호를 잊으셨나요?</Link>
					</Box>
				</Grid>
			</>}

			{provider == 'google' && <>
				<Grid item xs={12} sx={{ mb: 1}}>
					<Button variant="outlined" color="info"
						sx={{ width: 1, p: 1.4}}
						onClick={googleSigninHandle}
						startIcon={<FcGoogle style={{marginLeft: '10px'}}
					/>}>
						<Typography variant='button' flexGrow={1}>구글로 로그인하기</Typography>
					</Button>
				</Grid>
				<Grid item xs={12} sx={{ mb: 1}}>
					<Box>
						<Typography variant='caption'>본인이 아니신가요? </Typography>
						<Link href="#" color="inherit" sx={{fontSize: '12px'}}
							onClick={anotherLoginHandle}>다른 계정으로 로그인하기</Link>
					</Box>
				</Grid>
			</>}
            
        </Grid>
    </CardContent>)
}