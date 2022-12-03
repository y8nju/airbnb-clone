import { useEffect, useState } from 'react';
import { Card, CardActionArea, CardMedia, Grid, Typography, CardContent, Divider, Box } from "@mui/material";
import { PopulateBookingType } from "../../interface/bookingType";
import { findEmail } from '../../lib/api/accountApi';
import { format, formatDistance } from "date-fns";
import {ko} from "date-fns/locale";

export default function AfterBookItem({data}: {data: PopulateBookingType}) {
    const [hostName, setHostName] = useState<string|null>(null);
    
    useEffect(()=> {
        if(data){
            const getHost = async() => {
                const result = await findEmail(data.productId.hostname as string);
                const host = result.data
                setHostName(host.firstName);
            }
            getHost();
        }
    }, [])
    return (<Grid item sx={{width: 1}} xs={12} md={6}>
        {data && <Card sx={{borderRadius: 2}}>
		<CardActionArea sx={{display: 'flex'}}>
			<CardContent sx={{flex: 1, position: 'relative'}}>
                <Grid item sx={{pb: 2}}>
                    <Typography gutterBottom variant="h6" component="div" fontWeight={500} sx={{lineHeight: 1.2}}>
                        {data.productId.location!.state}
                    </Typography>
                    <Typography variant="caption" component="div" color="text.secondary">
                        {hostName} 님이 호스팅하는 {data.productId.property}의 {data.productId.privacy}
                    </Typography>
                </Grid>
                <Divider />
                <Grid item sx={{display: 'flex', pt: 2}}>
                    <Box sx={{mr: 2}}>
                        <Typography variant="body2">
                            {format(new Date(data.checkin.slice(0,10)), 'MMM do', {locale: ko})}-
                        </Typography>
                        <Typography variant="body2">
                           {format(new Date(data.checkout.slice(0,10)), 'MMM do', {locale: ko})}
                        </Typography>
                        <Typography variant="caption" component="div" color="text.secondary">
                           {data.checkout.slice(0,4)}년
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ml: 2, flex: 1}} >
                        <Typography variant="body1">
                            {data.productId.location!.state} {data.productId.location!.city}
                        </Typography>
                        <Typography variant="body1">
                            {data.productId.location!.street}
                        </Typography>
                    </Box>
                </Grid>
                <Typography fontSize="10px" fontWeight={500}
                    sx={{position: 'absolute', top: '8px', left: 'calc(100% + 8px)', whiteSpace: 'nowrap', backgroundColor: '#fff', px: 0.6, py: 0.2, borderRadius: 1}}>
                {formatDistance(new Date(data.checkin.slice(0,10)), new Date(), {
                    addSuffix: true,
                    locale: ko,
                })}{" "}
                </Typography>
			</CardContent>
			<CardMedia
                sx={{flex: 1}}
				component="img"
				height="180"
				image={data.productId.photos && data.productId.photos[0]! as string}
				alt={data.productId.title}/>
		</CardActionArea>
		</Card>}
    </Grid>)
}