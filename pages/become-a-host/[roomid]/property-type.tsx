import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import ListItem from "../../../component/room/listItem";

export default function roomPropertyType () {
	const [list, setList] = useState<PropertyType[] | null>(null)
    const [group, setGroup] = useState<string>("");

    const router = useRouter()
    const {roomId} = router.query;
	const nextStepHandle = () => {
		// new data update fetch 👉 
        // 정상 처리가 됐다면
        const { itemId } = router.query;
		router.push('/become-a-host/'+ itemId +'/privacy-type')
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		 <><HalfHeader />
        <Grid container direction="column" spacing={2} sx={{px: 6, width: 1, mt: 0, ml: 0}}>
			<ListItem title="콘도" subTitle="거주자 소유의 다세대 건물 또는 단지 내의 공간을 의미합니다." type="roomType" group={group} setGroup={setGroup} />
        </Grid>
        <HalfFooter progress={10} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
roomPropertyType.layout = "halfType";