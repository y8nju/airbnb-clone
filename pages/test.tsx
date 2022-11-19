import { useRef, useEffect, useState } from "react";
const AutoComplete = () => {
  const [inp, setInp] = useState<string | null>(null)
 const autoCompleteRef = useRef<any>();
 const inputRef = useRef<HTMLInputElement | undefined>(undefined);
 useEffect(() => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef?.current,
  );
  autoCompleteRef.current.addListener("place_changed", async () => {
   const place = await autoCompleteRef.current.getPlace();
   console.log({ place });
  });
 }, []);
 useEffect(()=> {
  if(inp !== null) {
    console.log(autoCompleteRef.current.gm_accessors_.place.oj.predictions);
  }
  console.log(inp)
 }, [inp])
 return (
  <div>
   <label>enter address :</label>
   <input ref={inputRef} onChange={(e)=> setInp(e.target.value)} value={inp || ''} />
  </div>
 );
};
export default AutoComplete;

AutoComplete.layout = 'noLayout';