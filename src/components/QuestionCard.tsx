import { useState } from "react";
import { Question } from "../../lib/types";

export default function QuestionCard( { question, bingoCheck }: { question: Question, bingoCheck : () => void } ) {

  const [isClicked, setIsClicked] = useState(false);

  function clickHandler() {
    setIsClicked(!isClicked);
    question.isAnswered = !question.isAnswered;
    bingoCheck();
  }
  
  return (
    <div onClick={clickHandler} className={(isClicked ? "bg-green-500" : "bg-white hover:bg-gray-200")+" p-2 mb-2 h-48 justify-center flex text-center place-items-center shadow-2xl transition-transform ease-linear"}>
      <h1 className="text-lg font-semibold select-none">{question.question}</h1>
    </div>
  )

}