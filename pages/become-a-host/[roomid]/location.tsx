import {useEffect, useState} from 'react'
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Button, Grid } from "@mui/material";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import PlacesAutocomplete from "../../../component/maps/autocomplete"
import { useCtx } from '../../../context/context';
declare global {
    interface Window {
        initMap: () => void;
    }
}
export default function RoomLocation () {
	const router = useRouter();
	const ctx = useCtx();
	const { coordinate } = ctx!;

	const [onLoad, setOnLoad] = useState(false);

    useEffect(() => {
        // window.initMap = () => setOnLoad(true); // onLoad 상태를 true로 바꿔주는 initMap 함수를 선언해준다.
        // const script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.async = true;
        // script.defer = true;
        // script.src =`http://maps.google.com/maps/api/js?key=AIzaSyD_8pLwS_D3xDZV5Q2RKdv5_dCnpuAptRI&libraries=places&callback=initMap&region=kr`;
        // script.onload = () => setOnLoad(true);
        // document.body.insertAdjacentElement('beforeend', script);
    }, []);

	const nextStepHandle = async () => {

	}
	// const staticUri = createStaticMapUri()
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
		<Grid container direction="column" position="relative" sx={{width: 1, mt: 0, ml: 0}}>
			<Box sx={{width: 1, height: '100%'}} position="absolute">
				<Image src={coordinate.imgUrl as string} fill alt="Maps" style={{objectFit: 'cover'}} />
			</Box>
			<Grid sx={{width: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} position="relative" top="0" zIndex={100}>
				<Box>
					{/* {onLoad && <PlacesAutocomplete />} */}
				</Box>
			</Grid>
		</Grid>
		<HalfFooter progress={40} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomLocation.layout = "halfType";