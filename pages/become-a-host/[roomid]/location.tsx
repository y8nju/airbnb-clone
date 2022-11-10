import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";

export default function RoomLocation () {
    const router = useRouter();
    const {roomId} = router.query;
    const nextStepHandle = async () => {

    }
    
    return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
        <Grid container direction="column" position="relative" sx={{width: 1, mt: 0, ml: 0}}>
            <Box sx={{width: 1, height: '100%'}} position="absolute">
                <Image src='https://images.unsplash.com/photo-1667924743664-689b4d5bab13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80' fill alt="test" />
            </Box>
            <Grid sx={{width: 1, height: '100%', display: 'flex', justifyContent: 'center'}} position="relative" top="0" zIndex={100}>
                <Box><Button variant="contained">Autoplace Input</Button></Box>
            </Grid>
        </Grid>
        <HalfFooter progress={40} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomLocation.layout = "halfType";