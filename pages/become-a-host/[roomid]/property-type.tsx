import { Button, Grid } from "@mui/material";
import { Types } from "mongoose";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import ListItem from "../../../component/room/listItem";
import PropertyType from "../../../interface/propertyType";
import { createAndUpdateListing, getPropertyGroupList } from "../../../lib/api/propertyApi";

interface List {
	property: string,
	description: string
}
export default function RoomPropertyType () {
	const [list, setList] = useState<List[] | null>(null)
    const [group, setGroup] = useState<string>("");
    const router = useRouter();
    const listingGroup = router.query.group;
    const layoutCtx = useContext(HalfLayoutContext);
    const {setNextBtnDisabled, nextBtnDisabled, roomStep, progressPer, savedData} = layoutCtx!;

	useEffect(()=> {
        !(async () => {
            const rst = await  getPropertyGroupList(listingGroup as string);
            if(rst) {
                setList(rst[0]?.types)
            }
        })();
    }, []);
	
    useEffect(() => {
        if(savedData) {
			console.log('savedData', savedData);
            setGroup(savedData.property as string);
        }
    }, [savedData])

    useEffect(()=> {
        if(group !== '') {
            setNextBtnDisabled(false)
        }
    }, [group])

	const nextStepHandle = async () => {
        setNextBtnDisabled(true)
        const { roomid } = router.query;
		const updateData = {
			_id: new Types.ObjectId(roomid as string),
			property: group,
            step: roomStep
		}
        const rst = await createAndUpdateListing(updateData);
		console.log(rst)
		if(rst.result) {
			router.push('/become-a-host/'+ roomid +'/privacy-type');
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
				<title>건물 유형 선택 - 에어비앤비</title>
			</Head>
			{list && list.map((item: List) => {
				return <ListItem key={item.property}
					title={item.property} subTitle={item.description} type="roomType" group={group} setGroup={setGroup} />
			})}
        </Grid>
        <HalfFooter progress={progressPer(roomStep)} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomPropertyType.layout = "halfType";