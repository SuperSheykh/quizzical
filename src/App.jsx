import Welcome from "./components/Welcome"
import Questionnaire from "./components/Questionnaire"
import { useEffect, useState } from "react"
import he from 'he'
import { nanoid } from "nanoid"
import { shuffle } from "./utils"


const App = () => {
  const [playMode, setPlayMode] = useState(() => false)
  const [showMode, setShowMode] = useState(()=> false)
  const [fetchMode, setFetchMode] = useState(()=> true)
  const [quizz, setQuizz] = useState(()=>[])
  const [rightAnswers, setRightAnswers] = useState(()=>[])
  const [userAnswers, setUserAnswers] = useState(()=>[])
  const [score, setScore] = useState(()=>0)

  // INSTEAD OF A STATE, I'LL CREATE A FUNCTION THAT GET THE CORRECT ANSWERS ARRAY WITH THE IDs
  // const grabRightAnswers = (data) =>  data.map( q => ({qId: q.id, answerId: q.options[0].id}) )
  const grabShuffledMyQuizz = (data) => {
    return data.map( q => {
      // CREATING THE OPTIONS ARRAY ADDING THE CORRECT ANSWER TO THE FALSE ONE
      const myOptions = []
      myOptions.push(q.correct) 
      q.options.map(o => myOptions.push(o))
      // Now returning an object with same props but a brand new shuffle options
       return (
        {
          id: q.id,
          question: q.question,
          options: shuffle(myOptions)
        }
       )
    })
  }
  const grabRightAnswers = (data) =>  data.map( q => q.correct.id )
  const initiateAllData = (srcQuizzData) => {
      setQuizz(()=> grabShuffledMyQuizz(srcQuizzData))
      setRightAnswers(()=> grabRightAnswers(srcQuizzData))
     
  }

  // OPTION 2
  useEffect(()=>{

    async function newQuizzData() {
      
      const srcQuizz = await fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
          return data.results.map(res => {
            return ( 
              {
                id: nanoid(),
                question: he.decode(res.question),
                correct: {
                            id: nanoid(),
                            value: he.decode(res.correct_answer),
                            isSelected: false
                           },
                options: [...res.incorrect_answers.map(inc => (
                            {
                              id: nanoid(),
                              value: he.decode(inc),
                              isSelected: false
                            })
                            )
                          ]             
              })
          })   
      })

      initiateAllData(srcQuizz)
      return srcQuizz
      
    }
    if(fetchMode){

      newQuizzData()
      setFetchMode(false)
    } 

  },[fetchMode])


  // OPTION 1
  // useEffect(()=>{

  //   const getQuizz = fetch("https://opentdb.com/api.php?amount=5")
  //     .then(res => res.json())
  //     .then(data => {
  //       // CREATES A SPECIAL ARRAY ACCORDING TO OUR NEEDS FOR THE PROJECT
  //       setQuizz(prev => {
  //         const myQuizz = []

  //         data.results.map( res => {
  //           // THIS PUSHES THE DATA INTO AN ARRAY WITH THE RIGHT ANSWER BEING THE FIRST IN OPTIONS
  //           myQuizz.push(
  //             {
  //               id: nanoid(),
  //               question: he.decode(res.question),
  //               options: [{
  //                             id: nanoid(),
  //                             value: he.decode(res.correct_answer),
  //                             isSelected: false
  //                           },...res.incorrect_answers.map(inc => (
  //                           {
  //                             id: nanoid(),
  //                             value: he.decode(inc),
  //                             isSelected: false
  //                           })
  //                           )
  //                         ]
                                    
  //             }
  //             )
  //         })
  //         // CREATES AND ASSIGN THE CORRECT ANSWERS ID TO THE QUESTIONS ID
  //         setRightAnswers(prev =>  myQuizz.map( q => q.options[0].id ))
            
  //         // THIS RETURNS MYQUIZZ BUT WITH THE OPTIONS SHUFFLED UP!!!
  //         return myQuizz.map( q => ({...q, options:shuffle(q.options)}))
  //       })
  //     })
  //     return () => getQuizz
  // },[])

  // THE GOAL IS TO RETRIEVE THE SCORE OF THE PLAYER!! NOT DONE YET!!
  useEffect(()=>{
    setUserAnswers(() => quizz.map(q => {
      return q.options.filter(o => o.isSelected)[0]?.id
    })
    )
  },[quizz])

  // IT TOGGLES THE MODE SO ANSWERS GET SHOWN OR NOT;
  const togglePlayMode = (a) => setPlayMode(a)
  const toggleShowMode = (a) => setShowMode(a)
  const toggleFetchMode = (a) => setFetchMode(a)

  // WORKING ON SELECTING ANSWERS! AND UPDATE QUIZZ DATA ACCORDINGLY.
  function selectOption(questionId, optionId){
    setQuizz(prev => prev.map( q => q.id === questionId ?
          {
            ...q, 
            options: q.options.map(o => o.id === optionId ? {...o, isSelected: o.isSelected ? false : true} : {...o, isSelected: false}) 
          }

          : q
                    
    ))
  }
  // IT CALCULATE THE SCORE OF THE USER AND SEND IT AS PROP TO THE QUESTIONNAIRE
  const finalScore = () => {
    let score = 0
    userAnswers.map( a => {
      if(rightAnswers.includes(a)){
        return score++
      }
    })
    return score
  }

  return (
    <main className={!playMode? "quizz" : ""}>
      {!playMode && <Welcome startQuizz={()=> setPlayMode(true)}/>}

      {playMode &&

      <Questionnaire 
        quizz={quizz} 
        showMode={showMode} 
        handleOptionClick={selectOption} 
        toggleShowMode={toggleShowMode}
        toggleFetchMode={toggleFetchMode}
        rightAnswers={rightAnswers}
        finalScore={finalScore}
      />}

    </main>
  )
}

export default App