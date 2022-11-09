import { useEffect, useState } from 'react';
import { CardContent, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Error from '@mui/icons-material/Error';
import { useCtx } from "../../../../context/context";
import { signIn, SignInResponse } from 'next-auth/react';
import { findEmail } from '../../../../lib/api/accountApi';
import { red } from '@mui/material/colors';

interface OnClose {
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AlreadyCheck(props: OnClose) {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [inpError, setInpError] = useState<boolean>(false);
	const [diffrent, setDiffrent] = useState<boolean>(false);
	const {onClose} = props;

	const ctx = useCtx();
	const {userEmail, setMode, setLoading, loading, alreadyChk, setAlredayChk } = ctx!

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
					window.localStorage.setItem('commShow', 'true');
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

    return (<CardContent sx={{p: 3, height: 'auto'}}>
        <Grid container spacing={2} sx={{mb: 4}}>
            <Grid item xs={12} sx={{ mb: 1}} sx={{textAlign: 'center'}} >
				<Typography variant='body2' sx={{mb: 1.5}}>
					회원님 소유의 계정이 존재합니다. 계정으로 로그인하시기 바랍니다.
				</Typography>
                <AccountCircleTwoToneIcon style={{ fontSize: '8rem', color: '#495966', mb: 0.5 }} />
                <Typography sx={{fontSize: '12px'}}>
					{alreadyChk?.authUserName}
				</Typography>
				<Typography variant='body2' sx={{mb: 1.5}}>
					{alreadyChk?.alreadyEmail}
				</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1}}>
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
            </Grid>
            <Grid item xs={12} sx={{ mb: 1}}>
				<Link href="#" color="inherit" sx={{fontSize: '12px'}}
					onClick={()=>setMode('PassFind')}>비밀번호를 잊으셨나요?</Link>
            </Grid>
        </Grid>
    </CardContent>)
}