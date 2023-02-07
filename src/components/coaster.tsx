import React, { useState, useEffect } from "react"

async function fetcher(url: string) {
    let json
    while (true) {
        const res = await fetch(url)
        json = await res.json()

        if(json['mainPicture']['url'] &&
        !json['name'].trim().toLowerCase().includes('unknown') &&
        !json['name'].trim().toLowerCase().includes('roller coaster')) {
            break
        }
    }
    return json
}

// Fisher-Yates shuffle algo
function shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  return array;
}

function Coaster(Props) {
    const url:string = 'http://localhost:8000/api/coasters/random'
    const [coaster, setCoaster] = useState(null)
    const [shouldFetch, setShouldFetch] = useState(true)

    const [choices, setChoices] = useState([])
    const [choice, setChoice ] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState(null)

    useEffect(() => {
    const fetchData = async () => {
        setChoice(null)
        let json = await fetcher(url)
        setCoaster(json)
        
        let choice1 = await fetcher(url)
        let choice2 = await fetcher(url)
        let choice3 = await fetcher(url)

        let choices = [json['name'],
            choice1['name'], choice2['name'], choice3['name']
        ]

        setChoices(shuffle(choices)) 
        setLoading(false)
        setShouldFetch(false)
        setResult(null)
    };
        if (shouldFetch) {
            fetchData()
        }
    }, [shouldFetch]);

    function handleSubmit(event) {
        event.preventDefault()
        if (!choice) {
            setError("Please Make a Selection")
            return
        } else {
            setError(null)
        }
        setResult((choice === coaster['name']).toString())
    }

    function nextQuestion(event:Event) {
        event.preventDefault()
        Props.onSignal(result)
        setShouldFetch(true)
    }
    
    if (shouldFetch) {
        return <p>loading</p>
    }

    return (
        <>
            <p>Country: {coaster['country']}</p>
            <img src={coaster['mainPicture']['url']} />

            <form onSubmit={handleSubmit}>        
                {choices.map((coasterName, index) => (
                    <div key={index}>
                        <input 
                            type="radio" 
                            id={"selection-"+ index} 
                            name="choice" 
                            value={coasterName}
                            checked={choice === coasterName}
                            onChange={(e) => setChoice(e.target.value)}
                        />
                        <label htmlFor={"selection-"+index}>{coasterName}</label>
                        <br />
                    </div>
                ))}
                {error  && (<p>{error}</p>)}
                <input 
                    type="submit"
                    value="Submit" 
                    disabled={result ? true : false } 
                />
            </form>
            {result && (result === "true" ? (<p>Correct</p>) : (<p>Incorrect</p>))}
            {result && (
            <button onClick={nextQuestion}>Next Question</button>)}
        </>
    )
}

export default Coaster
