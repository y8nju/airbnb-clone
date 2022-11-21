import styled from "@emotion/styled";
import { FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Types } from "mongoose";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import { createAndUpdateListing } from "../../../lib/api/propertyApi";
import { Error } from '@mui/icons-material/';

const Textarea = styled(TextField)({
	'& fieldset': {
		borderRadius: '8px',
	},
    '& .Mui-error': {
		backgroundColor:'#fddfdf1c'
	},
});
export default function RoomTitle() {
	const [roomTitle, setRoomtitle] = useState<string>('');
	const [cnt, setCnt] = useState<number>(0);
    const router = useRouter()
	const {roomid} = router.query;
    const layoutCtx = useContext(HalfLayoutContext);
    const {setNextBtnDisabled, roomStep, progressPer, savedData} = layoutCtx!;

	useEffect(()=> {
		if(savedData) {
			if(savedData.title) {
				setRoomtitle(savedData.title)
			}
		}
	}, [])
	useEffect(()=> {
		setCnt(roomTitle.length)
		if(roomTitle.length == 0 || roomTitle.length > 32) {
			setNextBtnDisabled(true);
		}else{
			setNextBtnDisabled(false);
		}
	}, [roomTitle]);
    
    const nextStepHandle = async () => {
        setNextBtnDisabled(false)
		const updateData = {
			_id: new Types.ObjectId(roomid as string),
			title: roomTitle,
            step: roomStep
		}
		const rst = await createAndUpdateListing(updateData);
		console.log(rst)
		if(rst.result) {
			router.push('/become-a-host/'+roomid+'/description');
		} else {
			console.log('데이터가 정상적으로 등록되지 않았습니다');
		}
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
		<Head>
			<title>숙소 이름 작성 - 에어비앤비</title>
		</Head>
		<Grid container direction="column" spacing={2} 
            justifyContent="center"
			sx={{px: 6, width: 1, mt: 0, ml: 0, pb: 4, animation: 'fadein 1s'}} >
			<Typography variant="h5" align="left" sx={{mb: 1}}>숙소 이름 정하기</Typography>
			<Typography variant="body1" align="justify" sx={{fontWeight: 300, mb: 3}}>
				숙소 이름은 짧을수록 효과적입니다. 나중에 언제든지 변경할 수 있으니, 너무 걱정하지 마세요.
			</Typography>
            <Textarea fullWidth multiline rows={5} color="info"
				value={roomTitle}
				onChange={(e) => setRoomtitle(e.target.value)}/>
			<Box>
				<Typography variant="overline" sx={{color: grey[700]}}>{cnt}</Typography><Typography variant="overline" sx={{color: grey[700]}}>/32</Typography>
			</Box>
			{roomTitle.length > 32 && <FormHelperText 
					sx={{display: 'flex', alignItems: 'center', color:"#d32f2f"}}>
					<Error sx={{mr: 1, mt: 0.5}} fontSize="small" />
					<span>32자까지 입력하실 수 있습니다</span>
				</FormHelperText>}
		</Grid>
		<HalfFooter progress={progressPer(roomStep)} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomTitle.layout = 'halfType'