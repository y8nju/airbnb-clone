import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";

export default function roomPropertyType () {
    const router = useRouter()
    const {roomId} = router.query;
	const nextStepHandle = () => {
		// new data update fetch 👉 
        // 정상 처리가 됐다면
		router.push('/become-a-host/'+roomId+'/privacy-type')
	}
	return ( <Grid>
		<h1>
		[roomid]/property-type
        다음 중 숙소를 가장 잘 설명하는 문구는 무엇인가요?
	</h1>
	<Button onClick={nextStepHandle}>다음으로</Button>
	</Grid> )
}
roomPropertyType.layout = "halfType";