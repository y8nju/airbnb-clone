import {Grid, Typography} from "@mui/material/";
import Link from "next/link";
import { SiAirbnb } from "react-icons/si";

interface Props {
    title: string
}

export default function Left ( props: Props): JSX.Element {
    const {title} = props;

    return ( 
        <Grid item flex={1} style={{
            backgroundImage: 'linear-gradient(0deg, rgba(67,34,170,1) 0%, rgba(141,33,156,1) 35%, rgba(201,37,120,1) 100%)'
            // backgroundImage: "url('/images/img_room.jpg')"
        }}>
            <Grid container justifyContent="center" alignItems="center" sx={{height: '100%'}}>
                <Link href="/" style={{position: 'fixed', top: '32px', left: '48px'}}>
                    <SiAirbnb style={{color: '#fff', position: 'absolute',  fontSize: '32px'}} />
                </Link>
                <Typography variant="h2" sx={{fontWeight: 600, color: '#fff', width: 'min-content'}}>
                    {title}
                </Typography>
            </Grid>
        </Grid> )
}