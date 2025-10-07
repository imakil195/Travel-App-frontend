import {  createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducer";

const initialValue = {
    isAuthModalOpen: false,
    username:"",
    number:"",
    email:"",
    password:"",
    confirmPassword:"",
    accessToken:"",
    name:"",
    selectedTab:"login"
}

const AuthContext = createContext(initialValue)

const AuthProvider = ({children} ) =>{

    const [{isAuthModalOpen ,username , email , password , number,confirmPassword,selectedTab, accessToken, name},authDispatch] = useReducer(
        authReducer,
        initialValue
    )
    return(
        <AuthContext.Provider value={{isAuthModalOpen , username , email , password , number , confirmPassword, selectedTab, accessToken, name, authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth = () => useContext(AuthContext)

export {useAuth , AuthProvider}