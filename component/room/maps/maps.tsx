import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Box } from "@mui/material";
import { Children, cloneElement, FC, isValidElement, ReactNode, useEffect, useRef, useState } from "react";
import { useCtx } from "../../../context/context";

interface MapProps extends google.maps.MapOptions {
	// onClick?: (e: google.maps.MapMouseEvent) => void;
	// onIdle?: (map: google.maps.Map) => void;
	children?: ReactNode;
}

const GoogleMaps: FC<MapProps> = ({
	children,
	...options
}) =>  {
	const ctx = useCtx();
	const {coordinate} = ctx!
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({lat: 35.1595454, lng: 126.8526012});
	const [lastAt, setLastAt] = useState<Date>(new Date())
	const [zoom, setZoom] = useState(14);
	const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);

	const render = (status: Status) => {
		return <h1>{status}</h1>;
	};
	const onIdle = (m: google.maps.Map) => {
		console.log("onIdle");
		setZoom(m.getZoom()!);
		setCenter(m.getCenter()!.toJSON());
	};
	const onClick = (e: google.maps.MapMouseEvent) => {
		setClicks([...clicks, e.latLng!]);
	};
	useEffect(()=> {
		setCenter({
			lat: coordinate.lat,
			lng: coordinate.lng,
		})
		setLastAt(new Date());
		console.log(coordinate);
	}, [coordinate])

	useEffect(() => {
		if (ref.current) {
			new window.google.maps.Map(ref.current, { center, zoom })
			setMap(new window.google.maps.Map(ref.current, { center, zoom }));
		}
		console.log('a');
		console.log('center', center)
	}, [ref, lastAt]);

	useEffect(() => {
		if (map) {
			["click", "idle"].forEach((eventName) =>
				google.maps.event.clearListeners(map, eventName)
			);
		
			if (onClick) {
				map.addListener("click", onClick);
			}
		
			if (onIdle) {
				map.addListener("idle", () => onIdle(map));
			}
		}
	}, [map, onClick, onIdle]);

	return (<Wrapper apiKey="AIzaSyD_8pLwS_D3xDZV5Q2RKdv5_dCnpuAptRI" render={render}>
		<div ref={ref} id="map" style={{ flexGrow: "1", height: "100%" }} >
			{map && Children.map(children, (child) => {
				if (isValidElement(child)) {
					return cloneElement(child, { map });
				}
			})}
		</div>
	</Wrapper>)
}

export default GoogleMaps;