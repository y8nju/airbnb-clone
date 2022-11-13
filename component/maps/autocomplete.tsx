import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
	getZipCode,
} from "use-places-autocomplete";
import useOnclickOutside  from "react-cool-onclickoutside";
import { Avatar, Box, CircularProgress, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material/';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NearMeIcon from '@mui/icons-material/NearMe';
import { grey } from '@mui/material/colors';
import { useCtx } from '../../context/context';
import { createStaticMapUri } from '../../lib/api/mapsApi';

const PlacesAutocomplete = () => {
	const [searchTxt, setSearchTxt] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [nowLocationShow, setNowlocationShow] = useState<boolean>(false);
    const ctx = useCtx();
    const {coordinate, setCoordinate} = ctx!;
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
		},
		debounce: 300,
	});
	const ref = useOnclickOutside(() => {
		clearSuggestions();
	});

	useEffect(()=> {
		renderSuggestions()
		setNowlocationShow(false);
		if(data.length > 0) {
			setLoading(false);
		}
		if(searchTxt?.length > 0 ) {
			setNowlocationShow(false);
		}
		if(searchTxt?.length == 0) {
			setNowlocationShow(true);
		}
	}, [searchTxt]);

	const handleInput = (e: any): void => {
		setLoading(true);
		setNowlocationShow(false);
		setValue(e.target.value);
		setSearchTxt(e.target.value)
	};
	
	const handleSelect = ({ description }: any): MouseEventHandler<HTMLLIElement> => (): void => {
	  setValue(description, false);
	  clearSuggestions();

	  console.log(description);
	  getGeocode({ address: description }).then((results) => {
		console.log(getZipCode(results[0], true));
		const { lat, lng } = getLatLng(results[0]);
		console.log("📍 Coordinates: ", { lat, lng });
		navigator.geolocation.getCurrentPosition(position => {
			const coords = {
				lat: lat,
				lng: lng,
			}
            const mapUri = createStaticMapUri(coords);

			setCoordinate({...coords, imgUrl: mapUri});
		});
	  });
	};
	
	const renderSuggestions = () => data?.map((suggestion: google.maps.places.AutocompletePrediction) => {
		const {
		place_id,
		structured_formatting: { main_text, secondary_text },
		} = suggestion;
		return (<ListItem key={place_id} onClick={handleSelect(suggestion)}>
			<ListItemAvatar>
				<Avatar sx={{backgroundColor: grey[200]}}>
					<HomeWorkIcon fontSize="small" color="info" />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={main_text} secondary={secondary_text} />
		</ListItem>);
	});
	const focusHandle = () => {
		if(data.length == 0) {
			setNowlocationShow(true);
		}
	}
	const NowLocation = () => {
		return (<ListItem>
			<ListItemAvatar>
				<Avatar sx={{backgroundColor: grey[200]}}>
					<NearMeIcon fontSize="small" color="info" />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary="현재 위치 사용" />
		</ListItem>)
	}


	return (
		<Box ref={ref} sx={{width: '80%', backgroundColor: '#fff', borderRadius: 2}} position="absolute" top="200px">
			<TextField
				fullWidth
				variant="outlined"
				value={searchTxt}
				onChange={handleInput}
				disabled={!ready}
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
				onBlur={() => setNowlocationShow(false)}
			/>
			<List sx={[{p: 0}, (nowLocationShow || status === "OK") && {py: 1}]}>
				{status === "OK" && <>
				{renderSuggestions()}
				{loading && <ListItem sx={{justifyContent: "center"}}><CircularProgress color="info" size={24} /></ListItem>}
				</>}
				{nowLocationShow && <NowLocation />}
			</List>

			
			 {/* <ul>
				{data.map((list, index) => (
					<li
						key={list.place_id}
						onClick={(e) => {
							console.log(data[index]);
							handleSelect((e.target as HTMLElement).innerText);
						}}
					>
						{list.description}
					</li>
				))}
			</ul> */}
		</Box>
		);
};

export default PlacesAutocomplete;