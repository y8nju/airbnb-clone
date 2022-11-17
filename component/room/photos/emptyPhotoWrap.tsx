import { Box, Grid, Typography } from "@mui/material";
import { grey, red } from '@mui/material/colors';
import Image from "next/image";
import React, { useRef, useContext, Dispatch, SetStateAction, useState } from "react";
import { PhotosContext } from "../../../pages/become-a-host/[roomid]/photos";

export default function EmptyPhotoWrap () {

    const [draged, setDraged] = useState(false)
    const ref = useRef<HTMLInputElement>(null);
    const fileCtx = useContext(PhotosContext);
    const {files, addFiles,removeFiles} = fileCtx!;

    const dropHandle: React.DragEventHandler = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log(evt.dataTransfer.files); 
        const fileArray = Array.from(evt.dataTransfer.files); // File[]
        addFiles(fileArray)
    }
    const fileSelectHandle:React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        console.log(evt.target.files);
        if(evt.target.files) {
            const fileArray = Array.from(evt.target.files!); // File[]
            addFiles(fileArray);
        }
    }

    return ( <Grid container direction="column" justifyContent="center" alignItems="center" width="80%" minHeight='70%'
        onDragOver={(evt)=> {
            evt.preventDefault();
            evt.stopPropagation();
        }}
        onDragEnter = {(evt) => {
            setDraged(true);
        }}
        onDragLeave={(evt => {
            setDraged(false);
        })}
        onDrop={dropHandle}
        sx={{border: `1px dashed ${grey[300]}`, px: 4, pt: 10, pb: 7, my: 'auto'}}>
            {!draged && <>
                <Image src={'/images/icons/multiplePhotos.png'} width={50} height={50} alt="multiplePhotos" style={{marginBottom: 10}} />
                <Typography variant="h5">여기로 사진을 끌어다 놓으세요.</Typography>
                <Typography variant="body1">5장 이상의 사진을 선택하세요.</Typography>
                <Typography variant="body2" 
                    onClick={() => { ref.current?.click() }}
                    sx={{fontWeight: 500, textDecoration: 'underLine', mt: 5, cursor: 'pointer'}}>
                    기기에서 업로드
                </Typography>
            </>}
            {draged && <>
                <Image src={'/images/icons/multiplePhotos.png'} width={50} height={50} alt="multiplePhotos" style={{marginBottom: 10}} />
                <Typography variant="h5" align="center">업로드 하려면 사진을 끌어서 놓으세요.</Typography>
            </>}
       
        <input type="file" 
          accept="image/*" multiple ref={ref} style={{display: 'none'}}
          onChange={fileSelectHandle} />
</Grid> )
}