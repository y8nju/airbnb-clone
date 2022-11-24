import { useContext, useState } from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import { Card, CardContent, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { HostingType } from "../../interface/hostingType";
import { BookingContext } from "../../pages/rooms/[roomId]";
import { differenceInCalendarDays, format } from "date-fns";
import CalendarModal from "./calendar/calendarModal";
import { grey } from '@mui/material/colors';
import styled from '@mui/material/styles/styled';

const gradientBg = {backgroundImage: 'radial-gradient(circle at center center, rgb(255, 56, 92) 0%, rgb(230, 30, 77) 27.5%, rgb(227, 28, 95) 40%, rgb(215, 4, 102) 57.5%, rgb(189, 30, 89) 75%, rgb(189, 30, 89) 100%)',
    backgroundSize: '200% 200%'}
const StyleButton = styled(Button) ({
  '&': {
    flex: 1,
    height: '56px',
    borderRadius: "0px",
    alignItems: "start",
    borderColor: grey[400]
  },
  '&:first-of-type': {
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0
  },
  '&:last-of-type': {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    borderTopColor: 'transparent'
  },
  '&:hover': {
    borderColor: grey[400],
    backgroundColor: 'transparent;'
  },
  '&:last-of-type:hover': {
    borderTopColor: 'transparent'
  },
  '&:active': {
    borderRadius: '8px',
    borderWidth: 2,
    borderColor: grey[800]
  },
  '&:last-of-type:active': {
    borderTopColor: grey[800]
  }
})

export default function DetailRightContents({ data }: { data: HostingType }) {
	const bookingCtx = useContext(BookingContext);
	const {bookingData, openDialog, isOpened} = bookingCtx!;

  return (
    <>
      <Grid container position="sticky" top={0} sx={{py: 3}}>
        <Card sx={{ width: 1, margin: "auto", px: 1, overflow: 'visible' }}>
          <CardContent>
            <Box sx={{mb: 2}}>
              {bookingData.checkin && bookingData.checkout ? <>
                <Typography component={"span"} variant={"h5"} fontWeight={500}>
                  ₩{data.price!.toLocaleString()}
                </Typography>
                <Typography component={"span"}> /박</Typography></> :
                <>
                <Typography component={"span"} variant={"h5"} fontWeight={300}>
                  요금을 확인하려면 날짜를 입력하세요.
                </Typography>
              </>}
            </Box>
            <Box sx={{ mb: 2, borderRadius: '8px', position: 'relative'}}
              onClick={(evt) => evt.stopPropagation()}>
              <Box sx={{width: '100%', height: '100%', position: 'absolute', zIndex: 0, borderRadius: '8px', border: 1, borderColor: grey[400]}}></Box>
              <Box>
                <StyleButton
                  fullWidth
                  variant="outlined"
                  color="info"
                  size="large"
                  onClick={() => openDialog()}
                  sx={{dispaly: 'flex'}}>
                  <Grid item flex={1} direction="column" justifyContent="center" alignItems="flex-start" 
                    sx={{display: 'flex', padding: '10px 21px', borderRight: `1px solid ${grey[400]}`}}>
                    <Typography sx={{fontSize: '10px'}}>체크인</Typography>
                    <Typography variant="body2">
                      {bookingData.checkin
                        ? format(bookingData.checkin, "yyyy-MM-dd")
                        : "날짜추가"}
                    </Typography>
                  </Grid>
                  <Grid item flex={1} direction="column" justifyContent="center" alignItems="flex-start" 
                    sx={{display: 'flex', padding: '10px 21px' }}>
                    <Typography sx={{fontSize: '10px'}}>체크아웃</Typography>
                    <Typography variant="body2">
                      {bookingData.checkout
                        ? format(bookingData.checkout, "yyyy-MM-dd")
                        : "날짜추가"}
                    </Typography>
                  </Grid>
                </StyleButton>
                <StyleButton
                  fullWidth
                  variant="outlined"
                  color="info"
                  size="large"
                  sx={{flexDirection: "column"}}>
                  <Typography sx={{fontSize: '10px'}}>인원</Typography>
                  <Typography variant="body2">
                    게스트 {bookingData.numberOfGuests}명
                  </Typography>
                </StyleButton>
              </Box>
              {isOpened && <CalendarModal />}
            </Box>
            <Box sx={{ mb: 1 }}>
              <Button variant="contained" fullWidth size="large" sx={gradientBg}>
                {bookingData.checkin && bookingData.checkout ? '예약하기' : '예약 가능 여부 보기'}
              </Button>
            </Box>
            {bookingData.checkin && bookingData.checkout &&<>
              <Box sx={{mb:2}}>
                <Typography variant="body2" align="center">
                  예약 확정 전에는 요금이 청구되지 않습니다.
                </Typography>
              </Box>
              <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontWeight={300}>
                  ₩{data!.price!.toLocaleString()} X 1박
                  </Typography>
                <Typography variant="body1" fontWeight={300}>
                  ₩{(data!.price! * 1).toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontWeight={300}>
                  서비스 수수료
                </Typography>
                <Typography variant="body1" fontWeight={300}>
                  ₩{Math.round(data!.price! * 1 * 0.14).toLocaleString()}
                </Typography>
              </Box>
              <Divider sx={{my: 2}} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontWeight={500}>
                  총합계
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  ₩
                  {(data!.price! * differenceInCalendarDays(bookingData.checkout, bookingData.checkin) +
                    Math.ceil(data!.price! * differenceInCalendarDays(bookingData.checkout, bookingData.checkin) * 0.14)
                  ).toLocaleString()}
                </Typography>
              </Box>
            </>}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
