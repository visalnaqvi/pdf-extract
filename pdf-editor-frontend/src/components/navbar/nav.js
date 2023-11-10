import styles from "./nav.module.css"
import { useEffect , useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { validateSession } from "../../services/auth.js";
const NavBar = ()=>{
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token");
    let location = useLocation();
    useEffect(() => {
        if(token || location.pathname==="/"){
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            validateSession(setUser);
        }  
    }, [location])
 
    return(
        <div className={styles.wrapper}>
            <div className={styles.flex}>
            <p className={styles.logo}>PDF Extract</p>
            <a href="/"><button className={styles.button}>Home</button></a>
           {user.userId && <a href="/previous-files"><button className={styles.button}>Previous Files</button></a>}
            </div>
            {user.userId ? <div className={styles.login}>
                <button onClick={()=>{
                    localStorage.removeItem("token");
                    setUser({});
                   
                }} className={styles.button}>Sing Out</button>
            </div> :
            <div className={styles.login}>
                <a href="/login"><button className={styles.button}>Log In</button></a>
            </div>
         }
        </div>
    )
}

export default NavBar