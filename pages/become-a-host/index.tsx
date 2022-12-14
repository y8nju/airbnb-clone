import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HalfHeader from "../../component/layout/otherLayout/halfType/header";
import RightInner from "../../component/layout/otherLayout/halfType/rightInner";
import HostingButton from "../../component/room/hostingButton";
import { HostingType } from "../../interface/hostingType";
import { getHostingList } from "../../lib/api/propertyApi";
import dbConnect from "../../lib/dbConnect";
import Hosting from "../../lib/models/hosting";

export default function BecomeAHost ({hostingList}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [showAll, setShowAll] = useState<boolean>(false)
    const router = useRouter();
    const linkHandle = async (roomid: string) => {
        const rst = await getHostingList(roomid as string);
        const step = rst.datas.step;
        switch(step) {
            case 0: case 1: 
                router.push(`/become-a-host/${roomid}/property-type-group`);
                break;
            case 2:
                router.push(`/become-a-host/${roomid}/property-type`);
                break;
            case 3:
                router.push(`/become-a-host/${roomid}/privacy-type`);
                break;
            case 4:
                router.push(`/become-a-host/${roomid}/location`);
                break;
            case 5:
                router.push(`/become-a-host/${roomid}/floor-plan`);
                break;
            case 6:
                router.push(`/become-a-host/${roomid}/amenities`);
                break;
            case 7:
                router.push(`/become-a-host/${roomid}/photos`);
                break;
            case 8:
                router.push(`/become-a-host/${roomid}/title`);
                break;
            case 9:
                router.push(`/become-a-host/${roomid}/description`);
                break;
            case 10:
                router.push(`/become-a-host/${roomid}/price`);
                break;
            case 11:
                router.push(`/become-a-host/${roomid}/receipt`);
                break;
        }
    }
    useEffect(()=> {
        console.log('hostingList', hostingList);
    })
    
    return ( <RightInner footerShow={false} headerShow={true} >
        <>
        <HalfHeader />
        <Head>
            <title>????????? ???????????? - ???????????????</title>
        </Head>
        <Grid container direction="column" 
            sx={{gap: 3, px: 6, width: 1, mt: 1, ml: 0, animation: 'fadein 1s'}}>
            {hostingList.length > 0 && <Grid container direction="column">
                <Typography variant="h6" sx={{mb: 2}}>?????? ?????? ????????????</Typography>
                {hostingList.reverse().map((room: HostingType, index: number) => {
                    if(!showAll) {
                        if(index < 3) {
                            return <HostingButton
                                key={String(room._id)}
                                onClick={() => linkHandle(String(room._id))}
                                title={room.title ? room.title as string : room.group as string}
                                img={room.photos ? room.photos[0] : undefined}
                                type="room">
                            </HostingButton>
                        }
                    }else {
                        return <HostingButton
                            key={String(room._id)}
                            onClick={() => linkHandle(String(room._id))}
                            title={room.title ? room.title as string : room.group as string}
                            img={room.photos ? room.photos[0] : undefined}
                            type="room">
                        </HostingButton>
                    }
                })}
                {(!showAll && hostingList.length> 3) && <Box>
                    <Button onClick={() => setShowAll(true)}
                    size="small" color="info" sx={{p: 0, minWidth: 'fit-content'}}>?????? ??????</Button>
                </Box>}
            </Grid>}
            <Grid container direction="column">
                <Typography variant="h6" sx={{mb: 2}}>?????? ?????? ????????????</Typography>
                <HostingButton
                    onClick={() => router.push("/become-a-host/property-type-group")}
                    title="????????? ?????? ????????????"
                    type="add">
                </HostingButton>
            </Grid>
        </Grid> 
        </>
    </RightInner>)
}
BecomeAHost.layout = "halfType";

export const getServerSideProps: GetServerSideProps = async(context) => {
    await dbConnect();
    const session = await getSession(context);
    const response = await Hosting.find({hostname: session?.user?.email}).lean();
    const hostingList = JSON.parse(JSON.stringify(response));
    return {
        props: {
            hostingList
        }
    }
}