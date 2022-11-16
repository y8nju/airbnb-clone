import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import { Types } from "mongoose";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createAndUpdateListing } from "../../../lib/api/propertyApi";

export default function RoomFloorPlan () {
	const [group, setGroup] = useState<string>("");
	const router = useRouter()
	const {roomid} = router.query;
	const [guests, setGuests] = useState<number>(0);
	const [beds, setBeds] = useState<number>(0);
	const [bedrooms, setBedrooms] = useState<number>(0);
	const [bathrooms, setBathrooms] = useState<number>(0);
	const [bathroomType, setBathroomType] = useState<string|nulll>(null);

	const bathroomTypeHandle = (event: ChangeEvent<HTMLInputElement>) => {
		setBathroomType((event.target as HTMLInputElement).value);
	};

	const nextStepHandle = async () => {
		console.log(router.query);
		// const updateData = {
		// 	_id: new Types.ObjectId(roomid as string),
		// 	property: group
		// }
		// const rst = await createAndUpdateListing(updateData);
		// console.log(rst)
		// if(rst.result) {
		// 	router.push('/become-a-host/'+roomid+'/location');
		// } else {
		// 	console.log('데이터가 정상적으로 등록되지 않았습니다');
		// }
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
		<Grid container direction="column" spacing={2} 
			 alignItems="center" justifyContent="center"
			 sx={{px: 6, width: 1, mt: 0, ml: 0}}>
			<Grid container direction="column" alignItems="center" justifyContent="center" 
				width="95%"
				sx={{gap: 3, animation: "fadein 1.5s"}}>
				<Grid container alignItems="center" justifyContent="space-between" flex={1}>
					<Typography variant="h5" flex={1} sx={{fontWeight: 500}}>게스트</Typography>
					<Grid item alignItems="center" sx={{display: 'flex'}} >
						<IconButton
							color="info"
							onClick={() => setGuests((c) => c - 1)}
							disabled={guests <= 1}
							sx={{border: 1, p: 0.5}}>
							<RemoveIcon fontSize="small" />
						</IconButton>
						<Typography variant="body1" minWidth={32}textAlign="center">
							{guests}
						</Typography>
						<IconButton
							color="info"
							onClick={() => setGuests((c) => c + 1)}
							sx={{border: 1, p: 0.5}}>
							<AddIcon fontSize="small" />
						</IconButton>
					</Grid>
				</Grid>
				<Grid container alignItems="center" justifyContent="space-between" flex={1}>
					<Typography variant="h5" sx={{fontWeight: 500}}>침대</Typography>
						<Grid item alignItems="center" sx={{display: 'flex'}} >
						<IconButton
							color="info"
							onClick={() => setBeds((c) => c - 1)}
							disabled={beds <= 1}
							sx={{border: 1, p: 0.5}}>
							<RemoveIcon fontSize="small" />
						</IconButton>
						<Typography variant="body1" minWidth={32}textAlign="center">
							{beds}
						</Typography>
						<IconButton 
							color="info" 
							onClick={() => setBeds((c) => c + 1)}                       
							sx={{border: 1, p: 0.5}}>
							<AddIcon fontSize="small" />
						</IconButton>
					</Grid>
				</Grid>
				<Grid container alignItems="center" justifyContent="space-between" flex={1}>
					<Typography variant="h5" sx={{fontWeight: 500}}>침실</Typography>
					<Grid item alignItems="center" sx={{display: 'flex'}} >
						<IconButton
							color="info"
							onClick={() => setBedrooms((c) => c - 1)}
							disabled={bathrooms <= 1}
							sx={{border: 1, p: 0.5}}>
							<RemoveIcon fontSize="small" />
						</IconButton>
						<Typography variant="body1" minWidth={32}textAlign="center">
							{bathrooms}
						</Typography>
						<IconButton
							color="info"
							onClick={() => setBedrooms((c) => c + 1)}
							sx={{border: 1, p: 0.5}}>
							<AddIcon fontSize="small" />
						</IconButton>
					</Grid>
				</Grid>
				<Grid container alignItems="center" justifyContent="space-between" flex={1}>
					<Typography variant="h5" sx={{fontWeight: 500}}>욕실</Typography>
					<Grid item alignItems="center" sx={{display: 'flex'}} >
						<IconButton
							color="info"
							onClick={() => setBathrooms((c) => c - 1)}
							disabled={bathrooms <= 1}
							sx={{border: 1, p: 0.5}}>
							<RemoveIcon fontSize="small" />
						</IconButton>
						<Typography variant="body1" minWidth={32}textAlign="center">
							{bathrooms}
						</Typography>
						<IconButton
							color="info"
							onClick={() => setBathrooms((c) => c + 1)}
							sx={{border: 1, p: 0.5}}>
							<AddIcon fontSize="small" />
						</IconButton>
					</Grid>
				</Grid>
				<Grid container alignItems="center" flex={1} sx={{mt: 2}}>
					<FormControl>
						<FormLabel id="bathroomType">
						<Typography sx={{fontSize: '1.1rem',fontWeight: 500}} color="text.primary">
							게스트가 단독으로 사용하는 욕실이 있나요?
						</Typography>
						</FormLabel>
						<RadioGroup
							aria-labelledby="bathroomType"
							name="bathroomTypeGroup"
							value={bathroomType}
							onChange={bathroomTypeHandle}>
							<FormControlLabel value="yes" control={<Radio color="info" />} 
								label={
									<Typography variant="body1" color="text.primary" sx={{fontWeight: 300}}>
										예
									</Typography>
								} />
							<FormControlLabel value="no" control={<Radio color="info" />} 
								label={
									<Typography variant="body1" color="text.primary" sx={{fontWeight: 300}}>
										아니요, 모두 공용입니다
									</Typography>
								} />
						</RadioGroup>
					</FormControl>
				</Grid>
			</Grid>
		</Grid>
		<HalfFooter progress={50} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomFloorPlan.layout = "halfType";