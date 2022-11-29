import { Grid, Typography, Divider } from "@mui/material";
import { PopulateBookingType } from "../../interface/bookingType";

export default function BookAside({ data }: { data: PopulateBookingType }) {

	return (<Grid container position="sticky" top={0}>
	<Grid container direction="column" sx={{ width: 1, margin: "auto", p: 3, borderRadius: 2, border: 1, borderColor: 'grey.300'}}>
		<Grid item >
			<img src={data.productId!.photos![0]} width="100%" height="240px" style={{objectFit: 'cover', verticalAlign: 'bottom'}} />
		</Grid>
		<Grid item sx={{ py: 2 }}>
			<Typography variant="body1" fontWeight={500}>
			{data.productId.title}
			</Typography>
		</Grid>
		<Divider />
		<Grid item justifyContent="space-between" alignItems="center" sx={{ pt:2, display: "flex" }}>
			<Typography variant="body2">
			예약번호
			</Typography>
			<Typography variant="body2" fontWeight={300}>
			{String(data._id)}
			</Typography>
		</Grid>
	</Grid>
	</Grid>)
}