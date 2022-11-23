import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { findEmail } from "../../lib/api/accountApi";
import { useCtx } from "../../context/context";
import { useRouter } from "next/router";

export default function GoogleOAuth () {
	const { data: session, status } = useSession();
	console.log('session', session, status);
	const ctx = useCtx();
	const {setLoading} = ctx!;
	useEffect(() => {
		setLoading(true);
		if (!(status === "loading") && !session) {
			setLoading(false);
			void signIn("google", {redirect: false})
				.then((response) =>  console.log('response', response))
				.catch((e) => (console.log(e)))
		}
		if(session) {
			(async () => {
				let resp = await findEmail(session.user!.email as string);
				console.log(resp)
				setLoading(false);
				if(resp.result) {
					console.log('a')
					console.log('openrEvent', window.opener )
					window.opener.commitmentCallback(session.user!.email);
					window.close();
				}
			})();
		}
	}, [session, status]);
	
	return ( <Box sx={{
		width: "100vw",
		height: "100vh",
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: "white",
	}}>
		<Box sx={{
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
		</Box>
		<CircularProgress color="info"  />
	</Box> );
};

GoogleOAuth.layout = 'noLayout';