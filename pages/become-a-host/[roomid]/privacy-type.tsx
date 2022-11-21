import { Button, Grid } from "@mui/material";
import { Types } from "mongoose";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import ListItem from "../../../component/room/listItem";
import { createAndUpdateListing } from "../../../lib/api/propertyApi";

const PrivacyType = ['공간전체', '개인실', '다인실']
export default function RoomPrivacyType () {
    const [group, setGroup] = useState<string>("");
    const router = useRouter()
    const {roomid} = router.query;
    const layoutCtx = useContext(HalfLayoutContext);
    const {setNextBtnDisabled, nextBtnDisabled, roomStep, progressPer, savedData} = layoutCtx!;

	useEffect(() => {
		if(savedData) {
			if(savedData.privacy) {
				setGroup(savedData.privacy);
			}
		}
	}, [savedData])

    useEffect(()=> {
        if(group !== '') {
            setNextBtnDisabled(false)
        }
    }, [group])

	const nextStepHandle = async () => {
        setNextBtnDisabled(true)
		console.log(router.query);
		const updateData = {
			_id: new Types.ObjectId(roomid as string),
			privacy: group,
            step: roomStep
		}
        const rst = await createAndUpdateListing(updateData);
		console.log(rst)
		if(rst.result) {
			router.push('/become-a-host/'+roomid+'/location');
		} else {
			console.log('데이터가 정상적으로 등록되지 않았습니다');
		}
	}
	const saveHandle = () =>{
		if(!nextBtnDisabled) {
			nextStepHandle;
		} else {
			return;
		}
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader saveHandle={saveHandle}/>
        <Grid container direction="column" spacing={2} sx={{px: 6, width: 1, mt: 1, ml: 0, animation: 'fadein 1s'}}>
			<Head>
				<title>숙소 유형 선택 - 에어비앤비</title>
			</Head>
			{PrivacyType && PrivacyType.map((item: string) => {
				return <ListItem key={item}
					title={item} type="roomType" group={group} setGroup={setGroup} />
			})}
        </Grid>
        <HalfFooter progress={progressPer(roomStep)} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomPrivacyType.layout = "halfType";