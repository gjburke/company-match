import "./IOBox.css";
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

import {useState} from 'react';

export default function IOBox() {
    const [messages, setMessages] = useState<string[]>([]);

    const handleInputSubmit = (input: string) => {
        const headers = {
            'Content-Type' : 'application/json',
            // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
            //'Accept' : 'application/json',
        }
        
        fetch("http://127.0.0.1:5000/company_names", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({query: input}),
        })
        .then(response => response.json())
        .then(data => {
            setMessages(data);
            console.log(data);
        })
        .catch(error => console.error("Error: ", error));
    };

    return (
        <div className="IOBox">
            <InputBox onSubmit={handleInputSubmit}/>
            <OutputBox messages={messages}/>
        </div>
    );
}