import axios from "axios";

export const signupHandler = async (username , number , email, password) => {
    try {
        const data = await axios.post("https://travelstay-backendapp.onrender.com/api/auth/register", {
            username:username,
            number:number,
            email:email,
            password:password
        }, { headers: { "Content-Type": "application/json" } });
        console.log({data} );
    }catch (error) {
        console.error("Error adding user to Database:", error);
    }
}