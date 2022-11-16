import {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Grid from "@mui/material/Grid";
import { ChidrenProps } from "../../../../interface/propsType";
import Left from "./left";
import Right from "./right";
import { useCtx } from '../../../../context/context';



export default function HalfTypeLayout (props: ChidrenProps) {
    const [title, setTitle] = useState<string>('')
    const {data: session} = useSession();
    const router = useRouter();
    // console.log(router);
    const pathname = router.pathname;
    const ctx = useCtx();
    const {hostLocation} = ctx!;
    
    useEffect(()=> {
        switch(pathname) {
            case '/become-a-host':
                setTitle(`${session?.user?.name}님, 환영합니다.`);
                break;
            case "/become-a-host/[roomid]/property-type-group":
                setTitle('호스팅할 숙소 유형을 알려주세요');
                break;
            case '/become-a-host/[roomid]/property-type':
                setTitle('다음 중 숙소를 가장 잘 설명하는 문구는 무엇인가요?');
                break;
            case '/become-a-host/[roomid]/privacy-type':
                setTitle('게스트가 머무르게 될 숙소의 종류가 무엇인가요?');
                break;
            case '/become-a-host/[roomid]/location':
                setTitle('숙소 위치는 어디인가요?');
                break;
        }
    })
    
    useEffect(()=> {
        console.log('aaaaaaaaa')
        console.log('title', title)
        setTitle('핀이 놓인 위치가 정확한가요?');
    }, [hostLocation]); 
    

    return ( <Grid container sx={{height: '100vh', overflow: 'hidden'}}>
        <Left title={title} setTitle={setTitle} />
        <Right>
            {props.children}
        </Right>
    </Grid> )
}

