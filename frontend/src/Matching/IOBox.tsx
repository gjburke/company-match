import "./IOBox.css";
import {useState} from 'react';

export default function IOBox() {
    // const [inputValue, setInputValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState('');

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setSubmittedValue(e.target[0].value);
    };

    return (
        <div className="IOBox">
            <div className="InputBox">
                <div>
                    filters-placeholder
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Enter your description:</label>
                    <br/>
                    <textarea placeholder="Write your description here..."></textarea>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className="OutputBox">
                <div>
                    <h3>We found some matches!</h3>
                    <div>
                        <div>
                            <h3>Your top companies:</h3>
                            <div>{submittedValue}</div>
                            {/* <ul>
                                <li><p> </p></li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}