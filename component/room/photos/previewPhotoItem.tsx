import { useEffect, useState } from "react";
import { Box } from "@mui/system"
import { grey, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import InsertPhotoOutlinedIcon  from '@mui/icons-material/InsertPhotoOutlined';
import { Typography } from "@mui/material";

interface Props {
    target: File,
    isCover: boolean
}

const PreviewPhoto = styled(Box) ({
    '&': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'calc((100% - 10px) / 2)',
        height: '200px',
        backgroundColor: grey[300],
        position: 'relative'
    },
    '& img': {
        width: '100%', 
        height: '100%', 
        objectFit: 'contain'
    },
    '&:first-child': {
        width: '100%',
        height: '400px',
    },
    '&:first-child img': {
        objectFit: 'cover'
    }
})

export default function PreviewPhotoItem (props: Props) {
    const {target, isCover} = props;
    console.log(isCover)
    const [imageUri, setImageUri] = useState<string>('');

    useEffect(()=> {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target);
        fileReader.onload = (rst) => {
        // file read 후 결과 출력
        console.log(rst.target!.result);
        setImageUri(rst.target!.result as string);
    }
    }, []);
    return ( <PreviewPhoto>
        {isCover && <Typography variant="body1" sx={{
            position: 'absolute', left: 20, top: 16, backgroundColor: '#fff', py: 1, px: 1.4, borderRadius: 1, lineHeight: 1
        }}>커버사진</Typography>}
        {imageUri && <img src={imageUri} />}
    </PreviewPhoto> )
}