import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";

export default function roomPrivacyType () {
    
    const router = useRouter()
    const {roomId} = router.query;
	const nextStepHandle = () => {
		// new data update fetch 👉 
        // 정상 처리가 됐다면
		router.push('/become-a-host/'+roomId+'/privacy-type')
	}
	return ( <Grid>
		<h1>
		[room]/privacy-type
        게스트가 머무르게 될 숙소의 종류가 무엇인가요?
	</h1>
	<Button onClick={nextStepHandle}>다음으로</Button>
	</Grid> )
}
roomPrivacyType.layout = "halfType";