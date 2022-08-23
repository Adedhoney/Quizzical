import React from "react"
import questionContext from "../QuestionContext"

function QuestionTabElements() {
    const { questionArray } = React.useContext(questionContext)
    return (
        <>
            {questionArray.map((questionInfo) => (
                <QuestionTab
                    key={questionInfo.id}
                    questionInfo={questionInfo}
                />
            ))}
        </>
    )
}

function QuestionTab(props) {
    const { selectAnswer, showAnswers } = React.useContext(questionContext)

    let question = props.questionInfo.question
    let chosenAnswer = props.questionInfo.chosenAnswer
    let correctAnswer = props.questionInfo.correctAnswer

    // html escaping
    let elem = document.createElement("textarea")
    elem.innerHTML = question
    question = elem.value

    let answers = [...props.questionInfo.allAnswers]

    let answers_spans = answers.map((answer) => (
        <span
            key={answer}
            // creating class name for css styling
            className={(() => {
                let classname = ""
                if (answer === chosenAnswer) {
                    classname = classname + " chosen_answer"
                }
                if (showAnswers) {
                    if (answer === correctAnswer) {
                        classname += " correct_answer"
                    } else if (answer === chosenAnswer) {
                        classname += " incorrect_answer"
                    }
                }
                return classname
            })()}
            onClick={
                showAnswers
                    ? () => {
                          return
                      }
                    : () => selectAnswer(props.questionInfo.id, answer)
            }
        >
            {answer}
        </span>
    ))

    return (
        <div>
            <h3>{question}</h3>
            <div className="answer_div">{answers_spans}</div>
            <hr />
        </div>
    )
}

export default QuestionTabElements
