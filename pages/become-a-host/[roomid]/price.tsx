import { FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Types } from "mongoose";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import { createAndUpdateListing } from "../../../lib/api/propertyApi";
import { Error } from '@mui/icons-material/';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "@emotion/styled";
import { Box } from "@mui/system";

const PriceInput = styled(TextField)({
	'&': {
		flex: 1,
		margin: '0 16px'
	},
	'& input': {
		borderRadius: '8px',
		textAlign: 'center',
		fontSize: '40px',
		fontWeight: 500,
	},
	'& .Mui-error': {
		backgroundColor:'#fddfdf1c'
	},
});

export default function RoomTitle() {
	const [price, setPrice] = useState<number | undefined>(undefined)
	const router = useRouter()
	const {roomid} = router.query;
	const layoutCtx = useContext(HalfLayoutContext);
	const {setNextBtnDisabled, roomStep, progressPer, savedData} = layoutCtx!;
	const errType = price !== null && price < 13400 || price !== null && price > 13399127
	useEffect(() => {
		if(savedData) {
			setPrice(savedData.price as number)
		}
	}, [savedData])
	useEffect(()=> {
		if(errType) {
			setNextBtnDisabled(true)
		} else if (price ==null) {
			setNextBtnDisabled(true)
		} else {
			setNextBtnDisabled(false)
		}
	}, [price])
	const priceAddHandle = () => {
		if(price < 13400) {
			setPrice(13400)
		} else {
			setPrice((num) => num + 1000)
		}
	}
	const priceMinusHandel = () => {
		if( price > 13399127) {
			setPrice(13399127)
		} else {
			setPrice((num) => num - 1000)
		}
	}
	
	const nextStepHandle = async () => {
		setNextBtnDisabled(true)
		const updateData = {
			_id: new Types.ObjectId(roomid as string),
			price: price,
            step: roomStep
		}
		const rst = await createAndUpdateListing(updateData);
		console.log(rst)
		if(rst.result) {
			router.push('/become-a-host/'+roomid+'/receipt');
		} else {
			console.log('데이터가 정상적으로 등록되지 않았습니다');
		}
	}
	return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
		<Head>
			<title>요금 설정 - 에어비앤비</title>
		</Head>
		<Grid container direction="column"
			justifyContent="center" alignItems="center"
			sx={{px: 6, width: 1, mt: 0, ml: 0, pb: 4, animation: 'fadein 1s'}} >
			<Grid container direction="column" alignItems="center" spacing={1} maxWidth="540px"> 
				<Grid item alignItems="center" sx={{display: 'flex'}} >
					<IconButton
						color="info"
						onClick={priceMinusHandel}
						disabled={price <= 13400}
						sx={{border: 1, p: 0.5, p: 1}}>
						<RemoveIcon fontSize="small" />
					</IconButton>
					<PriceInput placeholder="00" 
						type="number"
						value={price || ''}
						error={errType ? true : false}
						color="info"
						onChange={(e) => setPrice(Number(e.target.value))} />
					<IconButton
						color="info"
						onClick={priceAddHandle}
						disabled={price >= 13399127}
						sx={{border: 1, p: 0.5, p: 1}}>
						<AddIcon fontSize="small" />
					</IconButton>
				</Grid>
				<Grid item>
					<Typography variant="body1" sx={{fontWeight: 300}}>/박</Typography>
				</Grid>
				<Grid item>
					{errType && <FormHelperText 
						sx={{display: 'flex', alignItems: 'center', color:"#d32f2f"}}>
						<Error sx={{mr: 1, mt: 0.5}} fontSize="small" />
						<span>기본 요금으로 ₩13,400~₩13,399,127 사이의 값을 입력해 주세요.</span>
					</FormHelperText>}
				</Grid>
				<Grid item sx={{mt: 1}}>
					<Typography variant="body1">숙소 요금은 언제든지 변경하실 수 있습니다</Typography>
				</Grid>
			</Grid>
		</Grid>
		<HalfFooter progress={progressPer(roomStep)} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomTitle.layout = 'halfType'
