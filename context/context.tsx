import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type SignMode = 'SignUp' | 'Login' | 'Checked'
interface ContextType {
	userEmail: string | undefined;
	setUserEmail: Dispatch<SetStateAction<string | undefined>>;
    mode: SignMode
    setMode: Dispatch<SetStateAction<SignMode>>
    emailRegex: RegExp
}

export const Context = createContext<ContextType| null>(null);

export const ContextProvider = (props: {children: ReactNode}) => {
    const [mode, setMode] = useState<SignMode>('Checked');
    const [userEmail, setUserEmail] = useState<string|undefined>(undefined);
	const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    return <Context.Provider value={{mode: mode, setMode: setMode, userEmail: userEmail, setUserEmail: setUserEmail , emailRegex: emailRegex}}>
        {props.children}
    </Context.Provider>
}

export const useCtx = () => useContext(Context);
