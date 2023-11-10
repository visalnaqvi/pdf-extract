import axios from "axios"
import server from "../config";



export const validateSession = async (setUser) => {
    try {
        const response = await axios.get(
            server+"users/validate"
        );
       
            if (response.status === 401) {
                if (response.status === 401) {
                    setUser({})
                }
            } else if (response.status === 200) {
                setUser(response.data)
            }
        
        
        //setting user data if token is still valid
    } catch (err) {
        if (err) {
            setUser({})
        }
    }
}