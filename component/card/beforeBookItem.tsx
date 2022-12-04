import { useEffect, useState } from 'react';
import { Card, CardActionArea, CardMedia, Grid, Typography, CardContent, Divider, Box } from "@mui/material";
import { PopulateBookingType } from "../../interface/bookingType";
import { findEmail } from '../../lib/api/accountApi';
import { format, formatDistance } from "date-fns";
import {ko} from "date-fns/locale";

export default function BeforeBookItem({data}: {data: PopulateBookingType}) {
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
    return (<Grid item sx={{width: 1}} xs={12} md={3}>
        {data == null ? null : <Card sx={{borderRadius: 2, p: 1}}>
		<CardActionArea sx={{display: 'flex'}}>
			<CardMedia
                sx={{borderRadius: 2, width: '120px'}}
				component="img"
				height="120"
				image={data.productId.photos && data.productId.photos[0]! as string}
				alt={data.productId.title}/>
			<CardContent sx={{flex: 1, py: 0}}>
                <Typography gutterBottom variant="body1" component="div" fontWeight={500} sx={{lineHeight: 1.2}}>
                    {data.productId.location!.state} {data.productId.location!.city}
                </Typography>
                <Typography variant="caption" component="div" color="text.secondary" sx={{my: 1}}>
                    호스트: {hostName}님
                </Typography>
                <Typography variant="caption" component="div">
                    {format(new Date((data.checkin as string)?.slice(0,10)), 'yyyy MMM do', {locale: ko})}-
                </Typography>
                <Typography variant="caption" component="div">
                    {format(new Date((data.checkout as string)?.slice(0,10)), 'yyyy MMM do', {locale: ko})}
                </Typography>
			</CardContent>
		</CardActionArea>
		</Card>}
    </Grid>)
}