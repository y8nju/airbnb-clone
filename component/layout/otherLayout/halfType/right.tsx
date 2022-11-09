import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {Grid, Typography} from "@mui/material/";
import HalfFooter from "./footer";
import HalfHeader from "./header";

interface Props {
	children: React.ReactElement;
    progress: number
    setProgress: Dispatch<SetStateAction<number>>
    footerShow: boolean,
    headerShow: boolean
}

export default function Right (props: Props) {
    const {progress, setProgress, children, footerShow, headerShow} = props;
    return (
        <Grid item flex={1} position="relative" sx={{overflow: 'hidden'}}>
            <HalfHeader headerShow={headerShow} />
            <Grid container sx={
                !headerShow && {height: 'calc( 100vh - 88px)', mb: '88px', overflowY: 'scroll'} ||
                !footerShow&& {height: 'calc( 100vh - 80px)', mt: '80px', overflowY: 'scroll'} ||
                {height: 'calc( 100vh - 80px - 88px)', mb: '80px', mt: '88px', overflowY: 'scroll'}}>
                    {children}
            </Grid>
            <HalfFooter progress={progress} setProgress={setProgress} footerShow={footerShow} />
        </Grid> )
}