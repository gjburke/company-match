import "./Usage.css";
import TabBox from "./TabBox";
//style in wrapper component or this component?

//company values/culture/hiring/general description(how many employees? What kind of company ar they)
//navbar?

export default function Usage() {
    return(
        <div>
            <div className="frame" id="input">
                <div id="main-container">
                    <div id="top-bar">
                        <h1>
                            How to Match with Companies
                        </h1>
                    </div>
                    <div id="bottom-bar">
                        <div id="left-side">
                            <p>
                                Finding the right company can be a difficult feat, but through the use of our keyword matching system it can be easy to find companies that align with your ethical values and future goals! Follow the guide on the right to start finding your matches!-&gt;  
                            </p>
                        </div>
                        <div id="right-side">
                            <TabBox/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}