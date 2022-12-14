import {useState, useRef, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {Box, Grid, Typography, IconButton} from "@mui/material/";
import Link from "next/link";
import { useRouter } from "next/router";
import { SiAirbnb } from "react-icons/si";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { HalfLayoutContext } from './halfTypeLayout';
import { HostingType } from '../../../../interface/hostingType';

interface Props {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>
}

export default function Left ( props: Props) {
    const {title} = props;
    const [nowPlay, setNowPlay] = useState<boolean>(false);
    const playRef = useRef<HTMLVideoElement>(null);
	const layoutCtx = useContext(HalfLayoutContext);
    const { savedData } = layoutCtx!
    const router = useRouter();
    const pathname = router.pathname;
    const intro = '/become-a-host/intro'
    const celebration = '/become-a-host/[roomid]/publish-celebration';
    

    const nowPlayHandle = () => {
        if(nowPlay) {
            setNowPlay(false);
            playRef.current?.pause();
        }else {
            setNowPlay(true);
            playRef.current?.play();
        }
    }

    if(pathname == intro) {
        return (<Grid item flex={1} sx={{overflow: 'hidden', position: 'relative'}}>
            <video muted playsInline style={{objectFit: 'cover', objectPosition: '0px 25%', width: "100%", height: "100vh"}}
            poster="https://a0.muscache.com/pictures/f47aefea-4345-4b4d-bfbc-c28acbe9d0ae.jpg"
            ref={playRef} onEnded={()=> setNowPlay(false) }>
                <source src="https://a0.muscache.com/v/8b/04/8b0456c7-13f8-54bc-889a-7cf549f144a3/8b0456c713f854bc889a7cf549f144a3_4000k_1.mp4" type="video/mp4" />
            </video>
            <IconButton style={{position: 'absolute', right: '30px', bottom: '30px', backgroundColor: '#00000080', zIndex: 300 }}
                onClick={nowPlayHandle}>
                {!nowPlay ? <PlayArrowIcon fontSize="inherit" sx={{color: '#fff'}} /> :
                <PauseIcon fontSize="inherit" sx={{color: '#fff'}} />}
            </IconButton>
            {/* {!nowPlay && <Box style={{backgroundImage:'url(https://a0.muscache.com/pictures/f47aefea-4345-4b4d-bfbc-c28acbe9d0ae.jpg)', backgroundSize:'cover', backgroundPosition: '0px 25%',
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>
            </Box>} */}
        </Grid>)
    }
    if(pathname == celebration) {
        
        if(savedData.photos) {
            return (<Grid item flex={1}
                sx={{backgroundImage:`url(${savedData.photos[0] as string})`,
                    backgroundPosition: 'center', backgroundSize: 'cover'}}>
            </Grid>)
        }
    }

    return ( 
        <Grid item flex={1} style={{
            backgroundImage: 'linear-gradient(0deg, rgba(67,34,170,1) 0%, rgba(141,33,156,1) 35%, rgba(201,37,120,1) 100%)'
            // backgroundImage: "url('/images/img_room.jpg')"
        }}>
            <Link href="/" style={{position: 'fixed', top: '32px', left: '48px'}}>
                <SiAirbnb style={{color: '#fff', position: 'absolute',  fontSize: '32px'}} />
            </Link>
            <Grid container alignItems="center" sx={{height: '100%', maxWidth: '75%', ml: '48px'}}>
                <Typography variant="h3" sx={{fontWeight: 600, color: '#fff', width: '100%'}}>
                    {title}
                </Typography>
            </Grid>
        </Grid> )
}