import { Grid } from "@mui/material";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PhotosContext } from "../../../pages/become-a-host/[roomid]/photos";
import { HalfLayoutContext } from "../../layout/otherLayout/halfType/halfTypeLayout";
import NotPhotoItem from "./notPhotoItem";
import PhotosInner from "./photosInner";
import PreviewPhotoItem from "./previewPhotoItem";
import UploadedFileWrap from "./uploadedFileWrap";

export default function PreviewPhotoWrap () {
    const fileCtx = useContext(PhotosContext);
    const {files, fileSelectHandle, draged, savedImgUri } = fileCtx!;
    const layoutCtx = useContext(HalfLayoutContext);
    const [notFiles, setNotFiles] = useState<JSX.Element[] | null>(null);
    

    useEffect(()=> {
        // console.log('files.length', files.length);
        // console.log('notFiles.length', notFiles?.length);
        // console.log(notFiles, typeof notFiles);
        // console.log('savedImgUri', savedImgUri);
        if(files) {
            if(files.length < 4 ) {
                    setNotFiles(Array.from(Array(4 - files.length), (x, index) => <NotPhotoItem key={index} />))
            }
            if(files.length > 4) {
                setNotFiles(null)
            }
        }
        if(savedImgUri) {
            if(savedImgUri!.length > 0) {
                if(savedImgUri!.length < 4) {
                    setNotFiles(Array.from(Array(4 - savedImgUri!.length), (x, index) => <NotPhotoItem key={index} />))
                }  else if (savedImgUri!.length > 4) {
                    setNotFiles(null)
                } 
                if(files.length > 0) {
                    console.log(savedImgUri!.length + files.length)
                    if((savedImgUri!.length + files.length) < 4) {
                        setNotFiles(Array.from(Array(4 - savedImgUri!.length), (x, index) => <NotPhotoItem key={index} />))
                    } else if((savedImgUri!.length + files.length) > 4) {
                        setNotFiles(null)
                    }
                }
            }
        }
    }, [files, savedImgUri])

    return ( <PhotosInner>
        <>
        <Grid container flexWrap="wrap" alignItems="center"
            sx={{gap: '10px', mb: 2}}>
                {(!savedImgUri) ? files.map((file, index) => {
                    return <PreviewPhotoItem target={file} key={file.lastModified} isCover={index == 0} />
                }) : ( (savedImgUri && files) ? <>{savedImgUri.map((uri, index) => {
                        return <PreviewPhotoItem savedUri={uri} key={index} isCover={index == 0} />
                    })}
                    {files.map((file, index) => {
                        return <PreviewPhotoItem target={file} key={file.lastModified} />
                    })} </>: 
                    savedImgUri.map((uri, index) => {
                        return <PreviewPhotoItem savedUri={uri} key={index} isCover={index == 0} />
                    }))
                }
            {notFiles !== null && notFiles}
            <NotPhotoItem isLast={true}/>
            {draged && <UploadedFileWrap sx={{backgroundColor: '#fffc', position: 'absolute', zIndex: 3000}} />}
        </Grid>
        </>
    </PhotosInner> )
}