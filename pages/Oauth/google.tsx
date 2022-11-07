import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { grey } from "@mui/material/colors";
export default function GoogleOAuth () {
    const { data: session, status } = useSession();
    console.log(session);

    useEffect(() => {
        if (!(status === "loading") && !session) void signIn("google");
        // if (session) window.close();
        
    }, [session, status]);
    const find = async () => {
        await 
    }
    
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
            {status === "loading" && <CircularProgress color="info"  />}
        </Box> );
};

GoogleOAuth.isLayout = false;