import { useContext, useEffect, useState, useRef } from "react";
import { Box } from "@mui/system"
import { grey, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CircularProgress, Fab, Grid, IconButton, Typography } from "@mui/material";
import { PhotosContext } from "../../../pages/become-a-host/[roomid]/photos";

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
        objectFit: 'cover'
    },
    '&:first-of-type': {
        width: '100%',
        height: '400px',
    }
})
const IconBtn = styled(Fab) ({
    '&': {
        marginLeft: 'auto', 
        backgroundColor: '#fff', 
        width: 32, 
        minHeight: 32, 
        height: 32,
        boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 10%), 0px 6px 10px 0px rgb(0 0 0 / 6%), 0px 1px 18px 0px rgb(0 0 0 / 6%)',
        position: 'relative',
        zIndex: 1
    }
})

export default function PreviewPhotoItem (props: Props) {
    const {target, isCover} = props;
    const [imageUri, setImageUri] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);
    const fileCtx = useContext(PhotosContext);
    const {removeFiles} = fileCtx!;
    const ref = useRef<HTMLDivElement>();

    useEffect(()=> {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target);
        fileReader.onprogress = (evt) => {
            console.log(evt)
            const percentLoaded = Math.round((evt.loaded / evt.total) * 100);
            // Increase the progress bar length.
            if (percentLoaded < 100) {
                setLoaded(true);
                console.log('시작')
            }else {
                setLoaded(false);
                console.log('끝')
            }
        };
        fileReader.onload = (rst) => {
        // file read 후 결과 출력
        console.log(rst.target!.result);
        setImageUri(rst.target!.result as string);
        }
    }, []);
    
    const removeHandle = () => {
        //console.log(ref.current?.style.);
        ref.current?.style.setProperty("animation", "fadeout 1.5s");
        setTimeout(() => {
        removeFiles(props.target);
        }, 1000);
    };
    return ( <PreviewPhoto ref={ref}>
        <Grid container position="absolute" left={0} top={16} justifyContent="space-between" alignItems="center" sx={{px: 2}}>
            {isCover && <Typography variant="body1" sx={{ py: 1, px: 1.4, borderRadius: 1, lineHeight: 1, backgroundColor: '#fff'
            }}>커버사진</Typography>}
            <IconBtn aria-label="delete" onClick={removeHandle}>
                <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconBtn>
        </Grid>
        {imageUri && <img src={imageUri} />}
        {loaded && <CircularProgress color="info" size={30}
        sx={{position: 'absolute', top: 10, left: 10, backgroundColor: '#bdbdbdaa', p: 0.5, borderRadius: 5}} />}
    </PreviewPhoto> )
}