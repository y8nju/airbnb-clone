import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HalfHeader from "../../component/layout/otherLayout/halfType/header";
import RightInner from "../../component/layout/otherLayout/halfType/rightInner";
import HostingButton from "../../component/room/hostingButton";
import { HostingType } from "../../interface/hostingType";
import { getHostingList } from "../../lib/api/propertyApi";

export default function BecomeAHost ({hostingList}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [showAll, setShowAll] = useState<boolean>(false)
    const router = useRouter();
    const linkHandle = async (roomid: string) => {
        const rst = await getHostingList(roomid as string);
        const step = rst.datas.step;
        switch(step) {
            case 1: 
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
            <title>호스팅 시작하기 - 에어비앤비</title>
        </Head>
        <Grid container direction="column" 
            sx={{gap: 3, px: 6, width: 1, mt: 1, ml: 0, animation: 'fadein 1s'}}>
            {hostingList.length > 0 && <Grid container direction="column">
                <Typography variant="h6" sx={{mb: 2}}>숙소 등록 완료하기</Typography>
                {hostingList.reverse().map((room: HostingType, index: number) => {
                    console.log(room)
                    if(!showAll) {
                        if(index < 3) {
                            return <HostingButton
                                key={String(room._id)}
                                onClick={() => linkHandle(String(room._id))}
                                title={room.title ? room.title : room.group}
                                img={room.photos ? room.photos[0] : undefined}
                                type="room">
                            </HostingButton>
                        }
                    }else {
                        return <HostingButton
                            key={String(room._id)}
                            onClick={() => linkHandle(String(room._id))}
                            title={room.title ? room.title : room.group}
                            img={room.photos ? room.photos[0] : undefined}
                            type="room">
                        </HostingButton>
                    }
                })}
                {(!showAll && hostingList.length> 3) && <Box>
                    <Button onClick={() => setShowAll(true)}
                    size="small" color="info" sx={{p: 0, minWidth: 'fit-content'}}>모두 보기</Button>
                </Box>}
            </Grid>}
            <Grid container direction="column">
                <Typography variant="h6" sx={{mb: 2}}>숙소 등록 시작하기</Typography>
                <HostingButton
                    onClick={() => router.push("/become-a-host/property-type-group")}
                    title="새로운 숙소 등록하기"
                    type="add">
                </HostingButton>
            </Grid>
        </Grid> 
        </>
    </RightInner>)
}
BecomeAHost.layout = "halfType";

export const getStaticProps: GetStaticProps = async(context) => {
    const response = await getHostingList();
    const hostingList = response.datas;
    return {
        props: {
            hostingList
        },
        revalidate: 20
    }
}