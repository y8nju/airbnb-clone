import {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Grid from "@mui/material/Grid";
import { ChidrenProps } from "../../../../interface/propsType";
import Left from "./left";
import Right from "./right";



export default function HalfTypeLayout (props: ChidrenProps) {
    
    const [footerShow, setFooterShow] = useState<boolean>(true);
    const [headerShow, setHeaderShow] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(10);
    const [title, setTitle] = useState<string>('')
    const {data: session} = useSession();
    const router = useRouter();
    console.log(router);
    const pathname = router.pathname;
    
    useEffect(()=> {
        
    switch(pathname) {
        case '/become-a-host':
            setTitle(`${session?.user?.name}님, 환영합니다.`)
            setFooterShow(false);
            break;
    }
    })
    console.log(title)
    

    return ( <Grid container sx={{height: '100vh'}}>
        <Left title={title} />
        <Right progress={progress} setProgress={setProgress} footerShow={footerShow} headerShow={headerShow} >
            {props.children}
        </Right>
    </Grid> )
}

