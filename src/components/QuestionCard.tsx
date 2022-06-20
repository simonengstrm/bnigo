import { useState } from "react";

export default function QuestionCard( { question, bingoCheck }: { question: String, bingoCheck : () => void } ) {

  const [isClicked, setIsClicked] = useState(false);

  function clickHandler() {
    setIsClicked(!isClicked);
    bingoCheck();
  }
  
  return (
    <div onClick={clickHandler} className={"mb-2 h-48 justify-center flex text-center place-items-center shadow-2xl hover:scale-105 transition-transform ease-linear " + (isClicked ? "bg-green-500" : "bg-white")}>
      <h1 className="text-lg font-semibold">{question}</h1>
    </div>
  )

}