import React, { useEffect, useState } from 'react'
import useSound from "use-sound";
import play from "../assests/play.mp3";
import correct from "../assests/correct.mp3";
import wrong from "../assests/wrong.mp3";
import wait from "../assests/wait.mp3";


export default function QuestionSet({
    data,
    questionNumber,
    setQuestionNumber,
    setTimeOut,
}) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);
    const [waitPlay] = useSound(wait);


    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber])

    useEffect(() => {
        letsPlay();
      }, [letsPlay]);
    
    const handleClick = (a) => {
        console.log("answer",a)
        // waitPlay()
        setSelectedAnswer(a)
        setClassName("answer active");
        setTimeout(() => {
            setClassName(a.correct ? "answer correct" : "answer wrong");
        }, 3000);

        setTimeout(() => {
            if (a.correct) {
              correctAnswer(); 
              setTimeout(() => {
                setQuestionNumber((prev) => prev + 1);
                setSelectedAnswer(null);
              }, 1000);
            } else {
            wrongAnswer();
            
              setTimeout(() => {
                setTimeOut(true);
              }, 1000);
            }
          }, 5000);
           
    }
  
    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers?.map((a) => (
                    <div
                        className={selectedAnswer === a ? className : "answer"}
                        onClick={() => !selectedAnswer && handleClick(a)}
                    >
                        {a.text}
                    </div>
                ))}
            </div>
        </div>
    )
}
