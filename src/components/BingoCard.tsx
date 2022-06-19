import { Bingo } from "../../lib/types"

export default function BingoCard(props : { bingo : Bingo }) {
  return (
    <a href={"/"+props.bingo.id}>
      <div className="w-full text-center place-items-center p-4 shadow-2xl hover:scale-105 transition ease-linear bg-white">
        <h1 className="text-lg font-semibold">{props.bingo.name}</h1>
        <p>{props.bingo.description}</p>
        <p>Antal frågor: {props.bingo.questions.length}</p>
      </div>
    </a>
  )
}