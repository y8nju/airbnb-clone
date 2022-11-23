import { useCallback, useEffect, useRef, useState } from 'react';
import { HostingType } from '../../interface/hostingType';
import { CoorsType } from '../../interface/mapsType';

const appKey = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY;

function buildContent() {
	const content = document.createElement("div");
	content.innerHTML = `
		<div style="width: 70px; height: 70px; background-color: #f5005629; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin=bottom: -20px">
			<div style="width: 40px; height: 40px; background-color: #e91e63; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
				<span class="material-symbols-rounded">
				home
				</span>
			</div>
		</div>
	`;
	return content;
}


export default function Maps({ data }: { data: HostingType }) {
	const mapElement = useRef<HTMLDivElement>(null);
	const [coords, setCoords] = useState<CoorsType>({lat: 37.5656, lng: 126.9769})
	
	useEffect(() => {
		if(data) {
		setCoords({
			lat: data.location!.lat!,
			lng: data.location!.lng!
		})
		}
	}, []);

	
	  // script에서 google map api를 가져온 후에 실행될 callback 함수
	const initMap = useCallback(() => {
		const { google } = window;
		if (!mapElement.current || !google) return;
		const map = new google.maps.Map(mapElement.current!, {
			mapId: '4ef2f3ae999feb44',
			zoom: 17,
			center: coords,
			mapTypeControl: false,
			fullscreenControl: false,
			});
			// new google.maps.Marker({
			// position: coords,
			// map,
			// });
		const markerView = new google.maps.marker.AdvancedMarkerView({
			map,
			position: coords,
			content: buildContent(),
		});
	}, []);
	
	
	useEffect(() => {
		const script = window.document.getElementsByTagName('script')[0];
		const includeCheck = script.src.startsWith(
		'https://maps.googleapis.com/maps/api'
		);
		if (includeCheck) return initMap();
		window.initMap = initMap;
	}, [initMap]);

	return (<>
		<div ref={mapElement} style={{ minHeight: '400px' }} />
		<script
		src="https://maps.googleapis.com/maps/api/js?v=beta&key=AIzaSyD_8pLwS_D3xDZV5Q2RKdv5_dCnpuAptRI&callback=initMap&libraries=marker"
		defer
		></script>
	</>);
}