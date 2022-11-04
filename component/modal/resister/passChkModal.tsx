import { Box, Button, CardContent, Divider, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { red } from '@mui/material/colors';
import { useCtx } from '../../../context/context';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PassChk() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const ctx = useCtx();
	const {userEmail, setUserEmail, setMode} = ctx!
    

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	  };
	
	  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	  };
      const submitHandle = () => {
        
      }

	return (<CardContent sx={{p: 3}}>
		<FormControl sx={{ width: 1}} variant="outlined">
            <InputLabel htmlFor="password" color="info" >비밀번호</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    // error={error}
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
                <Button variant="contained" disableElevation
                    sx={{ width: 1, my: 2, bgcolor: red[600], p:1.4}}
                    onClick={submitHandle}
                >로그인</Button>
                <Link href="#"  color="inherit" sx={{fontSize: '12px'}}>비밀번호를 잊으셨나요?</Link>
		</FormControl>
	
        </CardContent>)
}