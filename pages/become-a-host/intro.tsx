import Head from "next/head";
import HalfFooter from "../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../component/layout/otherLayout/halfType/header";
import RightInner from "../../component/layout/otherLayout/halfType/rightInner";
import IntroRight from "../../component/room/intro/introRight";

export default function Intro () {
    
    return ( <RightInner footerShow={true} headerShow={true} >
        <>
        <HalfHeader />
        <Head>
            <title>에어비앤비 호스트가 되어 보세요</title>
        </Head>
        <IntroRight />
        <HalfFooter progress={0} />
        </>
    </RightInner>)
}
Intro.layout = "halfType";