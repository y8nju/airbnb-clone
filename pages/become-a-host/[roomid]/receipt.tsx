import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Types } from "mongoose";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import { createAndUpdateListing } from "../../../lib/api/propertyApi";
import { HostingType } from "../../../interface/hostingType";
import { BsClipboardCheck,BsCalendar4Event, BsPencil } from "react-icons/bs";

export default function RoomReceipt() {
    const router = useRouter()
	const {roomid} = router.query;
    const layoutCtx = useContext(HalfLayoutContext);
    const {setNextBtnDisabled, roomStep, progressPer, savedData} = layoutCtx!;
	const [roomData, setRoomData] = useState<HostingType | null>(null);
    const [savedImgUri, setSavedImgUri] = useState<string[] | null>(null);
    
	useEffect(() => {
		setNextBtnDisabled(false);
	}, [])

	useEffect(() => {
		if(savedData) {
			setRoomData(savedData);
		}
	}, [savedData])

	useEffect(() => {
		if(roomData) {
            if(roomData.photos) {
                setSavedImgUri(roomData.photos);
            }
		}
	}, [roomData])

    const nextStepHandle = async () => {
		const updateData = {
			_id: new Types.ObjectId(roomid as string),
            step: roomStep
		}
		const rst = await createAndUpdateListing(updateData);
		console.log(rst)
		if(rst.result) {
			router.push('/become-a-host/'+roomid+'/publish-celebration');
		} else {
			console.log('데이터가 정상적으로 등록되지 않았습니다');
		}
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader saveHandle={nextStepHandle} />
		<Head>
			<title>숙소 정보 검토 후 저장 - 에어비앤비</title>
		</Head>
		<Grid container
            justifyContent="center"
			sx={{px: 6, width: 1, mt: 0, ml: 0, pb: 4, animation: 'fadein 1s'}} >
            {(roomData && savedImgUri ) && <Grid container  direction="column"  alignItems="center"
				sx={{width: '80%'}}>
				<Card sx={{ width: '100%' }}>
					<CardActionArea sx={{position: 'relative'}}>
						<Typography variant="body2"
							sx={{ position: 'absolute', top: '16px', left: '16px',  py: 1, px: 1.4, borderRadius: 1, lineHeight: 1, backgroundColor: '#fff'}}>
							미리보기 표시
						</Typography>
						<CardMedia
						component="img"
						height="300"
						image={savedImgUri[0]}
						alt="room preview Image"
						/>		
						<CardContent>
						<Box sx={{display: 'flex'}}>
							<Box sx={{flex: 1}}>
								<Typography gutterBottom variant="body1" component="div"
									sx={{fontWeight: 500}}>
									{roomData.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									<b>{roomData.price}</b> 박
								</Typography>
							</Box>
							<Box>
								<Typography variant="body2">
									신규 &#8902;
								</Typography>
							</Box>
						</Box>
						</CardContent>
					</CardActionArea>
				</Card>	
				<Grid container direction="column" sx={{mt: 4, gap: 2}}>
					<Typography variant="h5" align="left" sx={{mb: 1, fontWeight: 500	}}>다음단계</Typography>
					<Grid item justifyContent="center" sx={{display: 'flex', gap: 2}}>
						<Grid item>
							<BsClipboardCheck size="32px" />
						</Grid>
						<Grid item flex={1}>
							<Typography variant="h6" align="left" sx={{lineHeight: 1, mb: 1}}>세부 정보를 확인하고 숙소를 등록하세요</Typography>
							<Typography variant="body1" align="left"  color="text.secondary"
								sx={{fontWeight: 300}}>
									본인 인증이 필요하거나 현지 정부에 등록해야 하는 경우 안내해드리겠습니다
								</Typography>
						</Grid>
					</Grid>
					<Grid item justifyContent="center" sx={{display: 'flex', gap: 2}}>
						<Grid item>
							<BsCalendar4Event size="32px" />
						</Grid>
						<Grid item flex={1}>
							<Typography variant="h6" align="left" sx={{lineHeight: 1, mb: 1}}>달력 설정하기</Typography>
							<Typography variant="body1" align="left"  color="text.secondary"
								sx={{fontWeight: 300}}>
									숙소 예약 가능일을 선택해주세요. 숙소는 등록 완료 후 24시간이 지나면 일반에 공개됩니다.
								</Typography>
						</Grid>
					</Grid>
					<Grid item justifyContent="center" sx={{display: 'flex', gap: 2}}>
						<Grid item>
							<BsPencil size="32px" />
						</Grid>
						<Grid item flex={1}>
							<Typography variant="h6" align="left" sx={{lineHeight: 1, mb: 1}}>설정 변경하기</Typography>
							<Typography variant="body1" align="left"  color="text.secondary"
								sx={{fontWeight: 300}}>
									숙소 이용규칙 설정, 환불 정책 선택, 게스트의 예약 방식 선택 등 필요한 작업을 하세요.
								</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>}
		</Grid>
		<HalfFooter progress={progressPer(roomStep)} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomReceipt.layout = 'halfType'
