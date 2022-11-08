import { useSession } from 'next-auth/react';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { isConstructorDeclaration } from 'typescript';
import { useCtx } from '../../../context/context';
import { findEmail } from '../../../lib/api/accountApi';
import CardTypeComponent from '../cardTypeComponent';
import BasicModal from "../index";
import Commitment from './commitmentModal';
import Login from './loginModal';
import PassChk from './passChkModal';
import PassFind from './passFindModal';
import Signup from './signUpModal';
interface Open {
	open: boolean;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
    closeMenu: () => void;
}
export default function LoginAndSignUp(props: Open) {
	const [show, setShow] = useState<boolean>(false);
    const {data: session, status} = useSession();
    const {open, onClose, closeMenu} = props;
    const ctx = useCtx();
    const {mode,userEmail, setMode} = ctx!
    let commShow: string | boolean = false;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        commShow = localStorage.getItem('commShow');
    }

    useEffect(()=> {
        setShow(open);
    }, [open]);
    useEffect(()=> {
        onClose(show);
    }, [show]);

    //-- 소셜 로그인 서약 동의
    useEffect(()=> {
        if(status == 'authenticated' && commShow == null) {
            window.localStorage.setItem('commShow', 'true');
        }
    }, [status])
    useEffect(()=> {
        console.log(commShow)
        if(commShow == null) {
            setMode(null);
        }
        if(status == 'authenticated' && commShow == 'true') {
            (async () => {
                let resp = await findEmail(session?.user.email as string);
                if(resp?.data?.visible == null) {
                    return setMode('Commitment');
                }
            })()
        }
    }, [commShow])
    // -- 소셜 로그인 서약 동의
    
    useEffect(()=> {
        console.log(mode)
        if(session && mode == 'Checked') {
            setShow(false);
        }
        if(mode == 'Commitment' && show == false && session !== null) {
            setShow(true)
        }
    }, [mode, status])
	return (<BasicModal open={show} onClose={setShow}>
		<CardTypeComponent onClose={setShow} 
            title={ mode == 'Checked' && '로그인 또는 회원 가입' || 
                mode == 'SignUp' && '회원 가입 완료하기' || mode == 'Login' && '로그인' ||
                mode == 'PassFind'&& '비밀번호를 잊으셨나요?' || mode == 'Commitment' && undefined
            }
            >
            {mode == 'Checked' && <Login />}
            {mode == 'SignUp' && <Signup />}
            {mode == 'Login' && <PassChk onClose={setShow} closeMenu={closeMenu}  />}
            {mode == 'PassFind' && <PassFind onClose={setShow} />}
            {mode == 'Commitment' && <Commitment onClose={setShow} />}
		</CardTypeComponent>
	</BasicModal>)
	
}