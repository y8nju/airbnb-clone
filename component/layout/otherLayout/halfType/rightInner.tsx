import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
    footerShow: boolean,
    headerShow: boolean
}

export default function RightInner (props: Props) {
    
    const router = useRouter();
    const pathname = router.pathname;
    const location = '/become-a-host/[roomid]/location';
    const {children, footerShow, headerShow} = props; 
    return ( <Grid container sx={[
        (!headerShow || pathname == location) && {height: 'calc( 100vh - 80px)', mb: '80px', overflowY: 'scroll'} ||
        !footerShow && {height: 'calc( 100vh - 88px)', mt: '88px', overflowY: 'scroll'} ||
        {height: 'calc( 100vh - 80px - 88px)', mb: '80px', mt: '88px', overflowY: 'scroll'}
        ]}>
            {children}
    </Grid>)
}