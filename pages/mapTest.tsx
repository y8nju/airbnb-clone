import { useCallback, useEffect, useRef, useState } from 'react';
import { HostingType } from '../interface/hostingType';
import { CoorsType } from '../interface/mapsType';
function Map({ data }: { data: HostingType }) {
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

    const map = new google.maps.Map(mapElement.current!, {
      zoom: 17,
      center: coords,
      mapTypeControl: false,
      fullscreenControl: false,
    });
    new google.maps.Marker({
      position: coords,
      map,
    });
  }, []);


  useEffect(() => {
    const script = window.document.getElementsByTagName('script')[0];
    const includeCheck = script.src.startsWith(
      'https://maps.googleapis.com/maps/api'
    );


    // script 중복 호출 방지
    if (includeCheck) return initMap();


    window.initMap = initMap;
  }, [initMap]);


  return (<>
  <div ref={mapElement} style={{ minHeight: '400px' }} />
  <script async src={`https://maps.googleapis.com/maps/api/js?key=${appKey}&libraries=places&region=kr&callback=initMap&libraries=marker?v=beta`}></script>
  </>);
}


export default Map;

Map.layout = 'noLayout';