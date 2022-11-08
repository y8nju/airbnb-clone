import { Button, CardContent, Grid, Link, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCtx } from "../../../context/context";
import { commitment } from "../../../lib/api/accountApi";
interface OnClose {
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Commitment(props: OnClose) {
	const {data: session} = useSession();

	const ctx = useCtx();
	const {userEmail} = ctx!

	const submitHandle = async () => {
		const data = {
			email: userEmail! || session?.user.email,
			visible: new Date()
		}
		const resp = await commitment(data);
		props.onClose(false);
	}

	return (<CardContent sx={{p: 3, height: 'auto'}}>
		<Grid container spacing={2} sx={{mb: 4}}>
			<Grid item xs={12} sx={{mt: -3, mb: 1}}>
				<Image src='/icon.svg' alt="logo" width={42} height={42} />
			</Grid>
			<Grid item xs={12}>
				<Typography variant='body2' sx={{mb: 1}}>
					에어비앤비 커뮤니티 차별반대 서약
				</Typography>
				<Typography variant="h6" color="text.primary"
					sx={{mb: 1}}
					style={{fontWeight: 600, lineHeight: 1.2}}>
					에어비앤비는 누구나 어디에서나 우리 집처럼 편안함을 느낄 수 있는 커뮤니티를 지향합니다.
				</Typography>
				<Typography variant='body1' sx={{mb: 1}} 
					style={{fontWeight: 300}}>
					이를 위해 다음에 동의해 주실 것을 부탁드립니다.
				</Typography>
				<Typography variant='body1' sx={{mb: 1}} 
					style={{fontWeight: 300}}>
				인종, 종교, 출신 국가, 민족, 피부색, 장애, 성별, 성 정체성, 성적 지향, 연령 등과 관계없이 에어비앤비 커뮤니티의 모든 사람을 존중하며 편견이나 선입견 없이 대하는 것에 동의합니다.
				</Typography>
				<Typography variant='body1' sx={{mb: 3}}> 
					<Link color="inherit">더 알아보기</Link>
				</Typography>
				<Typography variant='body1' sx={{mb: 1}} >
					에어비앤비 서비스 약관
				</Typography>
				<Typography variant='body1' sx={{mb: 1}} >
					에어비앤비 서비스 약관, 결제 서비스 약관, 차별 금지 정책에 동의합니다. 또한, 에어비앤비 개인정보 처리방침에 따른 개인정보 이용 및 처리에도 동의합니다.
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" disableElevation
					onClick={submitHandle}
					sx={{ width: 1, mb: 1.5, bgcolor: red[600], p:1.4}}>
					동의 및 계속하기
				</Button>
				<Button  variant="outlined" color="info" disableElevation
					onClick={submitHandle}
					sx={{ width: 1, p:1.4}}>
					거절하기
				</Button>
			</Grid>

		</Grid>
	</CardContent>)
}