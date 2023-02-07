import { useNavigate } from 'react-router-dom'

function Root() {
    const navigate = useNavigate()

    const navigateToGame = () => {
        navigate('/game')
    }
    return (
        <>
            <h1>Coaster Trivia</h1>
            <button onClick={navigateToGame}>Start Game</button>
        </>
    )
}

export default Root
