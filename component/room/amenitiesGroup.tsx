import { Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {WifiRounded, TvRounded, DirectionsCarRounded, SpeedRounded, LocalLaundryServiceRounded, CountertopsRounded, AcUnitRounded, DeskRounded, Pool, HotTubRounded, DeckRounded,
    OutdoorGrillRounded, BalconyRounded, FireExtinguisherRounded, FireplaceRounded, FitnessCenterRounded, HouseboatRounded, DownhillSkiingRounded, MedicalServicesRounded} from '@mui/icons-material/';
import { RiBilliardsFill, RiDoorLockBoxFill, RiAlarmWarningFill, RiAlarmWarningLine } from "react-icons/ri";
import { GiGrandPiano } from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import { FaShower } from "react-icons/fa";
import { WiFire } from "react-icons/wi";
import styled from "@emotion/styled";

const group1 = [
    {title:'무선 인터넷', icon: <WifiRounded /> },
    {title: 'TV', icon: <TvRounded /> },
    {title: '주방', icon: <CountertopsRounded /> },
    {title: '세탁기', icon: <LocalLaundryServiceRounded />},
    {title: '건물 내 무료 주차', icon: <DirectionsCarRounded />},
    {title: '건물 내 유료 주차', icon: <SpeedRounded />},
    {title: '에어컨', icon: <AcUnitRounded /> },
    {title: '업무 전용 공간', icon:<DeskRounded /> },
]
const group2 = [
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
const group3 = [
    {title:'화재경보기', icon: <RiAlarmWarningFill size="24px" />  },
    {title:'구급 상자', icon: <MedicalServicesRounded /> },
    {title:'소화기', icon: <FireExtinguisherRounded /> },
    {title:'침실문 잠금장치', icon: <RiDoorLockBoxFill size="24px" />  },
    {title:'일산화탄소 경보기', icon: <RiAlarmWarningLine size="24px" /> }
]
const SelectButton = styled(ToggleButton) ({
    '&': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'calc((100% - (16px*2))/3)',
        height: '80px'
    },
    '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
        border: '1px solid #0000001f',  
        borderRadius: '4px'
    },
    '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
        borderRadius: '4px'
    },
    '&.Mui-selected': {
        border: '2px solid #000000de !important'
    }
})
interface Props {
    amenities: string[],
    setAmenities: Dispatch<SetStateAction<string[]>>
}
export default function AmenitiesGroup (props: Props) {
    const {amenities, setAmenities} = props

    const handleFormat = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[],
      ) => {
        setAmenities(newFormats);
      };
    useEffect(()=> {
        console.log(amenities)

    }, [amenities])
    return ( <ToggleButtonGroup
        value={amenities}
        onChange={handleFormat}
        aria-label="AmenitesGroup"
        sx={{ display: 'flex', flexWrap:'wrap', gap: 2}}>
        <Typography variant="h6" sx={{width: '100%'}}>다음 인기 편의시설이 있나요?</Typography>
        {group1.map((one, index) => {
            return <SelectButton value={one.title} aria-label={one.title} key={index}>
                {one.icon} {one.title}
            </SelectButton>
        })}
        <Typography variant="h6" sx={{width: '100%', mt: 2}}>다음 인기 편의시설이 있나요?</Typography>
        {group2.map((one, index) => {
            return <SelectButton value={one.title} aria-label={one.title} key={index}>
                {one.icon} {one.title}
            </SelectButton>
        })}
        <Typography variant="h6" sx={{width: '100%', mt: 2}}>다음과 같은 안전 관련 물품이 있나요?</Typography>
        {group3.map((one, index) => {
            return <SelectButton value={one.title} aria-label={one.title} key={index}>
                {one.icon} {one.title}
            </SelectButton>
        })}
        </ToggleButtonGroup> )
}