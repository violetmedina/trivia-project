import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import Answer from './Answer';
import './main.css';
import he from 'he';

const Game = ({ value, text }) => {

    // receive info from API from parent component, Categories, then display Q and A, A in random order
    const [triviaData, setTriviaData] = useState([])
    const [shuffledAnswers, setShuffledAnswers] = useState([])
    const [showAnswers, setShowAnswers] = useState(true);

    const answersArr = useSelector(state => state.answerReducer.answers)
    // const cAnswer = useSelector(state => state.answerReducer.cAnswer) //not used?
    const gameSection = useRef(null)

    useEffect(() => {
        const triviaData = async () => {
            let url = `https://opentdb.com/api.php?amount=9&category=${value}&type=multiple`
            let response = await fetch(url)
            let data = await response.json();
            setTriviaData(data.results)
        }
        triviaData()
    }, [])

    useEffect(() => {
        setShuffledAnswers(shuffleArray(answersArr))
        setShowAnswers(true);
    }, [answersArr])

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    useEffect(() => {
        scrollDown()
    }, [])

    const scrollDown = () => {
        window.scrollTo({
            top: gameSection.current.offsetTop,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <div ref={gameSection}>
                <h2>Selected Category: <b>{text}</b></h2>
                <div className="container">
                    <div className="row">
                        {triviaData.map((question, index) => {
                            return (
                                <div key={index} id="cards" className="col-4 d-flex flex-wrap justify-content-center">
                                    <Card question={question} index={index} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="container">
                    <h5>
                        <div className="row">
                            {showAnswers ? <DisplayAnswers answersArr={answersArr} setShowAnswers={setShowAnswers} /> : null}
                        </div>
                    </h5>
                </div>
            </div>
        </>
    ) //end of return
} //end of function Game

const DisplayAnswers = ({ answersArr, setShowAnswers }) => {
    return (
        <>
            <div>Answers:</div><br /><br />
            {answersArr !== undefined
                ?
                answersArr.map((answer, index) => {
                    return (
                        <div key={index} className='col-6'>
                            <div>
                                <Answer answer={he.decode(answer)} index={index} setShowAnswers={setShowAnswers} />
                                {/* {showAnswers ? <DisplayAnswers answer={answer} index={index}/> : null} */}
                            </div>
                        </div>
                    )
                })
                : ""
            }
        </>
    )
}
export default Game