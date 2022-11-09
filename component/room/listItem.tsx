import { Grid, ToggleButton, Typography } from "@mui/material";
import { Types } from "mongoose";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface Props {
    type?: string,    // 리스트 타입
    title: string, // 이름
    subTitle?: string,
    group: string,
    setGroup:  Dispatch<SetStateAction<string>>,
    image?: string,
    id?: string,
}
const buttonHover = {"&:hover": {
    border: '2px solid #333'
  }}
export default function ListItem(props: Props) {
    const {type, title, subTitle, group, setGroup, id, image} = props;
    console.log(group, title)
    return(<ToggleButton fullWidth
        sx={[{minHeight: "5.5rem", pr: 2, pl:3, borderRadius: 3, mb: 2 }, group === title && {border: '2px solid #333'}, buttonHover]}
        value={id ? id : title}
        color={"info"}
        onClick={() => setGroup(title)}
        selected={group === title}
      >
        {type == 'roomGroup' ? <Grid container alignItems="center">
        <Grid item flex="1">
            <Typography variant="h6" align="left" color="text.primary">{title}</Typography>
        </Grid>
        <Grid item>
            <Image
                alt={title}
                src={image}
                width={64}
                height={64}
                style={{ borderRadius: "0.5rem", verticalAlign: 'bottom' }}
            />
        </Grid>
        </Grid> : 

        <Grid container direction="column" justifyContent="center">
            <Typography variant="h6" align="left" color="text.primary">{title}</Typography>
            {subTitle && <Typography variant="body2" align="left" color="text.secondary">{subTitle}</Typography> }
        </Grid>}
      </ToggleButton>)
}