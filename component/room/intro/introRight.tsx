import { Grid, Typography } from "@mui/material"

export default function IntroRight() {
    return (<Grid container justifyContent="center" alignItems="center" direction="column" sx={{color: '#fff'}}>
        <Grid sx={{width: '480px', textAlign: 'center'}}>
            <Typography variant="h3" sx={{fontWeight: 600, mb: 4}}>
                간단한 10단계로 호스팅 시작하기
            </Typography>
            <Typography>
                에어비앤비 호스트가 되어보세요.
            </Typography>
            <Typography>
                에어비앤비에서 모든 과정을 도와드립니다.
            </Typography>
        </Grid>
    </Grid>)
}