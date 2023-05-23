import yy from '../assets/yy.png'
import bb from '../assets/bb.png'
import Question from './Question'

const Questionnaire = ({quizz, showMode, handleOptionClick, toggleShowMode, toggleFetchMode, rightAnswers, finalScore}) => {
    const isRight = (oId) => {
        return rightAnswers.includes(oId)
    }

    const newQuiz = () => {
        toggleShowMode(false)
        toggleFetchMode(true)
    }

    const quizzEl = quizz.map(q => (
        <Question 
            key={q.id}
            id={q.id}
            question= {q.question}
            options={q.options}
            handleOptionClick={handleOptionClick}
            showMode={showMode}
            isRight={isRight}
        />
    ))

    return (
        <>
            <img className='y' src={yy} alt="" />
            <img className='b' src={bb} alt="" />
            <h1>Pick your Anwsers</h1>
            <div className='quizz-container'>
                {quizzEl}
            </div>
            <div className='btn-container'>
                {!showMode &&<button className='check-btn' onClick={()=> toggleShowMode(true)}>Check Answers</button>}
                {showMode && <h5>You scored {finalScore()}/{rightAnswers.length} correct answers</h5>}
                {showMode && <button className='play-btn' onClick={()=>newQuiz()}>Play again</button>}
            </div>
        </>
    )
}

export default Questionnaire