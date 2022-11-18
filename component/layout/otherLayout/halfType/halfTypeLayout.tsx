import {useState, useEffect, createContext, Dispatch, SetStateAction} from 'react'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Grid from "@mui/material/Grid";
import { ChidrenProps } from "../../../../interface/propsType";
import Left from "./left";
import Right from "./right";
import { useCtx } from '../../../../context/context';

interface HalfCtx {
    nextBtnDisabled: boolean,
    setNextBtnDisabled: Dispatch<SetStateAction<boolean>>
}

export const HalfLayoutContext = createContext<HalfCtx|null>(null)

export default function HalfTypeLayout (props: ChidrenProps) {
    const [title, setTitle] = useState<string>('')
    const {data: session} = useSession();
    const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false);
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
            case '/become-a-host/[roomid]/floor-plan':
                setTitle('숙소에서 맞이할 최대 인원수를 알려주세요.');
                break;
            case '/become-a-host/[roomid]/amenities':
                setTitle('숙소 편의시설 정보를 추가하세요');
                break;
            case '/become-a-host/[roomid]/photos':
                setTitle('이제 숙소 사진을 올릴 차례입니다');
                break;
        }
    }, [pathname])
    
    useEffect(()=> {
        if(pathname == '/become-a-host/[roomid]/location' && hostLocation) {
            setTitle('핀이 놓인 위치가 정확한가요?');
        }
    }, [hostLocation]); 
    

    return ( <Grid container sx={{height: '100vh', overflow: 'hidden'}}>
        <Left title={title} setTitle={setTitle} />
        <HalfLayoutContext.Provider value={{nextBtnDisabled, setNextBtnDisabled}}>
            <Right>
                {props.children}
            </Right>
        </HalfLayoutContext.Provider>
    </Grid> )
}

