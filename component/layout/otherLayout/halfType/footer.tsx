import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {Box, Button, Grid, LinearProgress } from "@mui/material/";
import { useRouter } from 'next/router';
interface Props {
    progress: number
    setProgress: Dispatch<SetStateAction<number>>
    footerShow: boolean
}

export default function HalfFooter (props: Props) {
    const {progress, setProgress, footerShow} = props;
    console.log('footerShow', footerShow)
    if(!footerShow) {
        return <></>
    }
    return ( <Grid container direction="column" sx={{height: '80px'}} position="absolute" bottom={0}>
    <Grid container>
        <Box sx={{ width: '100%' }}>
  <LinearProgress variant="determinate" color="info" value={progress} sx={{height: '2px'}} />
</Box>
    </Grid>
    <Grid container sx={{px: '48px'}} flex={1} alignItems="center" justifyContent="space-between">
        <Grid item sx={{mr: 2}}>
            <Button color="inherit" sx={{backgroundColor: "#fff", fontSize: '1rem'}}>도움말</Button>
        </Grid>
        <Grid item>
            <Button variant="contained" color="info" sx={{fontSize: '1rem', boxShadow: 'none'}}>저장 및 나가기</Button>
        </Grid>
    </Grid>
</Grid> )
}