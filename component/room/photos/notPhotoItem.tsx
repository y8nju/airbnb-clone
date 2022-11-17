import { useEffect, useState } from "react";
import { Box } from "@mui/system"
import { grey, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import InsertPhotoOutlinedIcon  from '@mui/icons-material/InsertPhotoOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from "@mui/material";

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
        position: 'relative',
        zIndex: 1
    },
    '&:hover': {
        borderStyle: 'solid', 
        borderWidth: '2px'
    }
})

export default function NotPhotoItem (props: Props) {
    return ( <PreviewPhoto>
        {!props?.isLast ? <InsertPhotoOutlinedIcon fontSize="large" sx={{color: grey[600]}} /> :
        <Box>
            <AddIcon />
            <Typography variant="body1">추가</Typography>
        </Box>
        }
    </PreviewPhoto> )
}