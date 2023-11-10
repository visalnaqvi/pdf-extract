import FileInput from "../upload/upload"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./home.module.css"
import { Document, Page } from 'react-pdf';
import Pages from "../pages/page.js";
import { validateSession } from "../../services/auth.js";
import server from "../../config.js";
const Home = ({showFileInput , pdfFileProp}) => {

    const [url, setUrl] = useState("");
    const [totalPages, setTotalPages] = useState(0)
    const [response, setResponse] = useState(false)
    const [pdfFile, setPdfFile] = useState(pdfFileProp);
    const [user, setUser] = useState({});
    const [extractBlob , setExtractBlob] = useState();
    const [loading , setLoading] = useState(true);

    const handleFileChange = (event) => {
        const file = event.current.files[0];
        setPdfFile(file);
        setResponse(false)
        setTotalPages(0)
        setUrl("")
    };

    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token){
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            validateSession(setUser);
        }  

        async function checkBackendOnline(){
            try{
                let response = await axios.get(server+"ping");
            if(response.status===200){
                setLoading(false);
            }
            }catch(err){
                console.log(err)
            }
            
        }

        checkBackendOnline()
    }, [token])


    const handleExtraction = async (pagesToRemove) => {
        const formData = new FormData();
        formData.append('pdfFile', pdfFile);
        formData.append('pagesToRemove', pagesToRemove);
        try {
            const response = await axios.post('http://localhost:3500/upload/extract', formData, {
                responseType: 'blob', // Specify response type as blob
            });
            if (response.status === 200) {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                setExtractBlob(pdfBlob)
                const url = window.URL.createObjectURL(pdfBlob);
                setUrl(url);
                setResponse(true)
            } else {
                setTotalPages(0)
                alert('Error uploading and modifying PDF.');
            }
        } catch (error) {
            console.error('Error:', error);
            setTotalPages(0)
            alert('Error uploading and modifying PDF.');
        }
    }

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('pdfFile', pdfFile);            
        try {
            const response = await axios.post('http://localhost:3500/upload/parse', formData);
            if (response.status === 200) {
                setTotalPages(response.data)
                setResponse(false)
            } else {
                setTotalPages(0)
                alert('Error uploading and modifying PDF.');
            }
            console.log("userrrrr",user)
            if(user.userId){
                formData.append("userId",user.userId)
                try{
                    const responseSave = await axios.post('http://localhost:3500/upload/save', formData);
                    console.log("response save",responseSave)
                    if (responseSave.status === 200) {
                       console.log("uff success")
                    } else {
                        alert('Error uploading and modifying PDF.');
                    }
                }catch(err){
                    console.log(err)
                }
              
            }
        } catch (error) {
            console.error('Error:', error.msg);
            setTotalPages(0)

            alert('Error uploading and modifying PDF.');
        }
    }
    
 
    return (
        <div>
            {loading && <h1>Waiting for backend to come online. It might take few seconds as hosted on free service. If you are running on local then consider changing default export in /config.js to localHost.</h1>}
           {showFileInput && <FileInput handleFileChange={handleFileChange} handleSubmit={handleUpload} />}
            {response ? (
                <div className={styles.wrapper}>
                    {url && (
                        <>
                        <a href={url} download={`${pdfFile.name.replace(/\.pdf$/, '')}_modified.pdf`}>
                            <button className={styles.download}>Download PDF</button>
                        </a>
                        
                    
                    </>
                    )}
                </div>
            ) : (
                <div>{totalPages > 0 && <Pages pdfFile={pdfFile} count={totalPages} handleExtraction={handleExtraction} />}</div>
            )}
        </div>)
}

export default Home;