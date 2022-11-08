import { Divider, MenuItem, Typography } from "@mui/material";
import { SetStateAction } from "react";
import { useCtx } from "../../context/context";

interface AnchorAction {
    setSignupOpen: (value: SetStateAction<boolean>) => void
    closeMenu: () => void
}
export default function AnchorUnUser(props: AnchorAction) {
	const {setSignupOpen, closeMenu} = props;
	const ctx = useCtx();
	const {setMode, mode} = ctx!;
	const signupHandle = () => {
		setMode('Checked')
		setSignupOpen(true);
		closeMenu();
	}
	const testHandle = () => {
		setMode('AlreadyChk');
		setSignupOpen(true);
		closeMenu();
	}
	return (<>
	<MenuItem onClick={signupHandle} sx={{pr: 8}}>
		<Typography style={{fontWeight: 600}}>회원가입</Typography>
	</MenuItem>
	<MenuItem onClick={signupHandle} sx={{pr: 8}}>
		<Typography>로그인</Typography>
	</MenuItem>
	<Divider />
	<MenuItem onClick={testHandle} sx={{pr: 8}}>
		<Typography>숙소 호스트 되기</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography>체험 호스팅 하기</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography>도움말</Typography>
	</MenuItem>
	</>)
}