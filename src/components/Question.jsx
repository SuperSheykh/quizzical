
export default function Question({id, question, options, handleOptionClick, showMode, isRight}){
    const notstyled = {backgroundColor: "transparent"}
    const selected = {backgroundColor: "#D6DBF5", border: "none"} 
    const correct = {backgroundColor: "#94D7A2", border: "none"}
    const falseAns = {backgroundColor: "#F8BCBC", border: "none"}
    const style = (isSelected, isRight) => {

        return showMode ?
        isRight ? correct :
        isSelected && !isRight ? falseAns : notstyled
        :
        isSelected ? selected : notstyled
       
    
    }

    const questElement = options.map(a => <span 
                                key={a.id} 
                                className="answers" 
                                onClick={()=> handleOptionClick(id, a.id)}
                                style={style(a.isSelected, isRight(a.id))}
                                >
                                    {a.value}
                                </span>)
    

    return (
        <div className="question">
            <h2>{question}</h2>
            <div className="ans-container">
                {questElement}
            </div>
        </div>
    )
}