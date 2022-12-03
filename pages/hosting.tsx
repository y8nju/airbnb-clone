import Head from "next/head"
import { Button, Grid, Typography } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import dbConnect from "../lib/dbConnect";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Hosting from "../lib/models/hosting";
import ListingItem from "../component/card/listingItem";
import { HostingType } from "../interface/hostingType";
import Link from "next/link";

export default function HostingPage({hostings}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {data: session} = useSession();
    return (<>
        <Head>
            <title>호스트 알림판</title>
        </Head>
        <Grid container direction="column" minHeight="77vh">
            <Grid container>
                <Grid container justifyContent="space-between" alignItems="flex-end" sx={{py: 3}}>
                    <Typography variant="h4" fontWeight={600}>
                        {session?.user?.name}님, 안녕하세요!
                    </Typography>
                    <Link href="/become-a-host">
                        <Button color="info" sx={{textDecoration: 'underline'}}>숙소 등록하기</Button>
                    </Link>
                </Grid>
                <Grid container sx={{mt: 4}} spacing={3}>
                    {hostings && hostings.map((item: HostingType) => {
                        return <ListingItem key={String(item._id)} data={item} />
                    })}
                </Grid>
            </Grid>
        </Grid>
    </>)
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    await dbConnect();
    const session = await getSession(context);
    const hostings = await Hosting.find({hostname: session?.user?.email, step: 11 });

    return {
        props: {
        hostings: JSON.parse(JSON.stringify(hostings)),
        },
    };
};

HostingPage.layout = 'bookType'