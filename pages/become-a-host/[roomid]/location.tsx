import {useEffect, useState} from 'react'
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Button, Grid } from "@mui/material";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import PlacesAutocomplete from "../../../component/maps/autocomplete"
import { useCtx } from '../../../context/context';
import GoogleMaps from '../../../component/maps/maps';
import AddressDialog from '../../../component/ui/dialog/addressDialog';
declare global {
    interface Window {
        initMap: () => void;
    }
}
export default function RoomLocation () {
	const ctx = useCtx();
	const {coordinate} = ctx!
	const [showMap, setShowMap] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false)
	useEffect(()=> {
		console.log(coordinate);
	}, [coordinate])

	const nextStepHandle = async () => {

	}
	
	// const staticUri = createStaticMapUri()
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
		<Grid container direction="column" position="relative" sx={{width: 1, mt: 0, ml: 0}}>
			<Box sx={{width: 1, height: '100%'}} position="absolute">
				{/* <Image src={coordinate.imgUrl} fill alt="Maps" style={{objectFit: 'cover'}} /> */}
				{showMap ? <GoogleMaps /> :
					<img src={coordinate.imgUrl} alt="Maps" width="100%" height="100%" style={{objectFit: 'cover', verticalAlign: 'bottom'}} />}
			</Box>
			<Grid sx={{width: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}} position="relative" top="0" zIndex={100}>
				<PlacesAutocomplete setShowMap={setShowMap} setOpen={setOpen} />
			</Grid>
			<AddressDialog open={open} onClose={setOpen} />
		</Grid>
		<HalfFooter progress={40} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomLocation.layout = "halfType";