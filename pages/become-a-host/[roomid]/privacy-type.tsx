import { Button, Grid } from "@mui/material";
import { Types } from "mongoose";
import { useRouter } from "next/router";
import { useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import ListItem from "../../../component/room/listItem";
import { createAndUpdateListing } from "../../../lib/api/propertyApi";

const PrivacyType = ['공간전체', '개인실', '다인실']
export default function RoomPrivacyType () {
    const [group, setGroup] = useState<string>("");
    const router = useRouter()
    const {roomid} = router.query;

	const nextStepHandle = async () => {
		console.log(router.query);
		const updateData = {
			_id: new Types.ObjectId(roomid as string),
			property: group
		}
        const rst = await createAndUpdateListing(updateData);
		console.log(rst)
		if(rst.result) {
			router.push('/become-a-host/'+roomid+'/location');
		} else {
			console.log('데이터가 정상적으로 등록되지 않았습니다');
		}
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
        <Grid container direction="column" spacing={2} sx={{px: 6, width: 1, mt: 0, ml: 0}}>
			{PrivacyType && PrivacyType.map((item: string) => {
				return <ListItem title={item} type="roomType" group={group} setGroup={setGroup} />
			})}
        </Grid>
        <HalfFooter progress={30} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomPrivacyType.layout = "halfType";