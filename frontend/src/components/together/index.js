import React from "react";
import "./style.css"
import Features from "./features";
import { useHistory } from "react-router-dom";


const Together = () => {
    const history = useHistory();

    const pushToLogin = () => {
        history.push("/sign")
    }

    return (
        <>
            <div className="togetherSections">
                <section>
                    <body>
                        <div className="firstBox">
                            <h1 class="firstHeader">
                                <span class="mainText">Together</span>
                                <span class="subText">A world of communication and learning</span>
                            </h1>
                        </div>
                    </body>
                </section>

                <section>
                    <Features />
                </section>
                <div className="lastSection">
                    <h1 className="waitingHeader">What are you waiting for ?</h1>
                    <button className="joinButton" onClick={pushToLogin}>Join Us Now!</button>
                </div>
                <section>
                </section>
            </div>
        </>
    )

}

export default Together;
