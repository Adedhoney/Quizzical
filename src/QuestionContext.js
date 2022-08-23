import React from "react"

const QuestionContext = React.createContext()

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
}

export function ContextProvider({ children }) {
    const [questionArray, setQuestionArray] = React.useState([])
    const [showAnswers, setShowAnswers] = React.useState(false)
    const [difficulty, setDifficulty] = React.useState(
        localStorage.getItem("difficulty") || "easy"
    )

    function getNewQuestions() {
        fetch(
            `https://the-trivia-api.com/api/questions?limit=5&difficulty=${difficulty}`
        )
            .then((res) => res.json())
            .then((data) => {
                setShowAnswers(false)

                setQuestionArray(() => {
                    let answerAddedQuestions = []
                    for (let question of data) {
                        let allAnswers = [
                            question.correctAnswer,
                            ...question.incorrectAnswers,
                        ]
                        shuffle(allAnswers)
                        answerAddedQuestions.push({
                            ...question,
                            chosenAnswer: "",
                            allAnswers: allAnswers,
                        })
                    }

                    return answerAddedQuestions
                })
            })
    }
    React.useEffect(getNewQuestions, [])

    function selectAnswer(questionID, theChosenAnswer) {
        setQuestionArray((prevAnswers) =>
            prevAnswers.map((question) => {
                if (question.id === questionID) {
                    return { ...question, chosenAnswer: theChosenAnswer }
                } else {
                    return { ...question }
                }
            })
        )
    }

    return (
        <QuestionContext.Provider
            value={{
                questionArray,
                showAnswers,
                difficulty,
                getNewQuestions,
                selectAnswer,
                setShowAnswers,
                setDifficulty,
            }}
        >
            {children}
        </QuestionContext.Provider>
    )
}

export default QuestionContext
