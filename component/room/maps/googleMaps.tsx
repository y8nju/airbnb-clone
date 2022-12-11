import { Wrapper } from "@googlemaps/react-wrapper";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCtx } from "../../../context/context";
import { createStaticMapUri } from "../../../lib/api/mapsApi";

const appKey = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY;

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

	const loadScript = (url: string) => {
		var index  = window.document.getElementsByTagName("script")[0]
		var script = window.document.createElement("script")
		script.src = url
		script.async = true
		script.defer = true
		index?.parentNode?.insertBefore(script, index)
	}

  const initMap = useCallback(() =>{
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

  useEffect(() => {
    const script = window.document.getElementsByTagName('script')[0];
    const includeCheck = script.src.startsWith(
    'https://maps.googleapis.com/maps/api'
    );
  
    if (includeCheck) return initMap();
  
    window.initMap = initMap;
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${appKey}&libraries=places&region=kr`)
  }, [initMap, loadScript]);

  return <div ref={ref} id="map" style={{ flexGrow: "1", height: "100%" }} ></div>
}  

export default function GoogleMaps() {
  return (
    <Wrapper apiKey={appKey as string}>
      <MapComponent />
    </Wrapper>
  );
}