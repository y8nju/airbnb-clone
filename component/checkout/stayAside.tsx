import { Box, Typography, Divider, TextField } from "@mui/material";
import { Card, CardContent, Button } from "@mui/material";
import { useContext, useState } from "react";
import {  BookingContext } from "../../pages/rooms/[roomId]";
import { format, differenceInCalendarDays } from "date-fns";

import { useRouter } from "next/router";
import { HostingType } from "../../interface/hostingType";
import Grid from "@mui/material/Grid";

function StayAside({ data }: { data: HostingType }) {
  // const router = useRouter();
  // const bookingCtx = useContext(BookingContext);
  // const {bookingData, updateData, openDialog} = bookingCtx!;

  // let diff;
  // if (bookingData.checkin && bookingData.checkout) {
  //   diff = differenceInCalendarDays(bookingData.checkout as Date, bookingData.checkin as Date);
  // }
  // //console.log("diff=", diff);

  // const reserveHandle: React.MouseEventHandler = (evt) => {
  //   evt.stopPropagation();
  //   if (bookingCtx && bookingData.checkin && bookingData.checkout && bookingData.productId) {
  //     const params = new URLSearchParams();
  //     params.append("numberOfGuests", bookingData.numberOfGuests!.toString());
  //     params.append("numberOfAdults", bookingData.numberOfAdults!.toString());
  //     params.append(
  //       "numberOfChildren",
  //       bookingData.numberOfChildren!.toString()!
  //     );
  //     params.append("numberOfGuests", format(bookingData.checkin as Date, "yyyy-MM-dd"));
  //     params.append("numberOfGuests", format(bookingData.checkout as Date, "yyyy-MM-dd"));
  //     // console.log(params.toString());
  //     router.push(
  //       "/book/stays/" + bookingData.productId + "?" + params.toString()
  //     );
  //   } else {
  //     openDialog();
  //   }
  // };

  return (
    <>
      <Grid container position="sticky" top={0} sx={{py: 3}}>
        <Card elevation={0} 
          sx={{ width: 1, margin: "auto", px: 1, border: 1, borderColor: 'grey.300'}}>
          <CardContent>
            {/* <Box sx={{ mb: 1 }}>
              <Typography component={"span"} variant={"h6"}>
                ₩{data!.price!.toLocaleString()}
              </Typography>
              <Typography component={"span"}>/박</Typography>
            </Box>

            <Box sx={{ mb: 1 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={reserveHandle}
              >
                {bookingData.checkin && bookingData.checkout
                  ? "예약하기"
                  : "예약 가능 여부 보기"}
              </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography textAlign={"center"} variant="body2">
                예약 확정 전에는 요금이 청구되지 않습니다.
              </Typography>
            </Box>
            {diff && (
              <>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>
                    ₩{data.price!.toLocaleString()} X {diff}박
                  </Typography>
                  <Typography>
                    ₩{(data.price! * diff).toLocaleString()}{" "}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>서비스 수수료</Typography>
                  <Typography>
                    ₩{Math.round(data.price! * diff * 0.14).toLocaleString()}{" "}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                  }}
                >
                  <Typography>총합계</Typography>
                  <Typography>
                    ₩
                    {(
                      data.price! * diff +
                      Math.ceil(data.price! * diff * 0.14)
                    ).toLocaleString()}
                  </Typography>
                </Box>
              </>
            )} */}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default StayAside;
