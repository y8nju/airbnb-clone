import { Button, Grid } from "@mui/material"
import { useRouter } from "next/router"

export default function propertyTypeGroup () {
	const router = useRouter()
	const nextStepHandle = () => {
		// new data create fetch 👉 생성된 데이터의 ID 얻어와야함
		const roomId = Date.now();
		router.push('/become-a-host/'+roomId+'/property-type')
	}
	return ( <Grid>
		<h1>
		/become-a-host/property-type-group
		호스팅할 숙소 유형을 알려주세요.
	</h1>
	<Button onClick={nextStepHandle}>다음으로</Button>
	</Grid> )
}
propertyTypeGroup.layout = "halfType";