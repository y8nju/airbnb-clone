import { Box, Button, DialogActions, DialogContent, Divider, Grid, Switch, SwitchProps, TextField, Typography } from "@mui/material";
import styled from '@mui/material/styles/styled';
import React, { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import BasicDialog from "../../ui/dialog";
import { grey, pink, red } from '@mui/material/colors';
import { useCtx } from "../../../context/context";
import { borderRadius } from "@mui/system";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

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
		animation: 'fadein 1s'
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
const CustomSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	'& .MuiSwitch-switchBase': {
	  padding: 0,
	  margin: 2,
	  transitionDuration: '300ms',
	  '&.Mui-checked': {
		transform: 'translateX(16px)',
		color: '#fff',
		'& + .MuiSwitch-track': {
		  backgroundColor: grey[800],
		  opacity: 1,
		  border: 0,
		},
		'&.Mui-disabled + .MuiSwitch-track': {
		  opacity: 0.5,
		},
	  },
	  '&.Mui-focusVisible .MuiSwitch-thumb': {
		color: grey[300],
		border: '6px solid #fff',
	  },
	  '&.Mui-disabled .MuiSwitch-thumb': {
		color: grey[100],
	  },
	  '&.Mui-disabled + .MuiSwitch-track': {
		opacity: 0.7,
	  },
	},
	'& .MuiSwitch-thumb': {
	  boxSizing: 'border-box',
	  width: 22,
	  height: 22,
	},
	'& .MuiSwitch-track': {
	  borderRadius: 26 / 2,
	  backgroundColor: grey[300],
	  opacity: 1,
	  transition: theme.transitions.create(['background-color'], {
		duration: 500,
	  }),
	},
  }));
const CircleBox = styled(Box) ({
	'&': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '50%', 
	}
})

export default function AddressDialog (props: Open) {
	const {open, onClose, setShowMap, setDisabled} = props;
	const ctx= useCtx();
	const {address, setHostLocation, coordinate} = ctx!
	const [state, setState] = useState<string | null>(null);
	const [city, setCity] = useState<string | null>(null);
	const [street, setStreet] = useState<string | null>(null);
	const [apt, setApt] = useState<string | null>(null);
	const [zipCode, setZipCode] = useState<string | null>(null);
	const [lastChange, setLastChange] = useState<Date>(new Date());
	const [zoomMaps, setZoomMaps] = useState<boolean>(false);
	useEffect(() => {
		if(address !== null) {
			address!.address_components!.forEach((one: { types: any[]; long_name: SetStateAction<string | null>; }) => {
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
			address!.address_components!.forEach((one: { types: any[]; long_name: string; }) => {
				one.types.forEach(type => {
					switch(type) {
						case 'premise': {
							setStreet(street.concat(' ', one.long_name));
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
			uri: coordinate.imgUrl! as string,
			placeId: address!.place_id! as string,
			state: state as string,
			city: city as string,
			street: street as string,
			apt: apt as string,
			zipCode: zipCode as string,
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
						value={state || ''}
						onChange={(e) => setState(e.target.value)}
						InputLabelProps={state ? {shrink: true } : {shrink: false }}
						sx={{p: 0}}
					/>
					<CssTextField
						label="도시"
						fullWidth
						autoComplete="current-password"
						variant="standard"
						color="info"
						value={city || ''}
						onChange={(e) => setCity(e.target.value)}
						InputLabelProps={city ? { shrink: true } : {shrink: false }}
						sx={{p: 0}}
					/>
					<CssTextField
						label="도로명"
						fullWidth
						autoComplete="current-password"
						variant="standard"
						color="info"
						value={street || ''}
						onChange={(e) => setStreet(e.target.value)}
						InputLabelProps={street ? { shrink: true } : {shrink: false }}
						sx={{p: 0}}
					/>
					<CssTextField
						label="아파트 이름, 동호수 등(선택사항)"
						fullWidth
						autoComplete="current-password"
						variant="standard"
						color="info"
						value={apt || ''}
						onChange={(e) => setApt(e.target.value)}
						InputLabelProps={apt ? { shrink: true } : {shrink: false }}
						sx={{p: 0}}
					/>
					<LastTextField
						label="우편번호"
						fullWidth
						autoComplete="current-password"
						variant="standard"
						color="info"
						value={zipCode || ''}
						onChange={(e) => setZipCode(e.target.value)}
						InputLabelProps={zipCode ? { shrink: true } : {shrink: false }}
						sx={[{p: 0, border: 0,},
						]}
					/>
			</Box>
			<Divider sx={{my: 3}} />
			<Box sx={{textAlign: 'center', position: 'relative'}}>
				<Grid container>
					<Grid item flex={1}>
						<Typography variant="body1" align="left"
							sx={{fontWeight: 500}}>
							구체적인 위치 표시하기
						</Typography>
						<Typography variant="body2" align="left"
							sx={{fontWeight: 300}}>
							게스트에게 숙소 위치를 더욱 구체적으로 알려주실 수 있습니다.&nbsp;
							<span style={{textDecoration: 'underline'}}>숙소 주소는 예약이 확정된 후에만 공개됩니다.</span>
						</Typography>
					</Grid>
					<Grid item>
						<CustomSwitch
						checked={zoomMaps}
						onChange={(e) => setZoomMaps(e.target.checked)}
						color="default"
						inputProps={{ 'aria-label': 'controlled' }}/>
					</Grid>
				</Grid>
				<Grid container justifyContent="center" alignItems="center"
					height="240px"
					sx={[{
						mt: 1,
						backgroundImage:`url(${coordinate.imgUrl})`,
						backgroundPosition: 'center', 
						backgroundSize: '100%',
						borderRadius: 3,
						transition: 'all 1s ease-in-out'}, 
						zoomMaps && {backgroundSize: '200%'}]}>
					{!zoomMaps ? <LocationTooltip variant="body2">
						숙소의 대략적인 위치가 표시됩니다
						</LocationTooltip> : 
						<CircleBox sx={{width: 70, height: 70, backgroundColor: '#f5005629', position: 'absolute', mb: 6}}>
							<CircleBox sx={{width: 40, height: 40, backgroundColor: pink[500] }}>
								<HomeRoundedIcon sx={{color: '#fff'}} />
							</CircleBox>
						</CircleBox>
					}
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