import { useEffect } from "react";
import { Box, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCtx } from "../../context/context";
import Signup from "../../component/ui/modal/resister/signUpModal";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export default function GoogleOAuth () {
    const {data: session} = useSession();
    const router = useRouter();
    console.log(router.query);
	const ctx = useCtx();
	const {mode, setMode, setUserEmail, loading} = ctx!;
    useEffect(() => {
        setMode('GoogleSignUp');
        setUserEmail(router.query.email as string);
    }, [router.query]);
    useEffect(() => {
        console.log('session', session);
        if(session) {
            window.close();
        }
    }, [session])
	
	return ( <Box 
		sx={{
			width: "100vw",
			height: "100vh",
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
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
			<Signup />
		</Box> );
};

GoogleOAuth.layout = 'noLayout';