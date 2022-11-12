import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect } from "react";
import { CoordinateType, defaultCoords } from "../interface/mapsType";
import { createStaticMapUri } from "../lib/api/mapsApi";

type SignMode = null | 'SignUp' | 'Login' | 'Checked' | 'PassFind' | 'GoogleSignUp' | 'Session' | 'Commitment' | 'AlreadyChk';
type HeaderAlertType = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'| null;
export type AlreadyCheck = {
    authUserName: string | null,
    alreadyEmail: string | null,
    provider: string | null
}
interface ContextType {
	userEmail: string | undefined;
	setUserEmail: Dispatch<SetStateAction<string | undefined>>;
    mode: SignMode
    setMode: Dispatch<SetStateAction<SignMode>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    headerAlertProps: { type: HeaderAlertType, title: string | null, visible: boolean},
    setHeaderAlertProps: Dispatch<SetStateAction<{
        type: HeaderAlertType,
        title: string | null,
        visible: boolean
    }>>
    alreadyChk: AlreadyCheck, setAlreadayChk: Dispatch<SetStateAction<AlreadyCheck>>,
    coordinate: CoordinateType, setCoordinate: Dispatch<SetStateAction<CoordinateType>>,
    emailRegex: RegExp,
}

export const Context = createContext<ContextType| null>(null);

export const ContextProvider = (props: {children: ReactNode}) => {
    const [mode, setMode] = useState<SignMode>(null);
    const [userEmail, setUserEmail] = useState<string|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [headerAlertProps, setHeaderAlertProps] = useState<{type: HeaderAlertType, title: string | null, visible: boolean}>({
        type: null,
        title: null, 
        visible: false
    })
    const [alreadyChk, setAlreadayChk] = useState<AlreadyCheck>({
        alreadyEmail: null,
        authUserName: null,
        provider: null
    })
	const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const [coordinate, setCoordinate] = useState<CoordinateType>(defaultCoords)

    const [screen, setScreen] = useState<{width: number, height: number}>({width: 500, height: 900});

	useEffect(() => {
        if (typeof window !== "undefined") {
            setScreen({width: window.outerWidth, height: window.outerHeight});
        }
		
	}, []);
    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(position => {
			const coords = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			}
            const mapUri = createStaticMapUri(coords, screen.width, screen.height);

			setCoordinate({...coords, imgUrl: mapUri});
		});
    }, [screen])
    
    return <Context.Provider value={{
        mode: mode, setMode: setMode, 
        userEmail: userEmail, setUserEmail: setUserEmail, 
        loading: loading, setLoading: setLoading,
        headerAlertProps: headerAlertProps, setHeaderAlertProps: setHeaderAlertProps,
        alreadyChk: alreadyChk, setAlreadayChk: setAlreadayChk,
        coordinate: coordinate, setCoordinate: setCoordinate,
        emailRegex: emailRegex,
    }}>
        {props.children}
    </Context.Provider>
}

export const useCtx = () => useContext(Context);
