import { Grid } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
	children: React.ReactElement;
    footerShow: boolean,
    headerShow: boolean
}

export default function RightInner (props: Props) {

    const {children, footerShow, headerShow} = props;
    return ( <Grid container sx={[
        !headerShow && {height: 'calc( 100vh - 88px)', mb: '88px', overflowY: 'scroll'} ||
        !footerShow && {height: 'calc( 100vh - 80px)', mt: '80px', overflowY: 'scroll'} ||
        {height: 'calc( 100vh - 80px - 88px)', mb: '80px', mt: '88px', overflowY: 'scroll'}
        ]}>
            {children}
    </Grid>)
}