import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type SignMode = 'SignUp' | 'Login' | 'Checked' | 'PassFind';
type HeaderAlertType = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'| null;
interface ContextType {
	userEmail: string | undefined;
	setUserEmail: Dispatch<SetStateAction<string | undefined>>;
    mode: SignMode
    setMode: Dispatch<SetStateAction<SignMode>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    headerAlertProps: { type: HeaderAlertType, title: string | null},
    setHeaderAlertProps: Dispatch<SetStateAction<{
        type: HeaderAlertType,
        title: string | null,
        visible: boolean
    }>>
    emailRegex: RegExp
    
}

export const Context = createContext<ContextType| null>(null);

export const ContextProvider = (props: {children: ReactNode}) => {
    const [mode, setMode] = useState<SignMode>('Checked');
    const [userEmail, setUserEmail] = useState<string|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [headerAlertProps, setHeaderAlertProps] = useState<{type: HeaderAlertType, title: string | null, visible: boolean}>({
        type: null,
        title: null, 
        visible: false
    })
	const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    return <Context.Provider value={{
        mode: mode, setMode: setMode, 
        userEmail: userEmail, setUserEmail: setUserEmail, 
        loading: loading, setLoading: setLoading,
        headerAlertProps: headerAlertProps, setHeaderAlertProps: setHeaderAlertProps,
        emailRegex: emailRegex
    }}>
        {props.children}
    </Context.Provider>
}

export const useCtx = () => useContext(Context);
