import { useContext, useState, useEffect } from "react";
import { Box, Grid, Button, Typography, Avatar, Divider } from "@mui/material";
import StaySection from "./staySection";
import StayAside from "./stayAside";
import { BookingContext } from "../../context/bookingContext";
import { PopulateBookingType } from "../../interface/bookingType";
import dbConnect from "../../lib/dbConnect";
import { useRouter } from "next/router";
import { getBookingData } from "../../lib/api/bookApi";
import { Types } from "mongoose";
import { ReservedPeriod } from "../../pages/rooms/[roomId]";
import { useSession } from "next-auth/react";

interface Props {
  data: PopulateBookingType
  reserved: ReservedPeriod
}

export default function StayMain({ data, reserved }: Props) {
  const router = useRouter();
  const {id} = router.query;
  const {data: session} = useSession();
  const [newData, setNewData] = useState<PopulateBookingType>(data)
  const bookingCtx = useContext(BookingContext);
  const { updateData, savedData } = bookingCtx!
  useEffect(() => {
    if(data) {
      updateData({
        guestId: session?.user?.email as string,
        productId: data.productId!._id as Types.ObjectId,
        checkin: new Date(data.checkin!.toString().slice(0, 10)),
        checkout: new Date(data.checkout!.toString().slice(0, 10)),
        numberOfGuests: data.numberOfGuests!,
        numberOfAdults: data.numberOfAdults!,
        numberOfChildren: data.numberOfChildren!,
        numberOfInfants: data.numberOfInfants!,
        numberOfPets: data.numberOfPets!
      })
    }
  }, []);
  useEffect(() => {
    !(async () => {
      const response = await getBookingData(id as string);
      if(response) {
        setNewData(response.datas)
      }
    })();
  }, [savedData])
  return (
    <Grid container sx={{ py: 3 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8} sx={{py: 3}}>
          <StaySection data={newData} reserved={reserved} />
        </Grid>
        <Grid item md={4} xs={12} position="relative">
          <StayAside data={newData} />
        </Grid>
      </Grid>
    </Grid>
  );
}
