import AutoComplete from 'places-autocomplete-react'

export default function Test() {
  return (
    <AutoComplete 
      placesKey="YOUR_GOOGLE_MAPS_API_KEY"
      inputId="address"
      setAddress={(addressObject) => console.log(addressObject)}
      required={true}
      />
);
}
Test.layout = 'noLayout'; 