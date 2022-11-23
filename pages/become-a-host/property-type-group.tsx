import { Grid } from "@mui/material";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HalfFooter from "../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../component/layout/otherLayout/halfType/header";
import RightInner from "../../component/layout/otherLayout/halfType/rightInner";
import ListItem from "../../component/room/listItem";
import { useCtx } from "../../context/context";
import { HostingType } from "../../interface/hostingType";
import PropertyType from "../../interface/propertyType";
import { createAndUpdateListing, getPropertyGroupList } from "../../lib/api/propertyApi";

export default function roomPropertyTypeGroup ({propertyGroup}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [group, setGroup] = useState<string>('');
    const router = useRouter();
    const {data: session} = useSession();
    const layoutCtx = useContext(HalfLayoutContext);
    const {setNextBtnDisabled, roomStep, progressPer} = layoutCtx!;

    useEffect(()=> {
        if(group !== '') {
            setNextBtnDisabled(false)
        }
    }, [group])

    const nextStepHandle = async () => {
        setNextBtnDisabled(true)
        const newListingData = {
            hostname: session?.user?.email as string,
            group: group,
            step: roomStep
        }
        console.log(newListingData)
        const rst = await createAndUpdateListing(newListingData);
        if(rst && rst.result) {
            const data = rst.data as HostingType;
            const roomid = data._id;
            const group = data.group
            const path = `/become-a-host/${String(roomid)}/property-type`
            router.push(path+`?group=${group}`, path);
        } else {
            console.log('데이터가 정상적으로 등록되지 않았습니다')
        }
    };

    return ( <RightInner footerShow={true} headerShow={true} >
        <><HalfHeader saveHandle={nextStepHandle} />
        <Grid container direction="column" spacing={2} sx={{px: 6, width: 1, mt: 1, ml: 0, animation: 'fadein 1s'}}>
            <Head>
                <title>건물 종류 선택 - 에어비앤비</title>
            </Head>
            {propertyGroup && propertyGroup?.map((item) => {
                return <ListItem title={item.group} type="roomGroup" group={group} setGroup={setGroup}
                    key={String(item._id)}
                    image={item.image} id={String(item._id)}/>
            })}
        </Grid>
        <HalfFooter progress={progressPer(roomStep)} nextStepHandle={nextStepHandle} /></>
    </RightInner> )
}
roomPropertyTypeGroup.layout = "halfType";

export const getServerSideProps: GetServerSideProps<{propertyGroup: PropertyType[]}> = async (context) => {
    const response = await  getPropertyGroupList();
    const propertyGroup = response;
    return {
        props: {
            propertyGroup
        }
    }
}