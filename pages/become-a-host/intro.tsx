import HalfFooter from "../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../component/layout/otherLayout/halfType/header";
import RightInner from "../../component/layout/otherLayout/halfType/rightInner";
import IntroRight from "../../component/room/intro/introRight";

export default function Intro () {
    
    return ( <RightInner footerShow={true} headerShow={true} >
        <>
        <HalfHeader />
        <IntroRight />
        <HalfFooter progress={0} />
        </>
    </RightInner>)
}
Intro.layout = "halfType";