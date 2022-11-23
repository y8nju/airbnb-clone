import Head from "next/head";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import { Grid, Typography } from "@mui/material"
import { useSession } from "next-auth/react";

export default function RoomPublishCelebration () {
    
    return ( <RightInner footerShow={true} headerShow={true} >
        <>
        <Head>
            <title>호스트가 되신 것을 환영합니다 - 에어비앤비</title>
        </Head>
        <Grid container justifyContent="center" alignItems="center" direction="column" sx={{color: '#fff'}}>
            <Grid sx={{width: '480px', textAlign: 'center'}}>
                <Typography variant="h3" align="left" sx={{fontWeight: 600}}>
                 
                </Typography>
                <Typography variant="h3" align="left" sx={{fontWeight: 600, mb: 4}}>
                    축하합니다!
                </Typography>
                <Typography align="left" sx={{mb: 4 }}>
                    에어비앤비 호스트가 되신 것을 진심으로 환영합니다. 숙소 호스팅을 통해 게⁠스⁠트⁠에⁠게 놀⁠라⁠운 경⁠험⁠을 선⁠사⁠하⁠는 데 동⁠참⁠해⁠주⁠셔⁠서 감⁠사⁠합⁠니⁠다.
                </Typography>
                <Typography align="left">
                    - 에어비앤비 드림
                </Typography>
            </Grid>
        </Grid>
        <HalfFooter progress={0} />
        </>
    </RightInner>)
}
RoomPublishCelebration.layout = "halfType";