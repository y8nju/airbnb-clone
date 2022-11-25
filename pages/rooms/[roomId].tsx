import { GetServerSideProps } from "next";
import dbConnect from "../../lib/dbConnect";
import Hosting from "../../lib/models/hosting";
import { Box, Container } from "@mui/material";
import DetailMainHeader from "../../component/detail/detailMainHeader";
import DetailMainPhotos from "../../component/detail/detailMainPhotos";
import DetailMainContents from "../../component/detail/detailMainContents";
import Head from "next/head";
import { HostingType } from "../../interface/hostingType";
import { getHostingList } from "../../lib/api/propertyApi";
import { useEffect, useState, createContext } from "react";
import DetailMainMaps from "../../component/detail/detailMainMaps";
import { addDays } from "date-fns";


export type Booking = {
  productId?: string;
  checkin?: Date | null;
  checkout?: Date | null;
  numberOfGuests?: number;
  numberOfAdults?: number;
  numberOfChildren?: number;
};
export const BookingContext = createContext<{
  bookingData: Booking;
  updateData: (frag: Booking) => void;
  isOpened: boolean;
  openDialog: () => void;
  closeDialog: () => void;
} | null>(null);
export default function HostingRoomDetail({ data }: { data: HostingType }) {
  const [booking, setBooking] = useState<Booking>({
    productId: data._id!.toString(),
    checkin: addDays(new Date(), 1),
    checkout: addDays(new Date(), 4),
    numberOfGuests: 2,
    numberOfAdults: 2,
    numberOfChildren: 0,
  });
  const [isOpened, setOpened] = useState(false);
  
  const openDialog = () => setOpened(true);
  const closeDialog = () => setOpened(false);
  const updateData = (frag: Booking) => {
    setBooking((tp) => ({ ...tp, ...frag }));
  };

  return (
    <>
      <Head>
        <title>{data.title} - 에어비앤비</title>
      </Head>
      <BookingContext.Provider
        value={{
          bookingData: booking,
          updateData: updateData,
          isOpened,
          openDialog,
          closeDialog,
        }}
      >
      {data && <Box onClick={() => closeDialog()}>
      <Container maxWidth="lg" sx={{ position: "relative", pt: 1, py: 3 }}>
        <DetailMainHeader data={data} />
        <DetailMainPhotos data={data} />
        <DetailMainContents data={data} />
        <DetailMainMaps data={data} />
      </Container>
      </Box>}
      </BookingContext.Provider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await dbConnect();
  const { roomId } = ctx.query;
  const data = await getHostingList(roomId as string);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: data.datas
    },
  };
};

HostingRoomDetail.layout = 'detailType'