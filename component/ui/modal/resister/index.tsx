import { useSession } from 'next-auth/react';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { isConstructorDeclaration } from 'typescript';
import { useCtx } from '../../../../context/context';
import { findEmail } from '../../../../lib/api/accountApi';
import CardTypeComponent from '../cardTypeComponent';
import BasicModal from "../index";
import AlreadyCheck from './alreadyCheckModal';
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
	const [email, setEmail] = useState<string | null>(null)
    const [show, setShow] = useState<boolean>(false);
    const {data: session, status} = useSession();
    const {open, onClose, closeMenu} = props;
    const ctx = useCtx();
    const {mode, userEmail, setUserEmail, alreadyChk, setMode} = ctx!
    const {provider, authUserName} = alreadyChk;
    useEffect(()=> {
        setShow(open);
    }, [open]);

    useEffect(()=> {
        onClose(show);
        if(show == false) {
            setMode(null);
        }
    }, [show]);
    
    useEffect(()=> {
        if(session && mode == 'Checked') {
            setShow(false);
        }
        if(mode == 'Commitment' && show == false && session !== null) {
            setShow(true)
        }
        if(mode == null && !session) {
            setUserEmail(undefined);
        }
    }, [mode, status])

    useEffect(()=> {
        if(alreadyChk.alreadyEmail !== null) {
            setMode('AlreadyChk');
            setShow(true);
        }
    }, [alreadyChk]);

	return (<BasicModal open={show} onClose={setShow}>
		<CardTypeComponent onClose={setShow} 
            title={ mode == 'Checked' && '로그인 또는 회원 가입' || 
                mode == 'SignUp' && '회원 가입 완료하기' || mode == 'Login' && '로그인' ||
                mode == 'PassFind' && '비밀번호를 잊으셨나요?' || 
                (mode == 'AlreadyChk' && provider == 'google' ) && `${authUserName}님, 다시 만나 반갑습니다 ` ||
                (mode == 'AlreadyChk' && provider == 'credentials' ) && '계정이 이미 존재합니다' ||
                mode == 'Commitment' && undefined
            }
            >
            {mode == 'Checked' && <Login />}
            {mode == 'SignUp' && <Signup />}
            {mode == 'Login' && <PassChk onClose={setShow} closeMenu={closeMenu}  />}
            {mode == 'PassFind' && <PassFind onClose={setShow} />}
            {mode == 'Commitment' && <Commitment onClose={setShow} />}
            {mode == 'AlreadyChk' && <AlreadyCheck onClose={setShow} />}
		</CardTypeComponent>
	</BasicModal>)
	
}