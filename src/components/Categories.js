import React, { useState, useEffect } from 'react'
import './main.css'
import Game from './Game'
import { useDispatch, useSelector } from 'react-redux'
import defineCategories from '../actions/defineCategories'
import defineWinnerX from '../actions/defineWinnerX'
import defineWinnerO from '../actions/defineWinnerO'

const Categories = () => {

    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
    const [finalCategory, setFinalCategory] = useState("")
    const [finalValue, setFinalValue] = useState("")

    const dispatch = useDispatch();

    const categories = useSelector(state => state.categoryReducer.category)

    useEffect(() => {
        dispatch(defineCategories())
        dispatch(defineWinnerX())
        dispatch(defineWinnerO())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setFinalCategory(selectedCategory)
        setFinalValue(selectedValue)
    }

    const handleChange = (e) => {
        setSelectedCategory(e.target.selectedOptions[0].innerText)
        setSelectedValue(e.target.value)
    }

    return (
        <>
        <h1>How to Play:</h1>
            <div className='howto'>This fun game is based on the gameshow Hollywood Squares. Here is how to play!</div>
            <div className='howto'>
                <ol>
                    <li>Select a trivia category from the dropdown list then click the 'Submit' button. A Tic-Tac-Toe gameboard will display below.</li>
                    <li>Pick a slot you want to play, and click the card. The card will rotate to display a trivia question within the selected category as well as a multi-choice answer section.</li>
                    <li>When you select an answer, either an 'X' (incorrect) or an 'O' (correct) will replace the question on that card.</li>
                    <li>Get a Tic-Tac-Toe to win!</li>
                </ol>
                <form className='flexCont' onSubmit={handleSubmit}>
                    <select useRef='categoryDropdown' onChange={handleChange}>
                        <option defaultValue={'Pick A Category'}>Pick a category...</option>
                        {Array.isArray(categories)
                            ?
                            categories.map(category => <option key={category.category} value={category.value}>{category.category}</option>)
                            :
                            ""}
                    </select>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            {finalValue !== "" ? <Game value={finalValue} text={finalCategory} /> : null}
        </>
    )
}

export default Categories