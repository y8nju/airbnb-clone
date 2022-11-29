import { GetServerSideProps } from "next";
import { Grid, Typography } from "@mui/material";
import Head from "next/head";
import Booking from "../../../lib/models/booking";
import { getBookingData } from "../../../lib/api/bookApi";
import { PopulateBookingType } from "../../../interface/bookingType";
import dbConnect from "../../../lib/dbConnect";
import BookAside from "../../../component/bookSubmit/bookAside";
import BookInfo from "../../../component/bookSubmit/bookInfo";

export type BookData = {
  productId?: string;
  checkin?: Date | null;
  checkout?: Date | null;
  numberOfGuests?: number;
  numberOfAdults?: number;
  numberOfChildren?: number;
};

export default function BookSubmit({ data }: { data: PopulateBookingType }) {
  return (
    <>
      <Head>
        <title>예약 확인</title>
      </Head>
      
      <Grid container direction="column" minHeight="77vh" sx={{ mt: 3 }}>
        <Grid item>
          <Typography variant="h4" fontWeight={600}>
            예약 확인
          </Typography>
        </Grid>
        <Grid container sx={{ py: 3}}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={8} sx={{py: 3}}>
              <BookInfo data={data} />
            </Grid>
            <Grid item md={4} xs={12} position="relative">
              <BookAside data={data} />
            </Grid>
        </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await dbConnect();
  const { id } = ctx.query;
  const response = await getBookingData(id as string);
  if (!response) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: response.datas,
    },
  };
};

BookSubmit.layout = 'bookType'