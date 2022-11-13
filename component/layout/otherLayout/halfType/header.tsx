import {Button, Grid } from "@mui/material/";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
interface Props {
    saveHanle?: () => void;
}
export default function HalfHeader (props: Props) {
    const router = useRouter();
    const pathname = router.pathname;
    const intro = '/become-a-host/intro'
    const location = '/become-a-host/[roomid]/location';

    if(pathname == intro) {
        return (<Grid container sx={{height: '88px', px: '48px'}} position="absolute" top={0} alignItems="center" justifyContent="flex-end" zIndex={2000}>
            <Grid item>
                <Button color="info" variant="contained" sx={{backgroundColor: '#222222', fontSize: '12px', borderRadius: 10, px: 2}}
                    onClick={()=> router.push("/become-a-host")} >나가기</Button>
            </Grid>
        </Grid>)
    }

    return ( <Grid container sx={{height: '88px', px: '48px'}} position="absolute" top={0} alignItems="center" justifyContent="flex-end" zIndex={2000}>
        <Grid item sx={{mr: 2}}>
            <Button color="inherit" sx={[{backgroundColor: '#0000000a', fontSize: '12px', borderRadius: 10, px: 2}, location && {backgroundColor: grey[800], color: '#fff'}]}>도움말</Button>
        </Grid>
        <Grid item>
            <Button color="inherit" sx={[{backgroundColor: '#0000000a', fontSize: '12px', borderRadius: 10, px: 2}, location && {backgroundColor: grey[800], color: '#fff'}]}>저장 및 나가기</Button>
        </Grid>
    </Grid> )
}