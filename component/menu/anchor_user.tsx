import { Divider, MenuItem, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { useCtx } from "../../context/context";
import { HostingType } from "../../interface/hostingType";
import { getHostingList } from "../../lib/api/propertyApi";

const home: string = process.env.NEXT_PUBLIC_SERVER_URI as string

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
    const router = useRouter();


	useEffect(() => {
		myListingHandle();
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
        signOut({callbackUrl: home});
    };

	return (<>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography fontWeight={500}>메세지</Typography>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography fontWeight={500}>알림</Typography>
	</MenuItem>
	<MenuItem onClick={() => router.push("/trips")} sx={{pr: 8}}>
		<Typography>여행</Typography>
		<span style={{width: '8px', height: '8px', backgroundColor: '#ff385c', borderRadius: '50%', alignSelf: 'flex-start'}}></span>
	</MenuItem>
	<MenuItem onClick={closeMenu} sx={{pr: 8}}>
		<Typography fontWeight={500}>위시리스트</Typography>
	</MenuItem>
	<Divider />
	{myListing !== null && myListing.length > 0 ?
		<MenuItem onClick={() => router.push('/hosting')}
			sx={{pr: 8}}>
			<Typography>숙소 관리</Typography>
			<span style={{width: '8px', height: '8px', backgroundColor: '#ff385c', borderRadius: '50%', alignSelf: 'flex-start'}}></span>
		</MenuItem> :
		<MenuItem onClick={() => router.push('/become-a-host')}
			sx={{pr: 8}}>
			<Typography>숙소 호스트 되기</Typography>
			<span style={{width: '8px', height: '8px', backgroundColor: '#ff385c', borderRadius: '50%', alignSelf: 'flex-start'}}></span>
		</MenuItem>}
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