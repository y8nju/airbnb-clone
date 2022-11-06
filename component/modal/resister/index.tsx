import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
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
	const [emailType, setEmailType] = useState(false);
    const {open, onClose, closeMenu} = props;
	const ctx = useCtx();
    const {mode} = ctx!

	return (<BasicModal open={open} onClose={onClose}>
		<CardTypeComponent onClose={onClose} 
            title={mode == 'Checked' && '로그인 또는 회원 가입' || 
                mode == 'SignUp' && '회원 가입 완료하기' || mode =='Checked' && '로그인' ||
                mode == 'PassFind'&& '비밀번호를 잊으셨나요?'  
            }
            >
            {mode == 'Checked' && <Login />}
            {mode == 'SignUp' && <Signup />}
            {mode == 'Login' && <PassChk onClose={onClose} closeMenu={closeMenu}  />}
            {mode == 'PassFind' && <PassFind onClose={onClose} />}
		</CardTypeComponent>
	</BasicModal>)
	
}