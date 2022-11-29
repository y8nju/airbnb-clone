import { GetServerSideProps } from "next";
import dbConnect from "../../lib/dbConnect";
import { Box, Container } from "@mui/material";
import DetailMainHeader from "../../component/detail/detailMainHeader";
import DetailMainPhotos from "../../component/detail/detailMainPhotos";
import DetailMainContents from "../../component/detail/detailMainContents";
import Head from "next/head";
import { HostingType } from "../../interface/hostingType";
import { getHostingList } from "../../lib/api/propertyApi";
import DetailMainMaps from "../../component/detail/detailMainMaps";
import { BookingContextProvider } from "../../context/bookingContext";

const HeadTitle = ({title}: {title: string}) => {
  return (
      <Head>
          <title>{title} - 에어비앤비</title>
      </Head>
  )
}
export default function HostingRoomDetail({ data }: { data: HostingType }) {
  return (
    <>
      <HeadTitle title={data.title! as string} />
      <BookingContextProvider data={data}>
      <Container maxWidth="lg" sx={{ position: "relative", pt: 1, py: 3 }}>
        <DetailMainHeader data={data} />
        <DetailMainPhotos data={data} />
        <DetailMainContents data={data} />
        <DetailMainMaps data={data} />
      </Container>
      </BookingContextProvider>
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