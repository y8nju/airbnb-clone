import React, { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import usePlacesAutocomplete, {
	getDetails,
	getGeocode,
	getLatLng,
	getZipCode,
} from "use-places-autocomplete";
import useOnclickOutside  from "react-cool-onclickoutside";
import { Avatar, Box, Button, CircularProgress, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material/';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NearMeIcon from '@mui/icons-material/NearMe';
import { grey } from '@mui/material/colors';
import { useCtx } from '../../../context/context';
import { createStaticMapUri, nowLocationAddress } from '../../../lib/api/mapsApi';

interface Props {
	setShowMap: Dispatch<SetStateAction<boolean>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
	disabled: boolean;
}

const appKey = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY;

export default function PlacesAutocomplete(props: Props) {
	const {setShowMap, setOpen, disabled} = props;
	const [searchTxt, setSearchTxt] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [nowLocationShow, setNowlocationShow] = useState<boolean>(false);
	const [focused, setFocused] = useState<boolean>(false);
    const ctx = useCtx();
    const {coordinate, setCoordinate, setAddress, hostLocation, address} = ctx!;
	const {
		ready,
		value,
		suggestions: { status, data },
		suggestions,
		setValue,
		clearSuggestions,
		} = usePlacesAutocomplete({
		requestOptions: {
			componentRestrictions: { country: 'KR' },
			// types: ['address']
		},
		debounce: 300,
	});
	const ref = useOnclickOutside(() => {
		clearSuggestions();
	});
	useEffect(()=> {
		console.log('searchTxt',searchTxt, searchTxt.length)
		setNowlocationShow(false);
		renderSuggestions()
		if(data.length > 0) {
			console.log(data.length)
			setLoading(false);
		}
		if(searchTxt!.length == 0 && focused) {
			setNowlocationShow(true);
		}
		if(searchTxt!.length > 0 && data.length == 0 ) {
			setNowlocationShow(false);
			setLoading(true);
		}
	}, [searchTxt]);
	useEffect(()=> {
		if(address){
			setSearchTxt(address!.formatted_address!)
		}
	}, [disabled])
	const handleInput = (e: any): void => {
		if(data.length > 0) {
			setLoading(false);
		}else {
			setLoading(true);
		}
		setNowlocationShow(false);
		setValue(e.target.value);
		setSearchTxt(e.target.value)
	};
	
	const handleSelect = (suggestion: google.maps.places.AutocompletePrediction): MouseEventHandler<HTMLLIElement> => (): void => {
		const {description} = suggestion;
	  setValue(description, false);
	//   setShowMap(true); 내용 등록이 완료 시에 지도가 보여야함
	  clearSuggestions();
	  console.log('suggestion', suggestion);
	  getGeocode({ address: description }).then((results) => {
		console.log(getZipCode(results[0], true));
		const { lat, lng } = getLatLng(results[0]);
		console.log("📍 Coordinates: ", { lat, lng });
		navigator.geolocation.getCurrentPosition(async (position) => {
			const coords = {
				lat: lat,
				lng: lng,
			}
            const mapUri = createStaticMapUri(coords);
			setCoordinate({...coords, imgUrl: mapUri});
			const data = await nowLocationAddress(coords);
			setAddress(data!);
			console.log('data', data)	
		});
	  });
	  setOpen(true);
	};
	
	const renderSuggestions = () => data?.map((suggestion: google.maps.places.AutocompletePrediction) => {
		const {
		place_id,
		structured_formatting: { main_text, secondary_text },
		} = suggestion;
		return (<ListItem key={place_id} onClick={handleSelect(suggestion)} sx={{p: 0}}>
			<ListItemButton >
				<ListItemAvatar>
					<Avatar sx={{backgroundColor: grey[200]}}>
						<HomeWorkIcon fontSize="small" color="info" />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary={main_text} secondary={secondary_text} />
			</ListItemButton>
		</ListItem>);
	});
	const focusHandle = () => {
		setFocused(true);
		if(searchTxt!.length == 0) {
			setNowlocationShow(true);
		}
		if(data.length == 0) {
			setNowlocationShow(true);
		}
	}
	const nowLocationHandle = () => {
		navigator.geolocation.getCurrentPosition(async (position) => {
			const coords = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			}
            const mapUri = createStaticMapUri(coords);
			setCoordinate({...coords, imgUrl: mapUri});

			const data = await nowLocationAddress(coords);
			setAddress(data!);
		});
		setOpen(true);
	}
	const NowLocation = () => {
		return (<ListItem onClick={nowLocationHandle} sx={{p: 0}}>
			<ListItemButton >
				<ListItemAvatar>
					<Avatar sx={{backgroundColor: grey[200]}}>
						<NearMeIcon fontSize="small" color="info" />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="현재 위치 사용" />
			</ListItemButton>
		</ListItem>)
	}

	return (
		<Box ref={ref} sx={{width: '80%', backgroundColor: '#fff', borderRadius: 2}} position="absolute" top="200px">
			<TextField
				fullWidth
				variant="outlined"
				value={searchTxt || ''}
				onChange={handleInput}
				disabled={disabled}
				color="info"
				InputProps={{
					startAdornment: (
					  <InputAdornment position="start">
						<LocationOnIcon color="info"  />
					  </InputAdornment>
					),
				  }}
				placeholder="주소를 입력하세요"
				style={{borderRadius: '8px'}}
				onFocus={focusHandle}
				onBlur={() => setTimeout(() => { 
					setFocused(false);
					setNowlocationShow(false)}, 500)}
			/>
			<List sx={[{p: 0}, (nowLocationShow || status === "OK") && {py: 1}]}>
				{status === "OK" && <>
				{renderSuggestions()}
				{loading && <ListItem sx={{justifyContent: "center"}}><CircularProgress color="info" size={24} /></ListItem>}
				</>}
				{nowLocationShow && <NowLocation />}
			</List>
		</Box>
		);
};