import React from "react"

function FirstPage(props) {
    return (
        <div className="Page FirstPage">
            <h1>Quizzical</h1>
            <small>By Ade_dhoney</small>
            <button onClick={props.handleStartGame}>Start quiz</button>
        </div>
    )
}

export default FirstPage
