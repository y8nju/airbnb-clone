import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Box } from "@mui/material";
import { Children, cloneElement, FC, isValidElement, ReactNode, useEffect, useRef, useState } from "react";
import { useCtx } from "../../../context/context";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import { createStaticMapUri } from "../../../lib/api/mapsApi";

function MapComponent() {
    const ctx = useCtx();
    const {coordinate, setCoordinate} = ctx!
    const ref = useRef<HTMLDivElement>(null);
    let map: google.maps.Map;
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({lat: coordinate.lat, lng: coordinate.lng});
    const {lat, lng} = center;

    useEffect(()=> {
      setCenter({
        lat: coordinate.lat,
        lng: coordinate.lng,
      })
	}, [coordinate])

    useEffect(() => {
      map = new window.google.maps.Map(ref.current!, {
        center: center,
        zoom: 17,
        zoomControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      });
      const image = {
        url: "/images/icons/marker.svg",
        scaledSize: new google.maps.Size(60, 60), // scaled size
    };
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng( lat, lng), 
        map: map,
        icon: image,
      });
      map.addListener("center_changed", () => {
        const center = map.getCenter();
        marker.setPosition({ lat: center?.lat()!, lng: center?.lng()! });
        const coords = { 
            lat: center?.lat()!, 
            lng: center?.lng()! 
        }
        const mapUri = createStaticMapUri(coords);
        setCoordinate({...coords, imgUrl: mapUri});
      });
    }, []);
    return (
      <>
        <div ref={ref} id="map" style={{ flexGrow: "1", height: "100%" }} >
		</div>
        {/* <WhereToVoteIcon
            color="info"
            sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 60,
            zIndex: 3000
            }}
            style={{transform: 'translate(-50%, -50%)'}}
        /> */}
      </>
    );
  }
export default function GoogleMaps() {
    return (
      <Wrapper apiKey={"AIzaSyBIKO-QSz7hpvEV8hXROI0TpdykK5LItwI"}>
        <MapComponent />
      </Wrapper>
    );
  }