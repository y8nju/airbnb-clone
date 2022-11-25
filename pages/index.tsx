import { Container, Grid } from "@mui/material";
import { GetServerSideProps } from "next";
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import HostingPreviewItem from "../component/card/hostingPreviewItem";
import { HostingType } from "../interface/hostingType";
import dbConnect from "../lib/dbConnect";
import Hosting from "../lib/models/hosting";
import styles from '../styles/Home.module.css'

export default function Home({ hostings }: { hostings: HostingType[] }) {

  return (<>
    <Head>
      <title>여행은 살아보는 거야 - 에어비앤비</title>
    </Head>
    <Container maxWidth="xl">
      <Grid container spacing={2} >
      {hostings.map((one) => (
        <Grid
          item
          lg={2}
          md={3}
          sm={6}
          xs={12}
          key={one._id as unknown as string}
        >
          <HostingPreviewItem hosting={one} />
        </Grid>
      ))}
    </Grid>
  </Container>
  </>)
}
export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const hostings = await Hosting.find({ step: 11 });

  return {
    props: {
      hostings: JSON.parse(JSON.stringify(hostings)),
    },
  };
};

Home.layout = "defaultType";