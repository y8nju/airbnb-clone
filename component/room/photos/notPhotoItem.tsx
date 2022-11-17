import { useEffect, useState } from "react";
import { Box } from "@mui/system"
import { grey, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import InsertPhotoOutlinedIcon  from '@mui/icons-material/InsertPhotoOutlined';

interface Props {
    isLast?: boolean;
}

const PreviewPhoto = styled(Box) ({
    '&': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px dashed ${grey[500]}`,
        width: 'calc((100% - 10px) / 2)',
        height: '200px',
    },
    '&:hover': {
        borderStyle: 'solid', 
        borderWidth: '2px'
    }
})

export default function NotPhotoItem (props: Props) {
    return ( <PreviewPhoto>
        <InsertPhotoOutlinedIcon fontSize="large" sx={{color: grey[600]}} />
    </PreviewPhoto> )
}