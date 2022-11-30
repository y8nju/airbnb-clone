import { useEffect, useState } from 'react'
import { Grid, Typography, Divider } from "@mui/material";
import { PopulateBookingType } from "../../interface/bookingType";
import { nowLocationAddress } from '../../lib/api/mapsApi';
import { grey } from '@mui/material/colors';
import { format, differenceInCalendarDays } from "date-fns";
import MapsModal from './mapsModal';

export default function BookInfo({ data }: { data: PopulateBookingType }) {
    const [mapsOpen, setMapsOpen] = useState<boolean>(false);
    const { location } = data.productId;
	const checkinStr = data.checkin!.toString().slice(0, 10);
	const checkoutStr = data.checkout!.toString().slice(0, 10);
    let diff;
    if (data.checkin && data.checkout) {
        diff = differenceInCalendarDays(new Date(data.checkout as Date) as Date, new Date(data.checkin as Date) as Date);
    }
    useEffect(() => {
        console.log(typeof data.checkin)
    }, [])

    return(<Grid direction="column" sx={{ width: 1, margin: "auto", p: 3, borderRadius: 2, border: 1, borderColor: 'grey.300'}}>
		<Grid container justifyContent="space-between" alignItems="center" sx={{ pb:3, pt: 1 }}>
            <Grid container flex={1} sx={{gap: 6}}>
                <Typography variant="body1" >
                    체크인
                </Typography>
                <Typography variant="body1" fontWeight={300}>
                    {data.checkin !== null && <>
                        {new Intl.DateTimeFormat('ko', { dateStyle: 'long' }).format(new Date(checkinStr))}
                        ({new Intl.DateTimeFormat('ko', { weekday: 'short' }).format(new Date(checkoutStr))})
                    </>
                    }
                </Typography>
            </Grid>
            <Grid container flex={1} sx={{gap: 6}}>
                <Typography variant="body1" >
                    체크아웃
                </Typography>
                <Typography variant="body1" fontWeight={300}>
                    {data.checkout !== null && <>
                        {new Intl.DateTimeFormat('ko', { dateStyle: 'long' }).format(new Date(checkinStr))}
                        ({new Intl.DateTimeFormat('ko', { weekday: 'short' }).format(new Date(checkoutStr))})
                        </>
                    }
                </Typography>
            </Grid>
		</Grid>
		<Divider />
        <Grid container justifyContent="space-between" alignItems="center" sx={{ py:3}}>
            <Grid item flex={1}>
                <Typography variant="body1" >
                    게스트
                </Typography>
            </Grid>
            <Grid item flex={7}>
                <Typography variant="body1" fontWeight={300} sx={{flex: 1}}>
                    게스트 {data.numberOfGuests}명
                    {data.numberOfInfants !== 0 && `, 유아 ${data.numberOfInfants}명`}
                </Typography>
            </Grid>
		</Grid>
		<Divider />
        <Grid container justifyContent="space-between" alignItems="center" sx={{ py:3 }}>
            <Grid item flex={1}>
                <Typography variant="body1" >
                    주소
                </Typography>
            </Grid>
            <Grid item flex={7} sx={{display: 'flex', gap: 4}}>
                <Grid item flex={6}>
                    <Typography variant="body1" fontWeight={300} sx={{flex: 1}}>
                        {location!.state}
                    </Typography>
                    <Typography variant="body1" fontWeight={300} sx={{flex: 1}}>
                        {location!.city}
                    </Typography>
                    <Typography variant="body1" fontWeight={300} sx={{flex: 1}}>
                        {location!.street}
                    </Typography>
                </Grid>
                <Grid item alignItems="center" flex={1} sx={{display: 'flex'}}>
                    <Typography variant="body1" fontWeight={300} 
                        onClick={() => setMapsOpen(true)}
                        sx={{flex: 1, textDecoration: 'underline', color: grey[600], cursor: 'pointer'}}>
                        약도
                    </Typography>
                </Grid>
                {mapsOpen && <MapsModal open={mapsOpen} onClose={setMapsOpen} data={data.productId} />}
            </Grid>
		</Grid>
		<Divider />
        <Grid container justifyContent="space-between" alignItems="center" sx={{ py:3 }}>
            <Grid item flex={1}>
                <Typography variant="body1" >
                    호스트
                </Typography>
            </Grid>
            <Grid item flex={7}>
                <Typography variant="body1" fontWeight={300} sx={{flex: 1}}>
                {data.productId.hostname?.split('@')[0]}
                </Typography>
            </Grid>
		</Grid>
		<Divider />
        <Grid container justifyContent="space-between" alignItems="center" sx={{ pt: 3, pb: 1 }}>
            <Grid item flex={1} sx={{display: 'flex', gap: 4}}>
                <Typography variant="body1" >
                    체크인
                </Typography>
            </Grid>
            <Grid item flex={7} sx={{display: 'flex', gap: 4}}>
                {diff && <>
                    <Typography variant="body1" fontWeight={300} sx={{flex: 1}}>
                        총 {diff}박
                    </Typography>
                    <Typography variant="body1" fontWeight={300} sx={{flex: 1}}>
                        ₩
                        {(data.productId!.price! * diff +
                        Math.ceil(data.productId!.price! * diff * 0.14)
                        ).toLocaleString()}
                    </Typography>
                </>}
            </Grid>
		</Grid>
    </Grid>)
}