import {  createContext, useContext, useReducer, useEffect } from "react";
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

    // Load auth from localStorage on mount
    useEffect(() => {
        const savedAuth = localStorage.getItem('travelstay_auth');
        if (savedAuth) {
            try {
                const { accessToken, username } = JSON.parse(savedAuth);
                if (accessToken && username) {
                    authDispatch({
                        type: "LOAD_AUTH_FROM_STORAGE",
                        payload: { accessToken, username }
                    });
                }
            } catch (error) {
                console.error("Error loading auth from storage:", error);
            }
        }
    }, []);

    // Save auth to localStorage when accessToken or username changes
    useEffect(() => {
        if (accessToken && username) {
            localStorage.setItem('travelstay_auth', JSON.stringify({
                accessToken,
                username
            }));
        } else if (!accessToken) {
            localStorage.removeItem('travelstay_auth');
        }
    }, [accessToken, username]);

    return(
        <AuthContext.Provider value={{isAuthModalOpen , username , email , password , number , confirmPassword, selectedTab, accessToken, name, authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth = () => useContext(AuthContext)

export {useAuth , AuthProvider}