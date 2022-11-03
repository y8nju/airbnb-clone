import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type SignMode = 'SignUp' | 'Login' | 'Checked'
interface ContextType {
	userEmail: string | null;
	setUserEmail: Dispatch<SetStateAction<string | null>>;
    mode: SignMode
    setMode: Dispatch<SetStateAction<SignMode>>
}

export const Context = createContext<ContextType| null>(null);

export const ContextProvider = (props: {children: ReactNode}) => {
    const [mode, setMode] = useState<SignMode>('Checked');
    const [userEmail, setUserEmail] = useState<string|null>(null);
    return <Context.Provider value={{mode: mode, setMode: setMode, userEmail: userEmail, setUserEmail: setUserEmail}}>
        {props.children}
    </Context.Provider>
}

export const useCtx = () => useContext(Context);
