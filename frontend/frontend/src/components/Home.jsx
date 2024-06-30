import React, { useEffect, useState } from "react";
import { fetchLanguages } from "../util/Languages";
import "./Home.css";
function Home() {
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [code, setCode] = useState("");
    const [result,Setresult]= useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchLanguages();
            setLanguages(data.languages);
        };
        getData();
    }, []);

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(selectedLanguage);
        let data = {};
        if(selectedLanguage == 'promptv1' || selectedLanguage == 'promptv2'){
            data = {
                "language":selectedLanguage,
                "question":code
            }
        }else{
            data = {
                "language":selectedLanguage,
                "script":code
            }

        }
        console.log(data);
        const response = await fetch("http://localhost:3000/api/execute", {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const result = await response.json();
        Setresult(result);
    };

    return (
        <div className="home-container">
            <form onSubmit={submitHandler}>
                <h2>Select a Programming Language</h2>
                <select
                    className="language-select"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                    {languages.map((element, index) => (
                        <option key={index} value={element.Language}>
                            {element.Language}
                        </option>
                    ))}
                </select>
                <h2>Write Your Code</h2>
                <textarea
                    className="code-textarea"
                    placeholder="Write your code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit">Execute Code!</button>
                <div>
                    {result.output ?(
                        <h1>{result.output}</h1>
                    ):<h1>{JSON.stringify(result.compile_message)}</h1>}
                </div>
            </form>
        </div>
    );
}

export default Home;
