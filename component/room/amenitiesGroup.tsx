import { Grid, ToggleButton,  ToggleButtonGroup, Typography } from "@mui/material";
import styled from '@mui/material/styles/styled';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {WifiRounded, TvRounded, DirectionsCarRounded, SpeedRounded, LocalLaundryServiceRounded, CountertopsRounded, AcUnitRounded, DeskRounded, Pool, HotTubRounded, DeckRounded,
    OutdoorGrillRounded, BalconyRounded, FireExtinguisherRounded, FireplaceRounded, FitnessCenterRounded, HouseboatRounded, DownhillSkiingRounded, MedicalServicesRounded} from '@mui/icons-material/';
import { RiBilliardsFill, RiDoorLockBoxFill, RiAlarmWarningFill, RiAlarmWarningLine } from "react-icons/ri";
import { GiGrandPiano } from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import { FaShower } from "react-icons/fa";
import { WiFire } from "react-icons/wi";
import { grey } from "@mui/material/colors";
import { group1, group2, group3 } from "../../lib/utils/amenitiesGroup";

const SelectButton = styled(ToggleButton) ({
    '&': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'calc((100% - (16px*2))/3)',
        height: '80px', 
        color: grey[800]
    },
    '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
        border: '1px solid #0000001f',  
        borderRadius: '4px'
    },
    '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
        borderRadius: '4px'
    },
    '&.Mui-selected, &:hover': {
        borderColor: 'transparent !important',
        backgroundColor: '#66666608 !important',
        boxShadow: '0 0 0 2px #333'
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
            return <SelectButton value={one.title} key={index}>
                {one.icon} {one.title}
            </SelectButton>
        })}
        <Typography variant="h6" sx={{width: '100%', mt: 2}}>다음 인기 편의시설이 있나요?</Typography>
        {group2.map((one, index) => {
            return <SelectButton value={one.title} key={index}>
                {one.icon} {one.title}
            </SelectButton>
        })}
        <Typography variant="h6" sx={{width: '100%', mt: 2}}>다음과 같은 안전 관련 물품이 있나요?</Typography>
        {group3.map((one, index) => {
            return <SelectButton value={one.title} key={index}>
                {one.icon} {one.title}
            </SelectButton>
        })}
        </ToggleButtonGroup> )
}