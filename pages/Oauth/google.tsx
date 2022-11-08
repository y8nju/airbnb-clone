import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { grey } from "@mui/material/colors";
import { findEmail } from "../../lib/api/accountApi";
import { useCtx } from "../../context/context";
import Signup from "../../component/modal/resister/signUpModal";
import { useRouter } from "next/router";
export default function GoogleOAuth () {
	const { data: session, status } = useSession();
	console.log('session', session, status);
    const router = useRouter();
	const ctx = useCtx();
	const {setMode, mode, setLoading, loading, setUserEmail} = ctx!;
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
					window.close();
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
			background: "white",
		}}>
			<CircularProgress color="info"  />
		</Box> );
};

GoogleOAuth.isLayout = false;