import { Box, Grid, Typography, Divider, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";

import { useRouter } from "next/router";
import { HostingType } from "../../interface/hostingType";
import { BookingContext } from "../../context/bookingContext";
import { PopulateBookingType } from "../../interface/bookingType";

function StayAside({ data }: { data: PopulateBookingType }) {
	const router = useRouter();
	const bookingCtx = useContext(BookingContext);
	const {bookingData, updateData, openDialog} = bookingCtx!;

	let diff;
	if (data.checkin && data.checkout) {
	diff = differenceInCalendarDays(new Date(data.checkout as Date) as Date, new Date(data.checkin as Date) as Date);
	}
	//console.log("diff=", diff);
	return (
	<>
		<Grid container position="sticky" top={0} sx={{py: 3}}>
			<Grid container direction="column" sx={{ width: 1, margin: "auto", p: 3, borderRadius: 2, border: 1, borderColor: 'grey.300'}}>
				<Grid container justifyContent="space-between" sx={{ pb:2, gap: 1 }}>
					<Grid item flex={1} sx={{borderRadius: 2, overflow: 'hidden'}}>
					<img src={data.productId!.photos![0]} width="100%" height="106px" style={{objectFit: 'cover', verticalAlign: 'bottom'}} />
					</Grid>
					<Grid item flex={2} sx={{display: 'flex', flexDirection: 'column'}}>
					<Typography variant="caption" color="text.secondary">
						{data.productId?.privacy}
					</Typography>
					<Typography variant="body2">
						{data.productId?.title}
					</Typography>
					</Grid>
				</Grid>
				<Divider />
				<Grid item sx={{ py:2 }}>
					<Typography variant="body2" component="span" fontWeight={500} color="#ff385c">
						에어
					</Typography>
					<Typography variant="body2" component="span" fontWeight={500}>
						커버
					</Typography>
					<Typography variant="body1" component="span" fontWeight={300}>
						를 통한 예약 보호
					</Typography>
				</Grid>
				<Divider />
				<Grid item sx={{ py: 2 }}>
					<Typography variant="h5" sx={{mb: 2}} fontWeight={500}>
					요금 세부정보
					</Typography>
					<Grid item justifyContent="space-between" sx={{ my: 1, display: "flex" }}>
					{diff && <>
						<Typography variant="body1" fontWeight={300}>
						₩{data.productId!.price!.toLocaleString()} X {diff}박
						</Typography>
						<Typography variant="body1" fontWeight={300}>
						₩{(data.productId!.price! * diff).toLocaleString()}
						</Typography>
					</>}
					</Grid>
					<Grid item justifyContent="space-between" sx={{display: "flex" }}>
						<Typography variant="body1" fontWeight={300}>
							서비스 수수료
						</Typography>
						<Typography variant="body1" fontWeight={300}>
						{diff && <>₩
							{Math.round(data.productId!.price! * diff * 0.14).toLocaleString()}
						</>}
						</Typography>
					</Grid>
				</Grid>
				<Divider />
				<Grid item justifyContent="space-between" sx={{ py:2, display: "flex" }}>
					<Typography variant="body1" fontWeight={500}>
						총합계
					</Typography>
					<Typography variant="body1" fontWeight={500}>
						{diff && <> ₩
							{(data.productId!.price! * diff +
								Math.ceil(data.productId!.price! * diff * 0.14)
							).toLocaleString()}
						</>}
					</Typography>
				</Grid>
				<Divider />
				<Grid item sx={{ pt: 2, display: "flex" }}>
					<Typography variant="body2" fontWeight={300}>
					해외에서 결제가 처리되기 때문에 카드 발행사에서 추가 수수료를 부과할 수 있습니다.
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	</>);
}

export default StayAside;
