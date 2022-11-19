import { Box, Grid, Typography } from "@mui/material";
import { grey} from '@mui/material/colors';
import Image from "next/image";
import React, { useRef, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import { ChidrenProps } from "../../../interface/propsType";
import { PhotosContext } from "../../../pages/become-a-host/[roomid]/photos";
import UploadedFileWrap from "./uploadedFileWrap";

export default function PhotosInner (props: ChidrenProps) {

    const fileCtx = useContext(PhotosContext);
    const { files, draged, setDraged, ref, dropHandle, fileSelectHandle } = fileCtx!;
    useEffect(()=> {
        setDraged(false);
    }, [files])

    return ( <Grid container width="90%" minHeight='95%' position="relative"
        sx={{mb: 'auto'}}>
        <Grid position="absolute" width="100%" height="100%"
            onDragOver={(evt)=> {
                evt.preventDefault();
                evt.stopPropagation();
                setDraged(true);
                console.log('over')
            }}
            onDragEnter = {(evt) => {
                setDraged(true);
                console.log('enter')
            }}
            onDragLeave={(evt => {
                setDraged(false);
                console.log('leave')
            })}
            onDrop={dropHandle}
            sx={[draged && {zIndex: 4000}]}></Grid>
        {props.children}
        <input type="file" 
            accept="image/*" multiple ref={ref} style={{display: 'none'}}
            onChange={fileSelectHandle} />
</Grid> )
}