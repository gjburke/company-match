import "./InputBox.css";
import {useState} from 'react';

interface InputProps {
    onSubmit: (messages: string) => void;
}

export default function InputBox({ onSubmit } : InputProps) {
    const [inputValue, setInputValue] = useState('');
    const [companySize, setCompanySize] = useState("");
    const [jobType, setJobType] = useState("");
    const [preferredCountry, setPreferredCountry] = useState("");

    // const handleChange = (event:any) => {
    //     setSelectedSize(event.target.value);
    //     console.log(selectedSize);
    // };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <div className="InputBox">
            <label>Company Size:</label>

            <div onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setCompanySize(target.value);
            }}>
            <input type="radio" name="company-size" value="small" />
            <label>1–50 employees</label><br />

            <input type="radio" name="company-size" value="medium" />
            <label>51–200 employees</label><br />

            <input type="radio" name="company-size" value="large" />
            <label>200+ employees</label><br />

            </div>

            <label>Job type preferred:</label>

            <div onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setJobType(target.value);
            }}>
            <input type="radio" name="job-type" value="remote" />
            <label>Remote</label><br />

            <input type="radio" name="job-type" value="on-site" />
            <label>On-site</label><br />

            <input type="radio" name="job-type" value="hybrid" />
            <label>Hybrid</label><br />

            </div>
            
            <label>Preferred Country:</label>

            <textarea placeholder="Enter your preferred country.." onChange={(e) => setPreferredCountry(e.target.value)}/>

            <form onSubmit={handleSubmit}>
                <label>Enter your description:</label>
                <br/>
                <textarea placeholder="Write your description here..."  onChange={(e) => setInputValue(e.target.value)}></textarea>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}