import React from "react";
import y from '../assets/y.png'
import b from '../assets/b.png'

const Welcome = ({startQuizz}) => {
    return (
        <>  
            <img className='y' src={y} alt="img blob" />
            <img className="b" src={b} alt="img blob" />
            <div className="welcome">
                <h1>Quizzical</h1>
                <h4>Ready to test your knowledge about life, history and many other topics? Let's go!</h4>
                <button className="start-btn" onClick={startQuizz}>Start Quiz</button>
            </div>
        </>
    )
}

export default Welcome