import { Bingo } from "../../lib/types"

export default function BingoCard(props : { bingo : Bingo }) {
  return (
    <a href={"/game/"+props.bingo.name}>
      <div className="w-full text-center place-items-center p-4 shadow-2xl hover:bg-gray-200 transition ease-linear bg-white">
        <h1 className="text-lg font-semibold">{props.bingo.name}</h1>
        <p>{props.bingo.description}</p>
        <p>Antal frågor: {props.bingo.questions.length}</p>
      </div>
    </a>
  )
}