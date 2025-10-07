import axios from "axios";

export const loginHandler = async (number , password) => {

    try{
        const {
            data: {accessToken : accessToken , username }
        } = await axios.post("https://travelstay-backendapp.onrender.com/api/auth/login", 
            {
            number:number,
            password:password
        });
        console.log({accessToken ,username});
        
        return {accessToken , username};
    }catch(error){
        console.error("Error logging in:", error);
    }

};  