import { Grid } from "@mui/material";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import ListItem from "../../../component/room/listItem";
import PropertyType from "../../../interface/propertyType";
import { getPropertyGroupList } from "../../../lib/api/propertyApi";

export default function roomPropertyTypeGroup (props: InferGetStaticPropsType<typeof getStaticProps>) {
    const [list, setList] = useState<PropertyType[] | null>(null)
    const [group, setGroup] = useState<string>("");
    
    const router = useRouter();
    const nextStepHandle = () => {
        const { itemId } = router.query;
        router.push("/become-a-host/" + itemId + "/privacy-type");
      };

    useEffect(()=> {
        !(async () => {
            const response = await  getPropertyGroupList();
            if(response?.result) {
                setList(response?.datas)
            }
            console.log(response);
        })()
    }, []);
    return ( <RightInner footerShow={true} headerShow={true} >
        <><HalfHeader />
        <Grid container direction="column" spacing={2} sx={{px: 6, width: 1, mt: 0, ml: 0}}>
            {list && list?.map((item) => {
                return <ListItem title={item.group} type="roomGroup" group={group} setGroup={setGroup}
                image={item.image} id={String(item._id)}/>
            })}
        </Grid>
        <HalfFooter progress={10} nextStepHandle={nextStepHandle} /></>
    </RightInner> )
}
roomPropertyTypeGroup.layout = "halfType";

// export const getStaticPath: GetStaticPaths = async (context) => {
//     // const roomId = String(Date.now());
//     return {
//         paths: [],
//         fallback: 'blocking'
//     }
// }

// export const getStaticProps: GetStaticProps<{propertyGroup: PropertyType[]}> = async (context) => {
//     const { roomid } = context.params as { roomid: string };
//     const propertyGroup: PropertyType[] = await  getPropertyGroupList();
//     return {
//         props: {
//             propertyGroup
//         },
//         revalidate: 20
//     }
// }