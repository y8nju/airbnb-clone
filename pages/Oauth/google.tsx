import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Box, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { grey } from "@mui/material/colors";
import { findEmail } from "../../lib/api/accountApi";
import { useCtx } from "../../context/context";
import Signup from "../../component/modal/resister/signUpModal";
export default function GoogleOAuth () {
	const { data: session, status } = useSession();
	console.log('session', session, status);
	const ctx = useCtx();
	const {setMode, mode, setLoading, loading} = ctx!;
	useEffect(() => {
		setLoading(true);
		
		if (!(status === "loading") && !session) {
			setLoading(false);
			void signIn("google")
		}
		if(session) {
			setLoading(false);
			(async () => {
				let resp = await findEmail(session.user!.email as string);
				console.log(resp)
				if(resp.result) {
					window.close();
				} else {
					setMode("GoogleSignUp");
				}
			})();
		}
	}, [session, status]);
	
	return ( <Box 
		sx={{
			width: "100vw",
			height: "100vh",
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			position: "absolute",
			left: 0,
			top: 0,
			background: "white",
			zIndex: 1500,
		}}>
			{loading && <Box sx={{
				width: "100vw",
				height: "100vh",
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				position: "absolute",
				zIndex: 2500,
			}}>
				<CircularProgress color="info"  />
			</Box>}
			{mode == 'GoogleSignUp' &&  <Signup />}
		</Box> );
};

GoogleOAuth.isLayout = false;