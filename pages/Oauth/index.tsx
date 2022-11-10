import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OAuth() {
	const { data: session, status } = useSession();
	const router = useRouter();
	useEffect(()=> {
		console.log(router)
		if(!(status === "loading") && !session) {
			if(router.query.email) {
				const authData = {
					alreadyEmail: router.query.email as string,
					authUserName: router.query.name as string,
					provider: router.query.provider as string
				}
				window.opener.alreadyCallback(authData);
				window.close();
			} 
		}
	}, [status])
	return(<Box sx={{
		width: "100vw",
		height: "100vh",
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		zIndex: 2000,
		background: "white",
	}}>
		<CircularProgress color="info"  />
	</Box>)
}
OAuth.layout = 'noLayout';