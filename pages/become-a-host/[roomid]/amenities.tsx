import { Grid } from "@mui/material";
import { Types } from "mongoose";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import AmenitiesGroup from "../../../component/room/amenitiesGroup";
import { createAndUpdateListing } from "../../../lib/api/propertyApi";

export default function roomAmenities () {
    const [amenities, setAmenities] = useState<string[]>(() => []);
	const router = useRouter()
	const {roomid} = router.query;
    const layoutCtx = useContext(HalfLayoutContext);
    const {setNextBtnDisabled, roomStep, progressPer, savedData} = layoutCtx!;
	
	useEffect(()=> {
        setNextBtnDisabled(false);
	}, [])

	useEffect(() => {
		if(savedData) {
			if(savedData.amenities) {
				setAmenities(savedData.amenities);
			}
		}
	}, [savedData])

    const nextStepHandle = async () => {
        setNextBtnDisabled(true)
		console.log(router.query);
		const updateData = {
			_id: new Types.ObjectId(roomid as string),
			amenities: amenities,
            step: roomStep
		}
		const rst = await createAndUpdateListing(updateData);
		console.log(rst)
		if(rst.result) {
			router.push('/become-a-host/'+roomid+'/photos');
		} else {
			console.log('데이터가 정상적으로 등록되지 않았습니다');
		}
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
		<Grid container direction="column" spacing={2} 
			 sx={{px: 6, width: 1, mt: 0, ml: 0, pb: 4, animation: 'fadein 1s'}} >
			<Head>
				<title>편의시설 선택 - 에어비앤비</title>
			</Head>
			<AmenitiesGroup amenities={amenities} setAmenities={setAmenities} />
		</Grid>
		<HalfFooter progress={progressPer(roomStep)} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
roomAmenities.layout = "halfType"