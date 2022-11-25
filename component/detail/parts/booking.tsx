
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { HostingType } from "../../../interface/hostingType";
import { BookingContext } from "../../../pages/rooms/[roomId]";

export default function BookingSummary({ data }: { data: HostingType }) {
	const bookingCtx = useContext(BookingContext);
	const {bookingData} = bookingCtx!;

	return (<Grid container direction="column">
		{bookingData.checkin && bookingData.checkout && (
		<>
			<Typography variant="h5" sx={{mb: 2}}>
			{data.location!.city}, {data.location!.state}에서{" "}
			{differenceInCalendarDays(bookingData.checkout, bookingData.checkin)}박
			</Typography>
			<Typography variant="body1" color="text.secondary">
			{format(bookingData.checkin, "yyyy년 MM월 dd일")} ~
			{format(bookingData.checkout, "yyyy년 MM월 dd일")}
			</Typography>
		</>
		)}
		{!bookingData.checkin && !bookingData.checkout && (
		<>
			<Typography variant="h5" sx={{mb: 2}}>체크인 날짜를 선택해주세요.</Typography>
			<Typography variant="body1" color="text.secondary">
			여행 날짜를 입력하여 정확한 요금을 확인하세요.
			</Typography>
		</>
		)}
		{bookingData.checkin && !bookingData.checkout && (
		<>
			<Typography variant="h5" sx={{mb: 2}}>체크아웃 날짜를 선택해주세요.</Typography>
			<Typography variant="body1" color="text.secondary">
			여행 날짜를 입력하여 정확한 요금을 확인하세요.
			</Typography>
		</>
		)}
	</Grid>);
}


