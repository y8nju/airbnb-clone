import { FormHelperText, Grid, TextField, Typography } from "@mui/material";
import styled from '@mui/material/styles/styled';
import { Box } from "@mui/system";
import { Types } from "mongoose";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import DescriptionGroup from "../../../component/room/descriptipnGroup";
import { createAndUpdateListing } from "../../../lib/api/propertyApi";
import { Error } from '@mui/icons-material/';
import { grey } from "@mui/material/colors";
import Head from "next/head";

const Textarea = styled(TextField)({
	'& fieldset': {
		borderRadius: '8px',
	},
	'& .Mui-error': {
		backgroundColor:'#fddfdf1c'
	},
});

export default function RoomDescription() {
	const [descStep, setDescStep] = useState<number>(0) // 등록되고 나면 무조건 1
	const [descGroup, setDescGroup] = useState<string[]>(() => []);
	const [roomDesc, setRoomDesc] = useState<string>('');
	const [cnt, setCnt] = useState<number>(0);
	const router = useRouter()
	const {roomid} = router.query;
	const layoutCtx = useContext(HalfLayoutContext);
	const {setNextBtnDisabled, nextBtnDisabled,  roomStep, progressPer, savedData} = layoutCtx!;

	useEffect(()=> {
		setNextBtnDisabled(false);
		if(savedData) {
			if(savedData.RoomDescription) {	
				setRoomDesc(savedData.description.description);
				if(savedData.description.descGroup && savedData.description.descGroup.length > 0) {
					setDescStep(1);
				}
			}
		}
	}, [savedData]);

	useEffect(()=> {
		setCnt(roomDesc.length)
		if(roomDesc.length > 500) {
			setNextBtnDisabled(true);
		}else{
			setNextBtnDisabled(false);
		}
	}, [roomDesc]);
	
	const nextStepHandle = async () => {
		if(descStep == 0) {
			setDescStep(1);
			setRoomDesc(descGroup.join(', '))
		}else {
			setNextBtnDisabled(true)
			const updateData = {
				_id: new Types.ObjectId(roomid as string),
				description: {
					description: roomDesc,
					descGroup: descGroup.length > 0 ? descGroup : null
				},
				step: roomStep
			}
			const rst = await createAndUpdateListing(updateData);
			console.log(rst)
			if(rst.result) {
				router.push('/become-a-host/'+roomid+'/price');
			} else {
				console.log('데이터가 정상적으로 등록되지 않았습니다');
			}
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
		<><HalfHeader saveHandle={saveHandle} />
		<Grid container justifyContent="center" alignItems="center"
			sx={{px: 6, width: 1, mt: 0, ml: 0, pb: 4}} >
			<Head>
				<title>숙소 설명 작성 - 에어비앤비</title>
			</Head>
			{descStep == 0 && <DescriptionGroup descGroup={descGroup} setDescGroup={setDescGroup} />}
			{descStep == 1 && <Grid container direction="column" 
				justifyContent="center" spacing={2} sx={{ animation: 'fadein 1s'}} >
				<Typography variant="h5" align="left" sx={{mb: 1}}>숙소 설명 작성하기</Typography>
				<Typography variant="body1" align="justify" sx={{fontWeight: 300, mb: 3}}>
					숙소의 특징과 장점을 알려주세요.
				</Typography>
				<Textarea fullWidth multiline rows={5} color="info"
					value={roomDesc}
					error={roomDesc.length > 500 ? true : false}
					onChange={(e) => setRoomDesc(e.target.value)}/>
				<Box>
					<Typography variant="overline" sx={{color: grey[700]}}>{cnt}</Typography><Typography variant="overline" sx={{color: grey[700]}}>/500</Typography>
				</Box>
				{roomDesc.length > 500 && <FormHelperText 
						sx={{display: 'flex', alignItems: 'center', color:"#d32f2f"}}>
					<Error sx={{mr: 1, mt: 0.5}} fontSize="small" />
					<span>500자까지 입력하실 수 있습니다</span>
				</FormHelperText>}    
			</Grid>}
		</Grid>
		<HalfFooter progress={progressPer(roomStep)} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomDescription.layout = 'halfType'
