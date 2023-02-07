import { useParams } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";


const calculateScore = (correct: number, numQuestions: number) => {
    return (correct / numQuestions) * 100
}

export default function GameOver() {
    let params = useLocation()

    const correct:number = params.state.correct
    const numQuestions:number = params.state.numQuestions


    console.log(params)
    return(
        <>
            <p>Final Score</p>
            <p>{correct} out of {numQuestions} correct</p>
            <p>Score</p>
            <p>{calculateScore(correct, numQuestions)} %</p>
            <Link to="/game">Play Again?</Link>
        </>
    )
}
