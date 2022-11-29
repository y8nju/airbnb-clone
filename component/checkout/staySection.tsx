import { useContext, useState, useEffect } from "react";
import { Grid, Box, Typography, Avatar, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { BookingContext } from "../../context/bookingContext";
import { differenceInCalendarDays, format, addDays, subDays } from "date-fns";
import {ko} from "date-fns/locale";
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import { pink } from '@mui/material/colors';
import CalendarModal from "./calendarModal";
import { PopulateBookingType } from "../../interface/bookingType";
import GuestSelect from "./guestSelect";
import Paypal from "./paypal";
import { useSession } from "next-auth/react";

const gradientBg = {backgroundImage: 'radial-gradient(circle at center center, rgb(255, 56, 92) 0%, rgb(230, 30, 77) 27.5%, rgb(227, 28, 95) 40%, rgb(215, 4, 102) 57.5%, rgb(189, 30, 89) 75%, rgb(189, 30, 89) 100%)',
    backgroundSize: '200% 200%'}

export default function StaySection({ data }: { data: PopulateBookingType }) {
	const [bookDate, setBookDate] = useState<string|null>(null);
	const bookingCtx = useContext(BookingContext);
	const {bookingData, isOpened, openDialog, savedData, openSelectOpen, isSelectOpend} = bookingCtx!;
	const {checkin, checkout} = data;
	const checkinStr = checkin!.toString().slice(0, 10);
	const checkoutStr = checkout!.toString().slice(0, 10);
	
	const reserveHandle = () => {
		// router.push("/book/submit/" + json.data._id);
	}

	return (<>
		<Grid container direction="column">
			<Grid item sx={{ py: 2 }}>
				<Typography variant="h5" sx={{mb: 2}} fontWeight={500}>예약정보</Typography>
				<Grid item justifyContent="space-between" sx={{display: 'flex', py: 1}}>
					{isOpened && <CalendarModal />}
					<Grid item sx={{display: 'flex', flexDirection: "column"}}>
						<Typography variant="body1" fontWeight={500}>날짜</Typography>
						<Typography variant="body1" fontWeight={300}>
							{format(new Date(checkinStr), 'PPP', {locale: ko})}~
							{	new Date(checkinStr).getFullYear() !== new Date(checkoutStr).getFullYear() ? format(new Date(checkoutStr), 'PPP', {locale: ko}) : (
								new Date(checkinStr).getMonth() !== new Date(checkoutStr).getMonth() ? format(new Date(checkoutStr), 'MMM do', {locale: ko}) :
								format(new Date(checkoutStr), 'do', {locale: ko})
							)}
						</Typography>
					</Grid>
					<Grid item>
						<Button color="info" 
							onClick={() => openDialog()}
							sx={{textDecoration: 'underline', minWidth: 'min-content'}}>수정</Button>
					</Grid>
				</Grid>
				<Grid item justifyContent="space-between" sx={{display: 'flex', py: 1}}>
					{isSelectOpend && <GuestSelect guest={data.productId!.floorPlan!.guests! as number} />}
					<Grid item sx={{display: 'flex', flexDirection: "column"}}>
						<Typography variant="body1" fontWeight={500}>게스트</Typography>
						<Typography variant="body1" fontWeight={300}>
							게스트 {bookingData.numberOfGuests}명
							{bookingData.numberOfInfants !== 0 && `, 유아 ${bookingData.numberOfInfants}명`}
						</Typography>
					</Grid>
					<Grid item>
						<Button color="info" 
							onClick={() => openSelectOpen()}
							sx={{textDecoration: 'underline', minWidth: 'min-content'}}>수정</Button>
					</Grid>
				</Grid>
			</Grid>
			<Divider />
			<Grid item sx={{ py: 2 }}>
				<Typography variant="h5" sx={{mb: 2}} fontWeight={500}>결제 수단</Typography>
				<Grid item flex={1} sx={{display: 'flex', py: 1}}>
					<Paypal bookingData={data} />
				</Grid>
			</Grid>
			<Divider />
			<Grid item sx={{ py: 2 }}>
				<Typography variant="h5" sx={{mb: 2}} fontWeight={500}>필수 입력 정보</Typography>
				<Grid container justifyContent="space-between" sx={{ py: 1}}>
					<Grid item>
						<Typography variant="body1">
							호스트에게 메시지 보내기
						</Typography>
						<Typography variant="body2" fontWeight={300}>
							호스트에게 여행 목적과 도착 예정 시간을 알려주세요.
						</Typography>
					</Grid>
					<Grid item>
						<Button variant="outlined" color="info" size="small"
							sx={{ minWidth:'fit-content', px: 1.5 }}>추가</Button>
					</Grid>
				</Grid>
				<Grid container justifyContent="space-between" sx={{ py: 1}}>
					<Grid item>
						<Typography variant="body1">
							프로필 사진
						</Typography>
						<Typography variant="body2" fontWeight={300}>
							호스트는 숙소에 묵는 게스트에 대해서 알고 싶어 합니다.
						</Typography>
					</Grid>
					<Grid item>
						<Button variant="outlined" color="info" size="small"
							sx={{ minWidth:'fit-content', px: 1.5 }}>추가</Button>
					</Grid>
				</Grid>
			</Grid>
			<Divider />
			<Grid item sx={{ py: 2 }}>
				<Typography variant="h5" sx={{mb: 2}} fontWeight={500}>환불 정책</Typography>
				<Grid item sx={{ py: 1}}>
					<Typography variant="body1" component="span" fontWeight={500}>
						{format(subDays(new Date(checkinStr), 3), 'MMM do', {locale: ko})} 전까지 무료로 취소하실 수 있습니다.
					</Typography>
					<Typography variant="body1" component="span">
						체크인 날짜인 {format(new Date(checkinStr), 'MMM do', {locale: ko})} 전에 취소하면 부분 환불을 받으실 수 있습니다. 
					</Typography>
					<Typography component="span" fontWeight={500}
						sx={{ml: 1, textDecoration: 'underline'}}>
						자세히 알아보기
					</Typography>
				</Grid>
			</Grid>
			<Divider />
			<Grid container justifyContent="space-between" sx={{ py: 2, gap: 3 }}>
				<Grid item sx={{pt: 0.2}}>
					<PendingActionsTwoToneIcon fontSize="large" sx={{color: pink['A200']}} />
				</Grid>
				<Grid item flex={1}>
					<Typography variant="body1" fontWeight={500}>
						호스트가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된 것이 아닙니다.
					</Typography>
					<Typography variant="body1">
						예약 확정 전까지는 요금이 청구되지 않습니다.
					</Typography>
				</Grid>
			</Grid>
			<Divider />
			<Grid container justifyContent="space-between" sx={{ py: 2, gap: 3 }}>
				<Typography variant="caption" fontWeight={300}
					sx={{lineHeight: '1.3'}}>
					아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 에어비앤비가 결제 수단으로 청구의 조치를 취할 수 있다는 사실에 동의하는 것입니다. 호스트가 예약 요청을 수락하면 표시된 총액이 결제되는 데 동의합니다.
				</Typography>
			</Grid>
			<Grid container justifyContent="space-between" sx={{ py: 2, gap: 3 }}>
				<Button variant="contained" size="large"
					onClick={reserveHandle}
					sx={gradientBg}>
						예약요청
				</Button>
			</Grid>
		</Grid>
	</>);
}
