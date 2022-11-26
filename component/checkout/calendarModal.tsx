import { Box, Container, Paper, Typography, TextField, Grid, IconButton } from "@mui/material";
import styled from '@mui/material/styles/styled';
import { useContext, useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { grey } from '@mui/material/colors';
import { BookingContext } from "../../context/bookingContext";
import CalendarStatic from "../detail/calendar/calendarStatic";
import CloseIcon from '@mui/icons-material/Close';

const StyleInput = styled(TextField) ({
	'& fieldset': {
		flex: 1,
		height: '56px',
		borderRadius: "0px",
		alignItems: "start",
		border: `1px solid ${grey[400]}`,
		top: 0
	},
	'&:first-of-type fieldset': {
	  borderTopLeftRadius: '8px',
	  borderTopRightRadius: '0',
	  borderBottomLeftRadius: '8px',
	  borderBottomRightRadius: 0,
	  borderRightWidth: 0
	},
	'&:last-of-type fieldset': {
	  borderTopLeftRadius: 0,
	  borderTopRightRadius: '8px',
	  borderBottomLeftRadius: 0,
	  borderBottomRightRadius: '8px',
	  borderLeftWidth: 0
	},
	'& .MuiInputBase-formControl:hover fieldset': {
	  borderColor: grey[400],
	  backgroundColor: 'transparent;'
	},
	'&:first-of-type fieldset .MuiInputBase-formControl.Mui-focused fieldset': {
		borderRightWidth: 2
	},
	'&:last-of-type fieldset .MuiInputBase-formControl.Mui-focused fieldset': {
		borderLeftWidth: 2
	},
	'& .MuiInputBase-formControl.Mui-focused fieldset': {
		borderRadius: '8px',
		borderWidth: 2,
		borderColor: grey[800]
	},
	'& .MuiInputLabel-formControl': {
		fontSize: '12px',
		top: '19px',
		left: '6px', 
		color: '#424242'
	}, 
	'& .MuiOutlinedInput-input': {
		padding: '26px 20px 9px',
		fontSize: '14px'
	},
	'& legend': {
		display: 'none'
	}
  })

export default function CalendarModal() {
	const [inpFocus, setInpFocus] = useState<boolean>(false);
	const bookingCtx = useContext(BookingContext);
	const {bookingData, closeDialog} = bookingCtx!;

	return ( <Grid container justifyContent="center" alignItems="center"
        width="100vw" height="100vh" position="fixed" zIndex={10} top={0} left={0}>
        <Grid container width="100%" height="100%" position="fixed" zIndex={1} top={0} left={0}
            onClick={() => closeDialog()}
            sx={{backgroundColor: '#00000080'}}></Grid>
        <Paper
            elevation={10}
            sx={{ width: 'min-content', position: "fixed", padding: "16px 24px", zIndex: 3}}
            onClick={(evt) => evt.stopPropagation()}>
            <Grid sx={{mb: 1}}>
                <IconButton color="info" size="small"
                    onClick={() => closeDialog()}
                    sx={{ml: '-5px'}}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Box>
                    {bookingData.checkin && bookingData.checkout ? (<>
                        <Typography variant="h5">
                            {differenceInCalendarDays(bookingData.checkout as Date, bookingData.checkin as Date)}박
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {format(bookingData.checkin as Date, "yyyy년 MM월 dd일")} ~
                            {format(bookingData.checkout as Date, "yyyy년 MM월 dd일")}
                        </Typography> 
                    </>) : (<>
                        <Typography variant="h5">날짜 선택</Typography>
                        <Typography variant="body2" color="text.secondary">
                            여행 날짜를 입력하여 정확한 요금을 확인하세요.
                        </Typography>
                    </>)}
                        
                    </Box>
                </Grid>
                <Grid item md={6} position="relative">
                    <Grid container position="absolute" zIndex={0}
                        sx={{width: 'calc(100% - 16px)', height: '56px', borderRadius: '8px', border: 1, borderColor: grey[400]}}>
                        <Grid flex={1}
                            sx={[!inpFocus && {borderRight: 1, borderRightColor: grey[400]}]}></Grid>
                        <Grid flex={1}></Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <StyleInput
                            color="info"
                            size="medium"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="체크인"
                            value={ bookingData.checkin ? format(bookingData.checkin as Date, "yyyy-MM-dd") : "" }
                            onFocus={() => setInpFocus(true)}
                            onBlur={() => setInpFocus(false)}
                            placeholder={"YYYY-MM-DD"}/>
                        <StyleInput
                            color="info"
                            size="medium"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="체크아웃"
                            disabled={!bookingData.checkin && true}
                            value={ bookingData.checkout ? format(bookingData.checkout as Date, "yyyy-MM-dd"): "" }
                            onFocus={() => setInpFocus(true)}
                            onBlur={() => setInpFocus(false)}
                        placeholder={"YYYY-MM-DD"}/>
                    </Box>
                </Grid>
            </Grid>
            <CalendarStatic saved={true} />
        </Paper>
	</Grid>);
}