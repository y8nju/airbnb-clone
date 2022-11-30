import { Card, CardActionArea, CardMedia, Grid, Typography, CardContent, Box } from "@mui/material";
import { HostingType } from "../../interface/hostingType";

export default function ListingItem({data}: {data: HostingType}) {
	console.log(data)
	return (<Grid item xs={12} md={3}>
	{data && <Card variant="outlined" sx={{borderRadius: 2}}>
		<CardActionArea>
			<CardMedia
				component="img"
				height="140"
				image={data!.photos && data!.photos[0]! as string}
				alt={data!.title}/>
			<CardContent>
			<Typography gutterBottom variant="body1" component="div" fontWeight={500} sx={{lineHeight: 1.2}}>
				{data!.title}
			</Typography>
			<Typography variant="caption" component="div" color="text.secondary">
				{data.location?.state} {data.location?.city} {data.location?.street}
			</Typography>
			</CardContent>
		</CardActionArea>
		</Card>}
	</Grid>)
}