
import {WifiRounded, TvRounded, DirectionsCarRounded, SpeedRounded, LocalLaundryServiceRounded, CountertopsRounded, AcUnitRounded, DeskRounded, Pool, HotTubRounded, DeckRounded,
    OutdoorGrillRounded, BalconyRounded, FireExtinguisherRounded, FireplaceRounded, FitnessCenterRounded, HouseboatRounded, DownhillSkiingRounded, MedicalServicesRounded, WhatshotOutlined} from '@mui/icons-material/';
import { RiBilliardsFill, RiDoorLockBoxFill, RiAlarmWarningFill, RiAlarmWarningLine } from "react-icons/ri";
import { GiGrandPiano } from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import { FaShower } from "react-icons/fa";
import { WiFire } from "react-icons/wi";

export interface AmenityType {
    title: String,
    icon: JSX.Element
}

export const group1: AmenityType[] = [
    {title:'무선 인터넷', icon: <WifiRounded /> },
    {title: 'TV', icon: <TvRounded /> },
    {title: '주방', icon: <CountertopsRounded /> },
    {title: '세탁기', icon: <LocalLaundryServiceRounded />},
    {title: '건물 내 무료 주차', icon: <DirectionsCarRounded />},
    {title: '건물 내 유료 주차', icon: <SpeedRounded />},
    {title: '에어컨', icon: <AcUnitRounded /> },
    {title: '업무 전용 공간', icon:<DeskRounded /> },
]
export const group2: AmenityType[] = [
    {title:'수영장', icon: <Pool /> },
    {title:'온수 욕조', icon: <HotTubRounded /> },
    {title:'파티오', icon:  <BalconyRounded /> },
    {title:'바비큐 그릴', icon: <OutdoorGrillRounded />  },
    {title:'야외 식사 공간', icon:  <DeckRounded />},
    {title:'화로', icon: <WiFire size="28px" style={{marginBottom: '-4px'}} /> },
    {title:'당구대', icon:  <RiBilliardsFill size="24px" /> },
    {title:'실내 벽난로', icon:  <FireplaceRounded />},
    {title:'피아노', icon: <GiGrandPiano size="24px" /> },
    {title:'운동 기구', icon:  <FitnessCenterRounded />},
    {title:'호수로 연결됨', icon: <HouseboatRounded />  },
    {title:'해변과 인접', icon: <TbBeach size="24px" />  },
    {title:'스키를 탄 채로 출입 가능', icon: <DownhillSkiingRounded /> },
    {title:'야외 샤워 시설', icon: <FaShower size="24px" /> },
]
export const group3: AmenityType[] = [
    {title:'화재경보기', icon: <RiAlarmWarningFill size="24px" />  },
    {title:'구급 상자', icon: <MedicalServicesRounded /> },
    {title:'소화기', icon: <FireExtinguisherRounded /> },
    {title:'침실문 잠금장치', icon: <RiDoorLockBoxFill size="24px" />  },
    {title:'일산화탄소 경보기', icon: <RiAlarmWarningLine size="24px" /> }
]
export const amenitiesGroup: AmenityType[] = [
    {title:'전체', icon: <WhatshotOutlined />},
    ...group1, ...group2, ...group3
]