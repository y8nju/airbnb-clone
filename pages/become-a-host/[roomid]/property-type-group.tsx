import { Grid } from "@mui/material";
import { Types } from "mongoose";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import ListItem from "../../../component/room/listItem";
import { useCtx } from "../../../context/context";
import { HostingType } from "../../../interface/hostingType";
import PropertyType from "../../../interface/propertyType";
import { createAndUpdateListing, getHostingList, getPropertyGroupList } from "../../../lib/api/propertyApi";

export default function roomPropertyTypeGroup ({propertyGroup}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [group, setGroup] = useState<string>('');
    const router = useRouter();
    const { roomid } = router.query;
    const {data: session} = useSession();
    const layoutCtx = useContext(HalfLayoutContext);
    const {setNextBtnDisabled, nextBtnDisabled, roomStep, progressPer, savedData} = layoutCtx!;

    useEffect(() => {
        if(savedData) {
            setGroup(savedData.group as string);
        }
    }, [savedData])
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
            step: roomStep,
			_id: new Types.ObjectId(roomid as string),
        }
        const rst = await createAndUpdateListing(newListingData);
        if(rst && rst.result) {
            const data = rst.data as HostingType;
            const group = data.group
            const path = `/become-a-host/${String(roomid)}/property-type`
            router.push(path+`?group=${group}`, path);
        } else {
            console.log('???????????? ??????????????? ???????????? ???????????????')
        }
    };
    const saveHandle = () =>{
		if(!nextBtnDisabled) {
			nextStepHandle;
		} else {
			return;
		}
	}

    return ( <RightInner footerShow={true} headerShow={true} >
        <><HalfHeader saveHandle={saveHandle} />
        <Grid container direction="column" spacing={2} sx={{px: 6, width: 1, mt: 1, ml: 0, animation: 'fadein 1s'}}>
            <Head>
                <title>?????? ?????? ?????? - ???????????????</title>
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

// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await getHostingList();
//     const paths = res.datas.map((one: { _id: any; }) => {
//         return {
//             params: {
//                 roomid: one._id
//             }
//         }
//     })
//     return {
//         paths: paths,
//         fallback: true
//     }
// }

export const getServerSideProps: GetServerSideProps<{propertyGroup: PropertyType[]}> = async (context) => {
    const propertyGroup = await getPropertyGroupList();
    return {
        props: {
            propertyGroup
        }
    }
}