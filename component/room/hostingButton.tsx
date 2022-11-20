import styled from "@emotion/styled";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import { MdHomeFilled } from "react-icons/md";

interface Props {
    type?: string,    // 리스트 타입
    title: string, // 이름
    image?: string,
    id?: string,
    children?: ReactNode;
    onClick: (data: string) => void;
}
const ItemBtn = styled(Button) ({
    '&': {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        minHeight: "4.4rem", 
        padding: '0 16px',
        borderRadius: '12px', 
        marginBottom: '8px',
    }, 
    '&.Mui-selected, &:hover': {
        borderColor: 'transparent !important',
        backgroundColor: '#66666608 !important',
        boxShadow: '0 0 0 2px #333'
    }
})
export default function HostingButton(props: Props) {
    const {type, title, id, image, children, onClick} = props;
    
    const onClickHandle = () => {
        onClick(title);
    };
    return(<ItemBtn fullWidth
        variant="outlined"
        sx={[type == 'roomGroup' && {height: '5.5rem'}]}
        value={id ? id : title}
        color={"info"}
        onClick={onClickHandle}
      >
        <Grid item alignItems="center" sx={{display: 'flex'}}>
            {type == 'add' && <AddHomeOutlinedIcon fontSize="large" />}
            {type == 'room' && <MdHomeFilled size="35px"/>}
        </Grid>
        <Grid item flex="1" alignItems="center" sx={{display: 'flex', gap: 1}}>
            {children}
            <Typography variant="body1" align="left" color="text.primary" 
                sx={{fontWeight: 500}}>{title}</Typography>
        </Grid>
        <Grid item alignItems="center" sx={{display: 'flex'}}>
            <ArrowForwardIosIcon />
        </Grid>
      </ItemBtn>)
}