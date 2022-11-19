import { Grid, TextField } from "@mui/material";
import { Types } from "mongoose";
import { useRouter } from "next/router";
import { useContext } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import { createAndUpdateListing } from "../../../lib/api/propertyApi";

export default function RoomReceipt() {
    const router = useRouter()
	const {roomid} = router.query;
    const layoutCtx = useContext(HalfLayoutContext);
    const {setNextBtnDisabled} = layoutCtx!;
    
    const nextStepHandle = async () => {
        setNextBtnDisabled(true)
		// const updateData = {
		// 	_id: new Types.ObjectId(roomid as string),
		// 	amenities: amenities
		// }
		// const rst = await createAndUpdateListing(updateData);
		// console.log(rst)
		// if(rst.result) {
		// 	router.push('/become-a-host/'+roomid+'/photos');
		// } else {
		// 	console.log('데이터가 정상적으로 등록되지 않았습니다');
		// }
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
		<Head>
			<title>숙소 정보 검토 후 저장 - 에어비앤비</title>
		</Head>
		<Grid container direction="column" spacing={2} 
            justifyContent="center" alignItems="center"
			sx={{px: 6, width: 1, mt: 0, ml: 0, pb: 4, animation: 'fadein 1s'}} >
            <TextField />
		</Grid>
		<HalfFooter progress={80} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomReceipt.layout = 'halfType'
