import {useState, useEffect, createContext, Dispatch, SetStateAction} from 'react'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Grid from "@mui/material/Grid";
import { ChidrenProps } from "../../../../interface/propsType";
import Left from "./left";
import Right from "./right";
import { useCtx } from '../../../../context/context';
import { HostingType } from '../../../../interface/hostingType';
import { getHostingList } from '../../../../lib/api/propertyApi';

interface HalfCtx {
    nextBtnDisabled: boolean,
    setNextBtnDisabled: Dispatch<SetStateAction<boolean>>,
    roomStep: number,
    setRoomStep: Dispatch<SetStateAction<number>>,
    savedData: HostingType | any,
    setSavedData: Dispatch<SetStateAction<HostingType | any>>,
    progressPer: (num: number) => number
}

export const HalfLayoutContext = createContext<HalfCtx|null>(null)

export default function HalfTypeLayout (props: ChidrenProps) {
    const [title, setTitle] = useState<string>('')
    const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);
    const [savedData, setSavedData] = useState<HostingType | any>({});
    const [roomStep, setRoomStep] = useState<number>(0);
    const {data: session} = useSession();
    const router = useRouter();
    const { roomid } = router.query;
    const pathname = router.pathname;
    const ctx = useCtx();
    const {hostLocation} = ctx!;
    
    const progressPer = (num: number) => {
        const totalStep = 11
        return (100 / totalStep) * num
    }
    
	useEffect(()=> {
        !(async () => {
            const rst = await getHostingList(roomid as string);
            setSavedData(rst.datas);
            console.log('rst.datas', rst.datas)
        })();
    }, [roomid, pathname]);
    
    useEffect(()=> {
        switch(pathname) {
            case '/become-a-host':
                setRoomStep(0)
                setTitle(`${session?.user?.name}님, 환영합니다.`);
                break;
            case "/become-a-host/[roomid]/property-type-group":
                setRoomStep(1)
                setTitle('호스팅할 숙소 유형을 알려주세요');
                break;
            case '/become-a-host/[roomid]/property-type':
                setRoomStep(2)
                setTitle('다음 중 숙소를 가장 잘 설명하는 문구는 무엇인가요?');
                break;
            case '/become-a-host/[roomid]/privacy-type':
                setRoomStep(3)
                setTitle('게스트가 머무르게 될 숙소의 종류가 무엇인가요?');
                break;
            case '/become-a-host/[roomid]/location':
                setRoomStep(4)
                setTitle('숙소 위치는 어디인가요?');
                break;
            case '/become-a-host/[roomid]/floor-plan':
                setRoomStep(5)
                setTitle('숙소에서 맞이할 최대 인원수를 알려주세요.');
                break;
            case '/become-a-host/[roomid]/amenities':
                setRoomStep(6)
                setTitle('숙소 편의시설 정보를 추가하세요');
                break;
            case '/become-a-host/[roomid]/photos':
                setRoomStep(7)
                setTitle('이제 숙소 사진을 올릴 차례입니다');
                break;
            case '/become-a-host/[roomid]/title':
                setRoomStep(8)
                setTitle('숙소 이름을 지어주세요');
                break;
            case '/become-a-host/[roomid]/description':
                setRoomStep(9)
                setTitle('숙소 설명을 작성해주세요');
                break;
            case '/become-a-host/[roomid]/price':
                setRoomStep(10)
                setTitle('이제 요금을 설정하실 차례입니다');
                break;
            case '/become-a-host/[roomid]/receipt':
                setRoomStep(11)
                setTitle('등록하실 숙소 정보를 검토하세요');
                break;
        }
    }, [pathname])
    
    useEffect(()=> {
        if(pathname == '/become-a-host/[roomid]/location' && hostLocation) {
            setTitle('핀이 놓인 위치가 정확한가요?');
        }
    }, [hostLocation]); 
    

    return ( <Grid container sx={{height: '100vh', overflow: 'hidden'}}>
        <HalfLayoutContext.Provider value={{nextBtnDisabled, setNextBtnDisabled, roomStep, setRoomStep, savedData, setSavedData, progressPer}}>
            <Left title={title} setTitle={setTitle} />
            <Right>
                {props.children}
            </Right>
        </HalfLayoutContext.Provider>
    </Grid> )
}

