import { Button, CardContent, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useCtx } from "../../../../context/context";
import { findEmail } from "../../../../lib/api/accountApi";

interface OnClose {
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PassFind(props: OnClose) {
    const [email, setEmail] = useState<string | undefined>(undefined);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [emailType, setEmailType] = useState<boolean>(false);
	const {onClose} = props;
	const ctx = useCtx();
	const {setMode, emailRegex, setHeaderAlertProps} = ctx!

	const submitHandle = async () => {
		if(!(emailRegex.test(email as string))) {
			setErrorMsg('이메일을 입력하세요');
			setEmailType(true);
		}else {
			let resp = await findEmail(email!);
			if(resp.result) {
                // 이메일 전송
			}else {
                onClose(false);
                setMode('Login');
                setHeaderAlertProps({
                    type: 'error',
                    title: `${email}의 계정이 존재하지 않습니다. 다른 이메일 또는 잘못된 이메일로 가입하셨을 수 있습니다.`,
                    visible: true
                })
			}
		}
	}
    return (<CardContent sx={{p: 3}}>
        <Typography variant="body1" color="text.primary">
            계정으로 사용하는 이메일 주소를 입력하시면, 비밀번호 재설정 링크를 전송해 드립니다.
		</Typography>
        <TextField fullWidth label="이메일" id="email" sx={{mt: 2}} color="info" 
            error={emailType}
            value={email}
            helperText={errorMsg}
            onChange={(e) => setEmail(e.target.value)} />
        <Button variant="contained" disableElevation
            onClick={submitHandle}
            color={'info'}
            sx={{width: 1, mt: 6, p:1.4}}>재설정 링크 전송하기</Button>
    </CardContent>)
}