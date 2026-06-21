import axios from "axios";
import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {

    const [token, setToken] = useState('');

    const tokenValue = {
        token, 
        setToken,
    }

    return (
        <UserContext.Provider value={tokenValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
