import {useEffect} from 'react';
import { GetServerSideProps } from "next";
import { Box, tablePaginationClasses } from "@mui/material";

import Head from "next/head";
import StayHedaer from "../../../component/checkout/stayHeader";
import StayMain from "../../../component/checkout/stayMain";
import dbConnect from "../../../lib/dbConnect";
import Hosting from "../../../lib/models/hosting";
import { HostingType } from "../../../interface/hostingType";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { BookingContextProvider } from "../../../context/bookingContext";
import { getBookingData } from "../../../lib/api/bookApi";
import { BookingType, PopulateBookingType } from "../../../interface/bookingType";
import Booking from '../../../lib/models/booking';
import { ReservedPeriod } from '../../rooms/[roomId]';

interface Props {
  data: PopulateBookingType
  reserved: ReservedPeriod
}
export default function StayCheckout({ data, reserved }: Props) {
  console.log('data', data);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>예약 요청</title>
      </Head>
      <BookingContextProvider data={data.productId}>
        <Grid container  sx={{ mt: 3 }}>
          <StayHedaer />
          <StayMain data={data} reserved={reserved} />
        </Grid>
      </BookingContextProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await dbConnect();
  const { id } = ctx.query;

  const response = await getBookingData(id as string);
  const roomId = response.datas.productId.productId;
  const reserved = await Booking.find(
    {productId: roomId, result: 'true'}, 'checkin checkout '
  )
  if (!response) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: response.datas,
      reserved: JSON.parse(JSON.stringify(reserved))
    },
  };
};


StayCheckout.layout = 'bookType'