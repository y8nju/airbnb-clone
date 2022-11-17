import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { CSSProperties } from "react";

export default function UploadedFileWrap(props: {sx?: CSSProperties}) {
    return (<Grid container direction="column" justifyContent="center" alignItems="center" 
        width="calc(100% + 2px)" height="calc(100% + 2px)"
        sx={[{border: `2px solid ${grey[500]}`, ml: '-1px', mt: '-1px'}, props.sx!]}>
        <Image src={'/images/icons/multiplePhotos.png'} width={50} height={50} alt="multiplePhotos" style={{marginBottom: 10}} />
        <Typography variant="h5" align="center">업로드 하려면 사진을 끌어서 놓으세요.</Typography>
    </Grid>)
}