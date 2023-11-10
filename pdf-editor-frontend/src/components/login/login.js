import { useState , useEffect } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

const LoginComponent = () => {

    //initalizing states
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [name, setName] = useState("");

    const [url, setUrl] = useState("");

    const [user, setUser] = useState(false);

    const [warning , setWarning] = useState(false);

    const [warningMsg , setWarningMsg] = useState(false);

    const [isRegister , setIsRegister] = useState(false)
    const [showPass , setShowPass] = useState(false)

    //setting API value for login and register forms
    useEffect(() => {
        if (!isRegister) {
            setUrl("http://localhost:3500/users/login")
        } else {
            setUrl("http://localhost:3500/users/register")
        }
    }, [isRegister])

    //handling form submit
    const handleFormSubmit = async () => {
       

        const formData = {
            userId: email,
            password: password,
            name: name
        }
        console.log("something good",formData)

        try {
            const response = await axios.post(
                url,
                formData
            )

            //setting token and user data on successfull sign in
            if (response.status === 200) {
                if (!isRegister) {
                    localStorage.setItem("token", response.data)
                }
                setUser(true);
            }

        }
        catch (err) {
            //setting warning message on warnings
            if(err.response.status === 409){
                setWarning(true)
                setWarningMsg("User already exists")
            }
            
            if(err.response.status === 400){
                setWarning(true)
                setWarningMsg("Incorrect UserID or Password")
            }

        }
    }


    return (
        <div className={`margin ${styles.margin}`}>
            {user && <Navigate to={'/'} replace={true}></Navigate>}
            <div className={`body-wrapper column`}>
                <div className={`${styles.wrapper}`}>
                    <div className="body-wrapper justify-between" style={{ marginBottom: "10px" }}>
                        <p className={styles.heading}>{isRegister ? "Register" : "Login"}</p>
</div>
                    <form>
                        {
                            isRegister &&
                            <div className={styles.formItem}>
                                <label className={styles.label} htmlFor="name">Full Name</label><br></br>
                                <input onChange={(e) => setName(e.target.value)} className={styles.input} type="text" id="name" name="name" placeholder="Enter your Full Name" />
                            </div>
                        }
                        <div className={styles.formItem}>
                            <label className={styles.label} htmlFor="userId">Email</label><br></br>
                            <input onChange={(e) => setEmail(e.target.value)} className={styles.input} type="email" id="userId" name="userId" placeholder="Enter your userId" />
                        </div>
                        <div className={styles.formItem}>
                            <div className={styles.flex}><label className={styles.label} htmlFor="password">Password</label><p style={{ cursor: "pointer" }} onClick={() => setShowPass(!showPass)} className={styles.content}>Show Password</p></div>
                            <input onChange={(e) => setPassword(e.target.value)} className={styles.input} type={showPass ? "text" : "password"} id="password" name="password" placeholder="Enter your Password" />
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            handleFormSubmit()
                        }} className={styles.button}>{isRegister ? "Sing Up" : "Login"}</button>
                    </form>
                </div>
                <br></br>
                <br></br>
                <br></br>
                {isRegister ? <p className={styles.boldContent}>Already have an account? <snap onClick={() => setIsRegister(false)} className={styles.link}>Login</snap></p> : <p className={styles.boldContent}>Dont&apos;t have an account? <snap onClick={() => setIsRegister(true)} className={styles.link}>Create an Account</snap></p>}
                <br></br>
              
                <br></br>
            </div>
        </div>
    )
}

export default LoginComponent;