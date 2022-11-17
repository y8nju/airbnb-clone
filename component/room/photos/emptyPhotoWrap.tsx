import { Box, Grid, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import Image from "next/image";
import React, { useRef, useContext, useState } from "react";
import { PhotosContext } from "../../../pages/become-a-host/[roomid]/photos";
import PhotosInner from "./photosInner";
import UploadedFileWrap from "./uploadedFileWrap";

export default function EmptyPhotoWrap () {
    const fileCtx = useContext(PhotosContext);
    const {addFiles, draged, ref, fileSelectHandle} = fileCtx!;

    return ( <PhotosInner>
        <>
        {!draged && <Grid container direction="column" justifyContent="center" alignItems="center"
             sx={{border: `1px dashed ${grey[300]}`}}>
            <Image src={'/images/icons/multiplePhotos.png'} width={50} height={50} alt="multiplePhotos" style={{marginBottom: 10}} />
            <Typography variant="h5">여기로 사진을 끌어다 놓으세요.</Typography>
            <Typography variant="body1">5장 이상의 사진을 선택하세요.</Typography>
            <Box onClick={() => { ref.current?.click() }}
                sx={{position: 'absolute', bottom: 'min(140px, 30%)', cursor: 'pointer'}}>
                <Typography variant="body2" 
                    sx={{fontWeight: 500, textDecoration: 'underLine' }}>
                    기기에서 업로드
                </Typography>
            </Box>
        </Grid>}
        {draged && <UploadedFileWrap sx={{backgroundColor: grey[100]}} />}
        </>
    </PhotosInner> )
}