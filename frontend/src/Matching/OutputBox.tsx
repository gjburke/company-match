import "./OutputBox.css";
import Company from "./Company";
interface OutputBoxProps {
    messages: string[];
}

export default function OutputBox({ messages }: OutputBoxProps) {
    console.log(messages);
    return (
        <div className="OutputBox">
            <div>
                <h3>We found some matches!</h3>
                <div>
                    <div>
                        <h3>Your top companies:</h3>
                        <ul>
                            {messages.map((msg, index) => (
                                <Company key={index} name={msg} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}