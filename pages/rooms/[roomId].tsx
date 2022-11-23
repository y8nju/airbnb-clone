import { GetServerSideProps } from "next";
import dbConnect from "../../lib/dbConnect";
import Hosting from "../../lib/models/hosting";
import { Container } from "@mui/material";
import DetailMainHeader from "../../component/detail/detailMainHeader";
import DetailMainPhotos from "../../component/detail/detailMainPhotos";
import DetailMainContents from "../../component/detail/detailMainContents";
import Head from "next/head";
import { HostingType } from "../../interface/hostingType";
import { getHostingList } from "../../lib/api/propertyApi";
import { useEffect, useState } from "react";
import DetailMainMaps from "../../component/detail/detailMainMaps";


const appKey = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY;

export default function HostingRoomDetail({ data }: { data: HostingType }) {
  return (
    <>
      <Head>
        <title>{data.title} - 에어비앤비</title>
      </Head>
      {data && <Container maxWidth="xl" sx={{ position: "relative", pt: 1, py: 3 }}>
        <DetailMainHeader data={data} />
        <DetailMainPhotos data={data} />
        <DetailMainContents data={data} />
        <DetailMainMaps data={data} />
      </Container>}
      <></>
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