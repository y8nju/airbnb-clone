import React, { ChangeEvent, useEffect, useState } from 'react';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
	getZipCode,
} from "use-places-autocomplete";
import useOnclickOutside  from "react-cool-onclickoutside";
import { List, ListItem, ListItemText } from '@mui/material/';

const PlacesAutocomplete = () => {
	const [list, setList] = useState<JSX.Element[] | null>(null);
	const [searchTxt, setSearchTxt] = useState<string | undefined>(undefined);
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
		} = usePlacesAutocomplete({
		requestOptions: {
			// componentRestrictions: { country: 'KR' },
		},
		debounce: 300,
	});
	const ref = useOnclickOutside(() => {
		clearSuggestions();
	});

	useEffect(()=> {
		renderSuggestions()
		console.log(value)//[object Object] 오류 확인
	}, [value])
	const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
		setValue(e.target.value);
		setSearchTxt(e.target.value)
	};
	const handleSelect = (description: string): void => {
        setValue(description, false);
        getGeocode({ address: description }).then((results) => {
            console.log(getZipCode(results[0], true));
            const { lat, lng } = getLatLng(results[0]);
            console.log('📍 Coordinates: ', { lat, lng });
        });
    };
	
	const renderSuggestions = () => {
		const searchList = data.map((suggestion) => {
			return (
				<ListItem key={suggestion.place_id} onClick={handleSelect(suggestion)}>
					<ListItemText primary={suggestion.structured_formatting.main_text} secondary={suggestion.structured_formatting.secondary_text} />
				</ListItem>
			);
		});
		setList(searchList);
	}



	return (
		<div ref={ref}>
			<input
				style={{ width: 300, maxWidth: '90%' }}
				value={searchTxt}
				onChange={handleInput}
				disabled={!ready}
				placeholder="Where are you going?"
			/>
			<List>{list}</List>
			
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
		</div>
		);
};

export default PlacesAutocomplete;