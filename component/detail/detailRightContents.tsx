import { useContext, useState, useEffect } from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import { Card, CardContent, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { HostingType } from "../../interface/hostingType";
import { differenceInCalendarDays, format } from "date-fns";
import CalendarModal from "./calendar/calendarModal";
import { grey } from '@mui/material/colors';
import styled from '@mui/material/styles/styled';
import { useRouter } from "next/router";
import { BookingContext } from "../../context/bookingContext";
import { creatAndUpdateBooking } from "../../lib/api/bookApi";
import { BookingType } from "../../interface/bookingType";
import GuestSelect from "./parts/guestSelect";
import { useSession } from "next-auth/react";
import { ReservedPeriod } from "../../pages/rooms/[roomId]";

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
interface Props {
  data: HostingType,
  reserved: ReservedPeriod
}
export default function DetailRightContents({ data, reserved }: Props) {
  const router = useRouter()
	const bookingCtx = useContext(BookingContext);
	const {bookingData, openDialog, isOpened, openSelectOpen, isSelectOpend} = bookingCtx!;
  const {data: session} = useSession();
  let diff;
  if (bookingData.checkin && bookingData.checkout) {
    diff = differenceInCalendarDays(bookingData.checkout as Date, bookingData.checkin as Date);
  }

  const reserveHandle: React.MouseEventHandler = async (evt) => {
    evt.stopPropagation();
    if (bookingCtx && bookingData.checkin && bookingData.checkout && bookingData.productId) {
      const rst = await creatAndUpdateBooking({
        ...bookingData,
        guestId: session?.user?.email as string});
      console.log('????????????', rst)
      if(rst && rst.result) {
        console.log(rst)
        const rstData = rst.data as BookingType;
        const id = rstData._id;

        const params = new URLSearchParams();
        params.append("productId", String(rstData.productId));
        params.append("checkin", format(new Date(rstData!.checkin as Date), "yyyy-MM-dd"));
        params.append("checkout", format(new Date(rstData!.checkout as Date), "yyyy-MM-dd"));
        params.append("numberOfGuests", rstData.numberOfGuests!.toString());
        params.append("numberOfAdults", rstData.numberOfAdults!.toString());
        params.append("numberOfChildren",rstData.numberOfChildren!.toString());
        params.append("numberOfInfants", rstData.numberOfInfants!.toString());
        params.append("numberOfPets",rstData.numberOfPets!.toString());
      // console.log(params.toString());
        const path = "/book/stays/" + id
        router.push(path+ "?" + params.toString(), path);
      }else {
        console.log('???????????? ??????????????? ???????????? ???????????????')
      }
    } else {
      bookingCtx?.openDialog();
    }
  };

  return (
    <>
      <Grid container position="sticky" top={0} sx={{py: 3}}>
        <Card sx={{ width: 1, margin: "auto", px: 1, overflow: 'visible' }}>
          <CardContent>
            <Box sx={{mb: 2}}>
              {bookingData.checkin && bookingData.checkout ? <>
                <Typography component={"span"} variant={"h5"} fontWeight={500}>
                  ???{data.price!.toLocaleString()}
                </Typography>
                <Typography component={"span"}> /???</Typography></> :
                <>
                <Typography component={"span"} variant={"h5"} fontWeight={300}>
                  ????????? ??????????????? ????????? ???????????????.
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
                  <Grid item flex={1} justifyContent="center" alignItems="flex-start" 
                    sx={{display: 'flex',  flexDirection: 'column', padding: '10px 21px', borderRight: `1px solid ${grey[400]}`}}>
                    <Typography sx={{fontSize: '10px'}}>?????????</Typography>
                    <Typography variant="body2">
                      {bookingData.checkin
                        ? format(bookingData.checkin as Date, "yyyy-MM-dd")
                        : "????????????"}
                    </Typography>
                  </Grid>
                  <Grid item flex={1} justifyContent="center" alignItems="flex-start" 
                    sx={{display: 'flex',  flexDirection: 'column', padding: '10px 21px' }}>
                    <Typography sx={{fontSize: '10px'}}>????????????</Typography>
                    <Typography variant="body2">
                      {bookingData.checkout
                        ? format(bookingData.checkout as Date, "yyyy-MM-dd")
                        : "????????????"}
                    </Typography>
                  </Grid>
                </StyleButton>
                <StyleButton
                  fullWidth
                  variant="outlined"
                  color="info"
                  size="large"
                  onClick={() => openSelectOpen()}
                  sx={{flexDirection: "column"}}>
                  <Typography sx={{fontSize: '10px'}}>??????</Typography>
                  <Typography variant="body2">
                    ????????? {bookingData.numberOfGuests}??? 
                    {bookingData.numberOfInfants !== 0 && `, ?????? ${bookingData.numberOfInfants}???`}
                  </Typography>
                </StyleButton>
              </Box>
              {isOpened && <CalendarModal  reserved={reserved} />}
              {isSelectOpend && <GuestSelect guest={data.floorPlan?.guests!} />}
            </Box>
            <Box sx={{ mb: 1 }}>
              <Button variant="contained" fullWidth size="large"
                disabled={!session}
                onClick={reserveHandle}
                sx={session && gradientBg}>
                {bookingData.checkin && bookingData.checkout ? '????????????' : '?????? ?????? ?????? ??????'}
              </Button>
            </Box>
            {diff &&<>
              <Box sx={{mb:2}}>
                <Typography variant="body2" align="center">
                  ?????? ?????? ????????? ????????? ???????????? ????????????.
                </Typography>
              </Box>
              <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontWeight={300}>
                  ???{data!.price!.toLocaleString()} X {diff}???
                  </Typography>
                <Typography variant="body1" fontWeight={300}>
                  ???{(data!.price! * diff).toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontWeight={300}>
                  ????????? ?????????
                </Typography>
                <Typography variant="body1" fontWeight={300}>
                  ???{Math.round(data!.price! * diff * 0.14).toLocaleString()}
                </Typography>
              </Box>
              <Divider sx={{my: 2}} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontWeight={500}>
                  ?????????
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  ???
                  {(data!.price! * diff +
                    Math.ceil(data!.price! * diff * 0.14)
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
