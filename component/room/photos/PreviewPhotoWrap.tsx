import { Grid } from "@mui/material";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PhotosContext } from "../../../pages/become-a-host/[roomid]/photos";
import NotPhotoItem from "./notPhotoItem";
import PhotosInner from "./photosInner";
import PreviewPhotoItem from "./previewPhotoItem";
import UploadedFileWrap from "./uploadedFileWrap";

export default function PreviewPhotoWrap () {
    const fileCtx = useContext(PhotosContext);
    const {files, fileSelectHandle, draged} = fileCtx!;
    const [notFiles, setNotFiles] = useState<JSX.Element[] | null>(null)
    useEffect(()=> {
        console.log('files.length', files.length)
        console.log('notFiles.length', notFiles?.length)
        console.log(notFiles, typeof notFiles)
        if(files.length < 4) {
            console.log('a')
            setNotFiles(Array.from(Array(4 - files.length), (x, index) => <NotPhotoItem key={index} />))
        }
    }, [files])
    useEffect(() => {
        console.log(notFiles)
    }, [notFiles])

    return ( <PhotosInner>
        <>
        <Grid container flexWrap="wrap" alignItems="center"
            sx={{gap: '10px', mb: 2}}>
            { files.map((file, index) => {
                return <PreviewPhotoItem target={file} key={file.lastModified} isCover={index == 0} />
            }) }
            {notFiles !== null && notFiles}
            <NotPhotoItem isLast={true}/>
            {draged && <UploadedFileWrap sx={{backgroundColor: '#fffc', position: 'absolute', zIndex: 3000}} />}
        </Grid>
        </>
    </PhotosInner> )
}