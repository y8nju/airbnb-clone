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

export default function StayMain({ data }: { data: PopulateBookingType }) {
  const router = useRouter();
  const {id} = router.query;
  const [newData, setNewData] = useState<PopulateBookingType>(data)
  const bookingCtx = useContext(BookingContext);
  const { updateData, savedData } = bookingCtx!
  useEffect(() => {
    if(data) {
      updateData({
        productId: data.productId!._id as Types.ObjectId,
        checkin: new Date(data.checkin!),
        checkout: new Date(data.checkout!),
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
          <StaySection data={newData} />
        </Grid>
        <Grid item md={4} xs={12} position="relative">
          <StayAside data={newData} />
        </Grid>
      </Grid>
    </Grid>
  );
}
