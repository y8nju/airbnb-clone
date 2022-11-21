import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {Grid, Typography} from "@mui/material/";
import HalfFooter from "./footer";
import HalfHeader from "./header";
import { useRouter } from 'next/router';

interface Props {
	children: React.ReactElement;
}

export default function Right (props: Props) {
    const router = useRouter();
    const pathname = router.pathname;
    const intro = '/become-a-host/intro'
    const celebration = '/become-a-host/[roomid]/publish-celebration';

    const {children} = props;
    return (
        <Grid item flex={1} position="relative" sx={[{overflow: 'hidden'},
            ((pathname == intro) || (pathname == celebration)) && { backgroundColor: '#000'}]}>
            {children}
        </Grid> )
}