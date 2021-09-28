import React, { createContext, useState, useContext } from "react";
import { useCookies } from 'react-cookie';

import  Login  from "./Login";

const TokenContext = createContext();

export default function TokenProvider({ children }) {
    const [token, setToken] = useState(null);

    const [cookies, setCookie] = useCookies(['access_token'])

    if (cookies.access_token) {
        return (
            <TokenContext.Provider value={{ token, setToken }}>
                {children}
            </TokenContext.Provider>
        )
    } else
        return (

            <TokenContext.Provider value={{ token, setToken }}>
                <Login />
            </TokenContext.Provider>
        )

}

function useDefault() {
    const context = useContext(TokenContext);
    const { token, setToken } = context;
    return { token, setToken };

}
