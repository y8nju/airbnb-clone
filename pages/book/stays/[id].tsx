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

export default function StayCheckout({ data }: { data: HostingType }) {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <Head>
        <title>{data.title} - 에어비앤비</title>
      </Head>
      <Grid container  sx={{ mt: 3 }}>
        <StayHedaer />
        <StayMain data={data} />
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await dbConnect();
  const { id } = ctx.query;

  const data = await Hosting.findById(id);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};


StayCheckout.layout = 'bookType'