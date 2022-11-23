import { Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import styled from '@mui/material/styles/styled';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BedroomBabyOutlined} from '@mui/icons-material/';
import { GrGroup, GrLocation } from "react-icons/gr";
import { TbBuildingLighthouse, TbBuildingSkyscraper } from "react-icons/tb";
import { GiSlippers } from "react-icons/gi";
import { grey } from "@mui/material/colors";

const group = [
    {title:'평화로움', icon: <GiSlippers size="24px" />  },
    {title:'독특함', icon: <TbBuildingLighthouse size="24px" /> },
    {title:'가족이 지내기에 적합', icon: <BedroomBabyOutlined/> },
    {title:'세련됨', icon: <TbBuildingSkyscraper size="24px" />  },
    {title:'중심부에 위치', icon: <GrLocation size="24px" /> },
    {title:'넓은 공간', icon: <GrGroup size="24px" /> }
]
const SelectButton = styled(ToggleButton) ({
    '&': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        height: '50px',
        padding: '4px 20px',
        color: grey[800]
    },
    '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
        border: '1px solid #0000001f !important',  
        borderRadius: '30px !important',
    },
    '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
        borderRadius: '30px !important',
    },
    '&.Mui-selected, &:hover': {
        borderColor: 'transparent !important',
        backgroundColor: '#66666608 !important',
        boxShadow: '0 0 0 2px #333'
    }
})
interface Props {
    descGroup: string[],
     setDescGroup: Dispatch<SetStateAction<string[]>>
}
export default function DescriptionGroup (props: Props) {
    const {descGroup, setDescGroup} = props
    const handleFormat = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[] | any,
      ) => {
        console.log(newFormats)
        if(newFormats.length >= 3 ) {
            setDescGroup(() => newFormats.shift())
        }
        setDescGroup(newFormats);
      };
    return ( <ToggleButtonGroup
        value={descGroup}
        onChange={handleFormat}
        aria-label="AmenitesGroup"
        sx={{ display: 'flex', flexWrap:'wrap', gap: 2, width: '90%', animation: 'fadein 1s'}}>
        <Typography variant="h5" align="left" sx={{mb: 1}}>숙소의 특징이 잘 드러나는 문구를 선택해 주세요</Typography>
        <Typography variant="body1" align="justify" sx={{fontWeight: 300, mb: 3, width: 1}}>
            최대 2개까지 선택할 수 있습니다.
        </Typography>
        {group.map((one, index) => {
            return <SelectButton value={one.title} aria-label={one.title} key={index}>
                {one.icon} {one.title}
            </SelectButton>
        })}
    </ToggleButtonGroup> )
}