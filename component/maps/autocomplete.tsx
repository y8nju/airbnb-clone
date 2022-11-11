import React, { ChangeEvent, useEffect, useState } from 'react';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
	getZipCode,
} from "use-places-autocomplete";
import useOnclickOutside  from "react-cool-onclickoutside";
import { List, ListItem, ListItemText } from '@mui/material/';

const PlacesAutocomplete = () => {
	const {
		ready,
		value,
		suggestions: { status, data },
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

	const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
	setValue(e.target.value);
	};

	// const handleSelect = (description: any): void => {
	// 	setValue(description, false);
	// 	clearSuggestions();

	// 	getGeocode({ address: description }).then((results) => {
	// 		console.log(getZipCode(results[0], true));
	// 		const { lat, lng } = getLatLng(results[0]);
	// 		console.log("📍 Coordinates: ", { lat, lng });
	// 	});
	// };
	const handleSelect = (val: string): void => {
		setValue(val, false);
	  };
		const renderSuggestions = () =>
			data.map((suggestion) => {
				console.log(suggestion)
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;

			return (
				<ListItem key={place_id} onClick={handleSelect(suggestion)}>
					<ListItemText primary={main_text} secondary={secondary_text} />
				</ListItem>
			);
		});

	return (
		<div ref={ref}>
			<input
				style={{ width: 300, maxWidth: '90%' }}
				value={value}
				onChange={handleInput}
				disabled={!ready}
				placeholder="Where are you going?"
			/>
			<List>{renderSuggestions()}</List>
		</div>
		);
};

export default PlacesAutocomplete;