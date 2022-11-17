import { Grid } from "@mui/material";
import Image from "next/image";
import React, { useContext, useRef } from "react";
import { PhotosContext } from "../../../pages/become-a-host/[roomid]/photos";
import NotPhotoItem from "./notPhotoItem";
import PreviewPhotoItem from "./previewPhotoItem";

export default function PreviewPhotoWrap () {
    const fileCtx = useContext(PhotosContext);
    const {files, addFiles,removeFiles} = fileCtx!;
    const notFiles = Array.from(Array(5 - files.length), x => <NotPhotoItem />);

    return ( <Grid container flexWrap="wrap" alignItems="center"
        sx={{gap: '10px', mb: 2}}>
            { files.map((file, index) => {
                return <PreviewPhotoItem target={file} key={file.webkitRelativePath} isCover={index == 0} />
            }) }
            {files.length < 5 && notFiles}
</Grid> )
}