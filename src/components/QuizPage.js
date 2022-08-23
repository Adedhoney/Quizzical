import React from "react"
import QuestionTabElements from "./QuestionTab"
import questionContext from "../QuestionContext"

function QuizPage() {
    const {
        questionArray,
        difficulty,
        showAnswers,
        getNewQuestions,
        setShowAnswers,
        setDifficulty,
    } = React.useContext(questionContext)

    const [score, setScore] = React.useState(0)

    function getscore() {
        let score = 0
        for (let question of questionArray) {
            if (question.chosenAnswer === question.correctAnswer) {
                score += 1
            }
        }
        if (score === 5) {
            console.log(difficulty)
            if (difficulty === "easy") {
                localStorage.setItem("difficulty", "medium")
                setDifficulty("medium")
            } else {
                localStorage.setItem("difficulty", "hard")
                setDifficulty("hard")
            }
        }
        return score
    }

    function toggleShowAnswers() {
        setScore(getscore())
        setShowAnswers(true)
    }

    return (
        <div className="Page QuizPage">
            <h3>
                {showAnswers ? "Next difficulty" : "Difficulty"} : {difficulty}
            </h3>
            <br />
            <QuestionTabElements />
            {showAnswers && <p>You scored {score}/5 correct answers</p>}
            <button onClick={showAnswers ? getNewQuestions : toggleShowAnswers}>
                {showAnswers ? "New game" : "Check answers"}
            </button>
        </div>
    )
}

export default QuizPage
