import {Button, Grid, Tooltip } from "@mui/material/";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { deletedList } from "../../../../lib/api/propertyApi";
import dbConnect from "../../../../lib/dbConnect";
import Hosting from "../../../../lib/models/hosting";
interface Props {
    saveHandle?:  () => void
}
export default function HalfHeader (props: Props) {
    const router = useRouter();
    const pathname = router.pathname;
    const become = '/become-a-host';
    const intro = '/become-a-host/intro';
    const location = '/become-a-host/[roomid]/location';
    const {saveHandle} = props;
    const savedAndCloseHandle = () => {
        saveHandle!();
        setTimeout(() => {
            router.push("/become-a-host", undefined, { shallow: true });
        }, 50);
    }
    const deletedHandle = async () => {
        const {roomid} = router.query;
        const res = await deletedList(roomid as string);
        if(res.result) {
            router.push("/become-a-host", undefined, { shallow: true });
        }
    }

    if(pathname == intro) {
        return (<Grid container sx={{height: '88px', px: '48px'}} position="absolute" top={0} alignItems="center" justifyContent="flex-end" zIndex={2000}>
            <Grid item>
                <Button color="info" variant="contained" sx={{backgroundColor: '#222222', fontSize: '12px', borderRadius: 10, px: 2}}
                    onClick={()=> router.push("/become-a-host")} >나가기</Button>
            </Grid>
        </Grid>)
    }
    if(pathname == become) {
        return (<Grid container sx={{height: '88px', px: '48px'}} position="absolute" top={0} alignItems="center" justifyContent="flex-end" zIndex={2000}>
            <Grid item>
                <Button color="info" variant="contained" sx={{backgroundColor: '#222222', fontSize: '12px', borderRadius: 10, px: 2}}
                    onClick={()=> router.push("/hosting")} >나가기</Button>
            </Grid>
        </Grid>)
    }


    return ( <Grid container sx={{height: '88px', px: '48px'}} position="absolute" top={0} alignItems="center" justifyContent="flex-end" zIndex={2000}>
        <Grid item sx={{mr: 2}}>
            <Tooltip title="버튼을 누르면 등록 중인 숙소가 삭제됩니다">
                <Button color="info" variant="contained"
                onClick={deletedHandle}
                sx={[{fontSize: '12px', borderRadius: 10, px: 2}, location && {backgroundColor: grey[800], color: '#fff'}]}>
                    삭제하기</Button>
            </Tooltip>
        </Grid>
        <Grid item>
            <Button color="info" variant="contained"
                onClick={savedAndCloseHandle}
                sx={[{fontSize: '12px', borderRadius: 10, px: 2}, location && {backgroundColor: grey[800], color: '#fff'}]}>
                저장 및 나가기</Button>
        </Grid>
    </Grid> )
}