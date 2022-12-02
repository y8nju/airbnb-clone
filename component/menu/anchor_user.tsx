import { Divider, MenuItem, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { useCtx } from "../../context/context";
import { HostingType } from "../../interface/hostingType";
import { getHostingList } from "../../lib/api/propertyApi";

interface AnchorAction {
    setSignupOpen: (value: SetStateAction<boolean>) => void
    closeMenu: (event: React.MouseEvent<HTMLElement>) => void
}
export default function AnchorUser(props: AnchorAction) {
    const {setSignupOpen, closeMenu} = props;
	const ctx = useCtx();
	const {setMode, setUserEmail} = ctx!;
    const [myListing, setMyListing] = useState< HostingType[] | null >(null)
	const {data: session} = useSession();

	useEffect(() => {
		myListingHandle();
		console.log(myListing)
	}, [session])
	const myListingHandle = async() => {
		const info = {
			step: 11, 
			hostname: session?.user?.email
		};
		const rst = await getHostingList(info);
		setMyListing(rst.datas);
	}
    const logoutHandle = () => {
        setSignupOpen(false);
		setMode('Checked');
		setUserEmail(undefined);
        signOut();
    };

	return (<>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography fontWeight={500}>메세지</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography fontWeight={500}>알림</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Link href="/trips" style={{position: 'relative', fontWeight: 500}}>
			여행
			<span style={{position: 'absolute', top: '4px', width: '8px', height: '8px', backgroundColor: '#ff385c', borderRadius: '50%',}}></span>
		</Link>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography fontWeight={500}>위시리스트</Typography>
	</MenuItem>
	<Divider />
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography>
			{myListing !== null && myListing.length > 0 ?<Link href="/hosting" style={{position: 'relative'}}>숙소 관리
				<span style={{position: 'absolute', top: '4px', width: '8px', height: '8px', backgroundColor: '#ff385c', borderRadius: '50%',}}></span>
			</Link> : 
			<Link href="/become-a-host" style={{position: 'relative'}}>숙소 호스트 되기
				<span style={{position: 'absolute', top: '4px', width: '8px', height: '8px', backgroundColor: '#ff385c', borderRadius: '50%',}}></span>
			</Link>}
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