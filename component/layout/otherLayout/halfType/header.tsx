import {Button, Grid } from "@mui/material/";

interface Props {
    headerShow: boolean
}

export default function HalfHeader (props: Props) {
    const {headerShow} = props;
    if(!headerShow) {
        return <></>
    }

    return ( <Grid container sx={{height: '88px', px: '48px'}} position="absolute" top={0} alignItems="center" justifyContent="flex-end">
        <Grid item sx={{mr: 2}}>
            <Button color="inherit" sx={{backgroundColor: '#0000000a', fontSize: '12px', borderRadius: 10, px: 2}}>도움말</Button>
        </Grid>
        <Grid item>
            <Button color="inherit" sx={{backgroundColor: '#0000000a', fontSize: '12px', borderRadius: 10, px: 2}}>저장 및 나가기</Button>
        </Grid>
    </Grid> )
}