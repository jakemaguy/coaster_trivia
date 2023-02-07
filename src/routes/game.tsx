import { useState} from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

type Props = {
    onSignal: (result: string) => void
}

import Coaster from '../components/coaster'

export default function Game() {
    const navigate = useNavigate()
    const numQuestions:number = 2 // to be passed in via props
    const [question, setQuestion] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)

    const nextQuestionSignal = (result: string) => {
        setQuestion(question + 1)
        result === 'true' ? setCorrect(correct + 1) : setIncorrect(incorrect + 1)
    }

    return (
        <>
            <h1>What Coaster Is This?</h1>
            <Coaster onSignal={nextQuestionSignal}/>
            <p>Question {question}/{numQuestions}</p>
            <p>Correct: {correct}</p>
            <p>Incorrect: {incorrect}</p>
            {question === numQuestions &&(
                <Navigate 
                    to="/game-over" 
                    state={{correct: correct, incorrect: incorrect, numQuestions: numQuestions}}
                />
            )}
        </>
    )
}
