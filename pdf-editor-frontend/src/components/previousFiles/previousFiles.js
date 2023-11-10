import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./previousFiles.module.css"
import { Link } from "react-router-dom"
import { validateSession } from "../../services/auth"
import Home from "../home/home"
const PreviousFiles = () => {
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token");
    const [data, setData] = useState({})
    const [file, setFile] = useState("");
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            validateSession(setUser);
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            if (user.userId) {
                try{
                    let response = await axios.post("http://localhost:3500/upload/user-data", user);
                    if (response.status === 200) {
                        setData(response.data);
                    } else {
                        console.log("erro")
                    }
                }catch(err){
                    console.log(err)
                }
              
            }
        }

        fetchData();

    }, [user])

    const deleteFile = async (index) => {
        let newFiles = data.files.filter((f, i) => { return i != index })
        try{
            let response = await axios.post("http://localhost:3500/upload/delete-file",{userId:user.userId , files:newFiles})
            if(response.status===200){
                console.log("success")
            }
            setData({ ...data, files: newFiles })
        }catch(err){
            console.log(err);
        }
       
    }

    useEffect(() => {
        console.log('fileeeeee', file);
    }, [file])
    return (
        <div>
            {user.userId ?
                <div className={styles.wrapper}>
                    <h1>Previous Files Which Were Uploaded By You</h1>

                    {
                        data.files && data.files.map((file, i) => (
                            <div key={i} className={styles.card}>
                                <p className={styles.heading}>{file}</p>
                                <a href={`http://localhost:3500/files/${file}`} download={"downloaded_file.pdf"}>
                                    <button className={styles.download}>Download PDF</button>
                                </a>                    
                                <button className={styles.download} onClick={() => { deleteFile(i) }}>Delete</button>
                            </div>
                        ))
                    }




                </div>


                : <div className={styles.redirectionWrapper}>
                    <Link to={"/login"}><button className={styles.download}>Login</button></Link>
                    <p className={styles.loginContent}>To view previous files uploded by you please login</p>
                </div>}
        </div>
    )
}

export default PreviousFiles;