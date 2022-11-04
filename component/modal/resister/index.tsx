import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useCtx } from '../../../context/context';
import CardTypeComponent from '../cardTypeComponent';
import BasicModal from "../index";
import Login from './loginModal';
import PassChk from './passChkModal';
import Signup from './signUpModal';
interface Open {
	open: boolean;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LoginAndSignUp(props: Open) {
	const [emailType, setEmailType] = useState(false);
	const ctx = useCtx();
    const {mode} = ctx!

	return (<BasicModal open={props.open} onClose={props.onClose}>
		<CardTypeComponent onClose={props.onClose} 
            title={mode == 'Checked' ? '로그인 또는 회원 가입' : (
                mode == 'SignUp' ? '회원 가입 완료하기' : '로그인'
            )}
            >
            {mode == 'Checked' && <Login />}
            {mode == 'SignUp' && <Signup />}
            {mode == 'Login' && <PassChk />}
		</CardTypeComponent>
	</BasicModal>)
	
}