import { Grid, ToggleButtonGroup, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import AmenityItem from "./amenityItem";
import {WifiRounded, TvRounded, DirectionsCarRounded, SpeedRounded, LocalLaundryServiceRounded, CountertopsRounded, AcUnitRounded, DeskRounded} from '@mui/icons-material/';
import Box from "@mui/material/Box";

interface Props {
    formats: string[],
    setFormats: Dispatch<SetStateAction<string[]>>
}
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
export default function AmenitiesGroup (props: Props) {
    const {formats, setFormats} = props
    const handleFormat = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[],
      ) => {
        setFormats(newFormats);
      };
    return ( <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="AmenitesGroup"
        sx={{ display: 'flex', height: '100%', flexDirection: 'column', flexWrap:'wrap', gap: 3}}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
            <Typography variant="h6" sx={{mb: 2}}>다음 인기 편의시설이 있나요?</Typography>
            <Box sx={{display: 'flex', rowGap: 2, columnGap: 10,  flexWrap: 'wrap'}}>
                {group1.map((one, index) => {
                    return <AmenityItem title={one.title} icon={one.icon} key={index} />
                })}
            </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection:'column'}}>    
            <Typography variant="h6" sx={{mb: 2}}>다음 인기 편의시설이 있나요?</Typography>
            <Box sx={{display: 'flex', rowGap: 2, columnGap: 10,  flexWrap: 'wrap'}}>
                {group1.map((one, index) => {
                    return <AmenityItem title={one.title} icon={one.icon} key={index} />
                })}
            </Box>
        </Box>
        </ToggleButtonGroup> )
}