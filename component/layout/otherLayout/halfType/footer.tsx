import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {Box, Button, Grid, LinearProgress } from "@mui/material/";
import { useRouter } from 'next/router';
interface Props {
    progress: number
    nextStepHandle?: () => void;
}
const gradientBg = {'background-image': 'radial-gradient(circle at center center, rgb(255, 56, 92) 0%, rgb(230, 30, 77) 27.5%, rgb(227, 28, 95) 40%, rgb(215, 4, 102) 57.5%, rgb(189, 30, 89) 75%, rgb(189, 30, 89) 100%)',
'background-size': '200% 200%'}
export default function HalfFooter (props: Props) {
    const {progress, nextStepHandle} = props!;
    const router = useRouter();
    const pathname = router.pathname;
    const intro = '/become-a-host/intro'

    return ( <Grid container direction="column" sx={{height: '80px'}} position="absolute" bottom={0} zIndex={2000}>
    <Grid container>
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" color="info" value={progress} sx={{height: '1px'}} />
        </Box>
    </Grid>
    <Grid container sx={{px: '48px'}} flex={1} alignItems="center" justifyContent="space-between">
        {(pathname == intro) ? 
        <Grid item style={{marginLeft: "auto"}}>
            <Button variant="contained" color="info" sx={[{fontSize: '1rem', boxShadow: 'none'}, gradientBg]}
            onClick={()=> router.push('/become-a-host/')}>시작하기</Button>
        </Grid> : <>
        <Grid item sx={{mr: 2}}>
            <Button color="inherit" sx={{backgroundColor: "#fff", fontSize: '1rem'}} onClick={() => router.back()}>뒤로</Button>
        </Grid>
        <Grid item>
            <Button variant="contained" color="info" sx={{fontSize: '1rem', boxShadow: 'none'}} onClick={nextStepHandle}>다음</Button>
        </Grid></>}
    </Grid>
</Grid> )
}