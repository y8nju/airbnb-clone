import { useSession } from 'next-auth/react';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useCtx } from '../../../context/context';
import CardTypeComponent from '../cardTypeComponent';
import BasicModal from "../index";
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
    const {status} = useSession();
    const {open, onClose, closeMenu} = props;
	const [show, setShow] = useState<boolean>(false);
    const ctx = useCtx();
    const {mode} = ctx!
    useEffect(()=> {
        setShow(open);
    }, [open]);
    useEffect(()=> {
        onClose(show);
    }, [show])
    if(mode =='Session') {
        if(show == true) {
            setShow(false);
        }
    }
	return (<BasicModal open={show} onClose={setShow}>
		<CardTypeComponent onClose={setShow} 
            title={ mode == 'Checked' && '로그인 또는 회원 가입' || 
                mode == 'SignUp' && '회원 가입 완료하기' || mode =='Checked' && '로그인' ||
                mode == 'PassFind'&& '비밀번호를 잊으셨나요?'  
            }
            >
            {mode == 'Checked' && <Login />}
            {mode == 'SignUp' && <Signup />}
            {mode == 'Login' && <PassChk onClose={setShow} closeMenu={closeMenu}  />}
            {mode == 'PassFind' && <PassFind onClose={setShow} />}
		</CardTypeComponent>
	</BasicModal>)
	
}