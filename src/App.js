import React from "react"
import FirstPage from "./components/FirstPage"
import QuizPage from "./components/QuizPage"
import { ContextProvider } from "./QuestionContext"

function App() {
    const [gameStarted, setGameStarted] = React.useState(false)
    function startGame() {
        setGameStarted(true)
    }

    return gameStarted ? (
        <ContextProvider>
            <QuizPage />
        </ContextProvider>
    ) : (
        <FirstPage handleStartGame={startGame} />
    )
}

export default App
