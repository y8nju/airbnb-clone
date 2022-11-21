import React, { Dispatch, SetStateAction, useContext, useRef, useState } from 'react';
import {Box, Button, Grid, LinearProgress } from "@mui/material/";
import { useRouter } from 'next/router';
import { HalfLayoutContext } from './halfTypeLayout';
interface Props {
    progress: number
    nextStepHandle?: () => void;
}
const gradientBg = {backgroundImage: 'radial-gradient(circle at center center, rgb(255, 56, 92) 0%, rgb(230, 30, 77) 27.5%, rgb(227, 28, 95) 40%, rgb(215, 4, 102) 57.5%, rgb(189, 30, 89) 75%, rgb(189, 30, 89) 100%)',
    backgroundSize: '200% 200%'}
export default function HalfFooter (props: Props) {
    const {progress, nextStepHandle} = props!;
    const router = useRouter();
    const { roomid } = router.query;
    const pathname = router.pathname;
    const intro = '/become-a-host/intro'
    const location = '/become-a-host/[roomid]/location';
    const celebration = '/become-a-host/[roomid]/publish-celebration';
    const layoutCtx = useContext(HalfLayoutContext);
    const {nextBtnDisabled, setNextBtnDisabled} = layoutCtx!;

    const backHandle = () =>{
        setNextBtnDisabled(false);
        switch(pathname) {
            case "/become-a-host/[roomid]/property-type-group":
                router.push('/become-a-host');
            case '/become-a-host/[roomid]/property-type':
                router.push(`/become-a-host/${roomid}/property-type-group`);
                break;
            case '/become-a-host/[roomid]/privacy-type':
                router.push(`/become-a-host/${roomid}/property-type`);
                break;
            case '/become-a-host/[roomid]/location':
                router.push(`/become-a-host/${roomid}/privacy-type`);
                break;
            case '/become-a-host/[roomid]/floor-plan':
                router.push(`/become-a-host/${roomid}/location`);
                break;
            case '/become-a-host/[roomid]/amenities':
                router.push(`/become-a-host/${roomid}/floor-plan`);
                break;
            case '/become-a-host/[roomid]/photos':
                router.push(`/become-a-host/${roomid}/amenities`);
                break;
            case '/become-a-host/[roomid]/title':
                router.push(`/become-a-host/${roomid}/photos`);
                break;
            case '/become-a-host/[roomid]/description':
                router.push(`/become-a-host/${roomid}/title`);
                break;
            case '/become-a-host/[roomid]/price':
                router.push(`/become-a-host/${roomid}/description`);
                break;
            case '/become-a-host/[roomid]/receipt':
                router.push(`/become-a-host/${roomid}/price`);
                break;
        }
    }

    return ( <Grid container direction="column" sx={[{height: '80px'}, pathname == location && {backgroundColor: '#fff'}]} 
        position="absolute" bottom={0} zIndex={2000}>
    <Grid container>
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" color="info" value={progress} sx={{height: '1px'}} />
        </Box>
    </Grid>
    <Grid container sx={{px: '48px'}} flex={1} alignItems="center" justifyContent="space-between">
        {(pathname == intro) ? 
            <Grid item style={{marginLeft: "auto"}}>
                <Button variant="contained" color="info" sx={[{fontSize: '1rem', boxShadow: 'none'}, gradientBg]}
                onClick={()=> router.push("/become-a-host/property-type-group")}>시작하기</Button>
            </Grid> : 
        ((pathname == celebration) ? 
            <Grid item style={{marginLeft: "auto"}}>
                <Button variant="contained" color="info" sx={[{fontSize: '1rem', boxShadow: 'none'}, gradientBg]}
                onClick={()=> router.push("/become-a-host")}>시작하기</Button>
            </Grid>: 
        <>
        <Grid item sx={{mr: 2}}>
            <Button color="inherit" sx={{backgroundColor: "#fff", fontSize: '1rem', textDecoration: 'underline'}} onClick={backHandle}>뒤로</Button>
        </Grid>
        <Grid item>
            <Button variant="contained" color="info" 
                disabled={nextBtnDisabled}
                sx={{fontSize: '1rem', boxShadow: 'none'}} 
                onClick={nextStepHandle}>다음</Button>
        </Grid></>)}
    </Grid>
</Grid> )
}