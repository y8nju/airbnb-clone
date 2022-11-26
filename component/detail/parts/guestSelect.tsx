import { Box, Button, Paper, Typography, TextField, Grid, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { BookingContext } from "../../../context/bookingContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function GuestSelect(props: {guest: number}) {    
	const bookingCtx = useContext(BookingContext);
    const {bookingData, updateData, closeSelectOpen} = bookingCtx!

    return(<Paper
        elevation={10}
		sx={{ position: "absolute", width: '100%', padding: "16px 24px", zIndex: 3}}
		onClick={(evt) => evt.stopPropagation()}>
		<Grid container width="100vw" height="100vh" position="fixed" zIndex={-1} top={0} left={0}
		onClick={() => closeSelectOpen()}></Grid>
        <Grid container spacing={2}>
            <Grid item justifyContent="space-between" sx={{display: 'flex', width: 1}}>
                <Grid item>
                    <Typography variant="body1">성인</Typography>
                    <Typography variant="body2">만 13세 이상</Typography>
                </Grid>
                <Grid item alignItems="center" sx={{display: 'flex'}} >
                    <IconButton
                        color="info"
                        size="small"
                        onClick={() => updateData({
                            numberOfAdults: bookingData.numberOfAdults! - 1,
                            numberOfGuests: bookingData.numberOfGuests! - 1
                        })}
                        disabled={bookingData.numberOfAdults! <= 1}
                        sx={{border: 1, p: 0.5}}>
                        <RemoveIcon sx={{fontSize: '12px'}} />
                    </IconButton>
                    <Typography variant="body1" minWidth={32}textAlign="center">
                        {bookingData.numberOfAdults}
                    </Typography>
                    <IconButton
                        color="info"
                        size="small"
                        onClick={() => updateData({
                            numberOfAdults: bookingData.numberOfAdults! + 1,
                            numberOfGuests: bookingData.numberOfGuests! + 1
                        })}
                        disabled={bookingData.numberOfAdults! + bookingData.numberOfChildren! == props.guest}
                        sx={{border: 1, p: 0.5}}>
                        <AddIcon sx={{fontSize: '12px'}} />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item justifyContent="space-between" sx={{display: 'flex', width: 1}}>
                <Grid item>
                    <Typography variant="body1">어린이</Typography>
                    <Typography variant="body2">만 2~12세</Typography>
                </Grid>
                <Grid item alignItems="center" sx={{display: 'flex'}} >
                    <IconButton
                        color="info"
                        size="small"
                        onClick={() => updateData({
                            numberOfChildren: bookingData.numberOfChildren! - 1,
                            numberOfGuests: bookingData.numberOfGuests! - 1
                        })}
                        disabled={bookingData.numberOfChildren! <= 0}
                        sx={{border: 1, p: 0.5}}>
                        <RemoveIcon sx={{fontSize: '12px'}} />
                    </IconButton>
                    <Typography variant="body1" minWidth={32}textAlign="center">
                        {bookingData.numberOfChildren}
                    </Typography>
                    <IconButton
                        color="info"
                        size="small"
                        onClick={() => updateData({
                            numberOfChildren: bookingData.numberOfChildren! + 1,
                            numberOfGuests: bookingData.numberOfGuests! + 1
                        })}
                        disabled={bookingData.numberOfAdults! + bookingData.numberOfChildren! == props.guest}
                        sx={{border: 1, p: 0.5}}>
                        <AddIcon sx={{fontSize: '12px'}} />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item justifyContent="space-between" sx={{display: 'flex', width: 1}}>
                <Grid item>
                    <Typography variant="body1">유아</Typography>
                    <Typography variant="body2">만 2세 미만</Typography>
                </Grid>
                <Grid item alignItems="center" sx={{display: 'flex'}} >
                    <IconButton
                        color="info"
                        size="small"
                        onClick={() => updateData({numberOfInfants: bookingData.numberOfInfants! - 1})}
                        disabled={bookingData.numberOfInfants! <= 0}
                        sx={{border: 1, p: 0.5}}>
                        <RemoveIcon sx={{fontSize: '12px'}} />
                    </IconButton>
                    <Typography variant="body1" minWidth={32}textAlign="center">
                        {bookingData.numberOfInfants}
                    </Typography>
                    <IconButton
                        color="info"
                        size="small"
                        onClick={() => updateData({numberOfInfants: bookingData.numberOfInfants! + 1})}
                        disabled={bookingData.numberOfInfants! >= 5}
                        sx={{border: 1, p: 0.5}}>
                        <AddIcon sx={{fontSize: '12px'}} />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item justifyContent="space-between" sx={{display: 'flex', width: 1}}>
                <Typography variant="caption">
                이 숙소의 최대 숙박 인원은 10명(유아 포함)입니다. 반려동물 동반은 허용되지 않습니다.
                </Typography>
            </Grid>
            <Grid item justifyContent="flex-end" sx={{display: 'flex', width: 1}}>
            <Button
                variant="text"
                color="info"
                onClick={() => closeSelectOpen()}
                sx={{textDecoration: 'underline', mr: -2}}>
                닫기</Button>
            </Grid>
        </Grid>
    </Paper>)
}