import { Box, Button, DialogActions, DialogContent, Divider, Grid, styled, TextField, Typography } from "@mui/material";
import React, { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import BasicDialog from ".";
import { grey, red } from '@mui/material/colors';
import { useCtx } from "../../../context/context";
import { borderRadius } from "@mui/system";

interface Open {
	open: boolean;
	onClose: Dispatch<SetStateAction<boolean>>;
	setShowMap: Dispatch<SetStateAction<boolean>>;
	setDisabled: Dispatch<SetStateAction<boolean>>;
}
const CssTextField = styled(TextField)({
	'&': {
		padding: '4px 0',
		marginBottom: '4px'
	},
	'& input': {
	  padding: '4px 8px 8px'
	},
	'& label': {
		left: '8px'
	},
	'& .css-g2p6lv-MuiInputBase-root-MuiInput-root:before': {
		borderColor: `${grey[400]}`
	},
	'& .css-g2p6lv-MuiInputBase-root-MuiInput-root:after': {
		borderColor: `${grey[700]}`
	},
	'& .css-g2p6lv-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': {
		borderColor: `${grey[700]}`
	}
});
const LastTextField = styled(TextField)({
	'&': {
		padding: '4px 0 0'
	},
	'& input': {
		padding: '4px 8px 8px'
	},
	'& label': {
		left: '8px'
	},
	'& .css-g2p6lv-MuiInputBase-root-MuiInput-root:before': {
		display: 'none'
	},
	'& .css-g2p6lv-MuiInputBase-root-MuiInput-root:after': {
		borderColor: `${grey[700]}`
	},
	'& .css-g2p6lv-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': {
		borderColor: `${grey[700]}`
	}
});
const LocationTooltip = styled(Typography)({
	'&': {
		position: 'relative',
		zIndex: 0,
		lineHeight: 1,
		transition: 'opacity 0.3s linear 0s',
		borderRadius: '8px',
		marginBottom: '5rem',
		padding: '12px',
		backgroundColor: '#fff',
		boxShadow:'rgb(0 0 0 / 28%) 0px 8px 28px',
	},
	'&::before': {
		content: '""',
		width: '16px',
		height: '16px',
		position: 'absolute',
		left: '50%',
		bottom: '-12px',
		zIndex: -1,
		borderRadius: '2px',
		transform: 'rotate(45deg) translateX(-50%)',
		transition: 'opacity 0.3s linear 0s',
		background: 'rgb(255, 255, 255)'
	}
});
export default function AddressDialog (props: Open) {
	const {open, onClose, setShowMap, setDisabled} = props;
	const ctx= useCtx();
	const {address, setHostLocation, coordinate} = ctx!
	const [state, setState] = useState<string | undefined>(undefined);
	const [city, setCity] = useState<string | undefined>(undefined);
	const [street, setStreet] = useState<string | undefined>(undefined);
	const [apt, setApt] = useState<string | undefined>(undefined);
	const [zipCode, setZipCode] = useState<string | undefined>(undefined);
	const [lastChange, setLastChange] = useState<Date>(new Date())
	useEffect(() => {
		if(address) {
			address!.address_components!.forEach(one => {
				one.types.forEach(type => {
					switch(type) {
						case 'administrative_area_level_1': {
							setState(one.long_name);
							break;
						}
						case 'sublocality_level_1': {
							setCity(one.long_name);
							break;
						}
						case 'sublocality_level_2': {
							setStreet(one.long_name);
							break;
						}
						case 'sublocality_level_4': {
							setStreet(one.long_name);
							break;
						}
						case  'postal_code': {
							setZipCode(one.long_name);
							break;
						}
					}
				})
			})
		}
		setLastChange(new Date());
	}, [address])
	useEffect(()=> {
		if(street) {
			address!.address_components!.forEach(one => {
				one.types.forEach(type => {
					switch(type) {
						case 'premise': {
							setStreet(street.concat(one.long_name));
							break;
						}
					}
				})
			})
		}
	}, [lastChange])
	const submitHandle = () => {
		onClose(false);
		setShowMap(true)
		setDisabled(true)
		setHostLocation({
			uri: coordinate.imgUrl,
			placeId: address!.place_id,
			state: state,
			city: city,
			street: street,
			apt: apt,
			zipCode: zipCode,
			lat: coordinate.lat,
			lng: coordinate.lng,
		})
	}
	return (<BasicDialog onClose={onClose} open={open} title="주소확인" id="address">
			<DialogContent sx={{borderBottomWidth: 0,  }}>
				<Box sx={{ border: 1, borderRadius: 3, borderColor: grey[400], overflow: 'hidden', pt: 1}}>
					<CssTextField
						label="주/도"
						fullWidth
						autoComplete="current-password"
						variant="standard"
						color="info"
						value={state}
						onChange={(e) => setState(e.target.value)}
						InputLabelProps={state &&{shrink: true }}
						sx={{p: 0}}
					/>
					<CssTextField
						label="도시"
						fullWidth
						autoComplete="current-password"
						variant="standard"
						color="info"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						InputLabelProps={city &&{ shrink: true }}
						sx={{p: 0}}
					/>
					<CssTextField
						label="도로명"
						fullWidth
						autoComplete="current-password"
						variant="standard"
						color="info"
						value={street}
						onChange={(e) => setStreet(e.target.value)}
						InputLabelProps={street && { shrink: true }}
						sx={{p: 0}}
					/>
					<CssTextField
						label="아파트 이름, 동호수 등(선택사항)"
						fullWidth
						autoComplete="current-password"
						variant="standard"
						color="info"
						value={apt}
						onChange={(e) => setApt(e.target.value)}
						InputLabelProps={apt && { shrink: true }}
						sx={{p: 0}}
					/>
					<LastTextField
						label="우편번호"
						fullWidth
						autoComplete="current-password"
						variant="standard"
						color="info"
						value={zipCode}
						onChange={(e) => setZipCode(e.target.value)}
						InputLabelProps={zipCode && { shrink: true }}
						sx={[{p: 0, border: 0,},
						]}
					/>
			</Box>
			<Divider sx={{my: 3}} />
			<Box sx={{textAlign: 'center', position: 'relative'}}>
				<Grid container justifyContent="center" alignItems="center"
					height="240px"
					sx={{
						backgroundImage:`url(${coordinate.imgUrl})`,
						backgroundPosition: 'center', 
						borderRadius: 3}}>
					<LocationTooltip variant="body2">
						숙소의 대략적인 위치가 표시됩니다
					</LocationTooltip>
				</Grid>
			</Box>
		</DialogContent>
		<DialogActions>
			<Button variant="contained" disableElevation
				onClick={submitHandle}
				color="info" sx={{ mr: 'auto', ml: 1, p:1.4}}>
				확인
			</Button>
		</DialogActions>
	</BasicDialog>);
}