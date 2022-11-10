import { Button, Grid } from "@mui/material";
import { Types } from "mongoose";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import ListItem from "../../../component/room/listItem";
import PropertyType from "../../../interface/propertyType";
import { createAndUpdateListing, getPropertyGroupList } from "../../../lib/api/propertyApi";

interface List {
	property: string,
	description: string
}
export default function roomPropertyType () {
	const [list, setList] = useState<List[] | null>(null)
    const [group, setGroup] = useState<string>("");
	
    const router = useRouter();
    const listingGroup = router.query.group;
	console.log('listingGroup', router.query);

	useEffect(()=> {
        !(async () => {
            const rst = await  getPropertyGroupList(listingGroup as string);
            if(rst) {
                setList(rst[0]?.types)
            }
        })();
    }, []);

	const nextStepHandle = async () => {
        const { roomid } = router.query;
		const updateData = {
			_id: new Types.ObjectId(roomid as string),
			property: group
		}
        const rst = await createAndUpdateListing(updateData);
		console.log(rst)
		if(rst.result) {
			router.push('/become-a-host/'+ roomid +'/privacy-type');
		} else {
			console.log('데이터가 정상적으로 등록되지 않았습니다');
		}
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
        <Grid container direction="column" spacing={2} sx={{px: 6, width: 1, mt: 0, ml: 0}}>
			{list && list.map((item: List) => {
				return <ListItem title={item.property} subTitle={item.description} type="roomType" group={group} setGroup={setGroup} />
			})}
        </Grid>
        <HalfFooter progress={20} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
roomPropertyType.layout = "halfType";