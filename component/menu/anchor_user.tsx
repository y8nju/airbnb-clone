import { Divider, MenuItem, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SetStateAction } from "react";
import { useCtx } from "../../context/context";

interface AnchorAction {
    setSignupOpen: (value: SetStateAction<boolean>) => void
    closeMenu: (event: React.MouseEvent<HTMLElement>) => void
}
export default function AnchorUser(props: AnchorAction) {
    const {setSignupOpen, closeMenu} = props;
	const ctx = useCtx();
	const {setMode, setUserEmail} = ctx!;
    const router = useRouter();
    const logoutHandle = () => {
        setSignupOpen(false);
		setMode('Checked');
		setUserEmail(undefined);
        signOut();
    };

	return (<>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography style={{fontWeight: 500}}>메세지</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography style={{fontWeight: 500}}>알림</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography style={{fontWeight: 500}}>여행</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography style={{fontWeight: 500}}>위시리스트</Typography>
	</MenuItem>
	<Divider />
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography>
			<Link href="/become-a-host">숙소 호스트 되기</Link>
		</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography>체험 호스팅 하기</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography>계정</Typography>
	</MenuItem>
	<Divider />
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography>도움말</Typography>
	</MenuItem>
	<MenuItem onClick={logoutHandle} sx={{pr: 8}}>
		<Typography>로그아웃</Typography>
	</MenuItem>
	</>)
}