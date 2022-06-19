import { Bingo } from "../lib/types";
import DatabaseService from "../lib/db.service";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Page from "../src/components/Page";
import QuestionCard from "../src/components/QuestionCard";

export async function getServerSideProps(context: { query: { id: any; }; }) {
  const { id } = context.query;
  const db = new DatabaseService();
  const bingo = await db.getBingo(id);
  shuffle(bingo.questions);

  return {
    props: {
      bingo
    }
  }
}

function shuffle(array : any[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export default function Game(props: { bingo: Bingo }) {

  // Calculates dimensions of bingo given number of questions
  const dimension = () => {
    if (props.bingo.questions.length < 4) {
      return 1;
    } else if (props.bingo.questions.length < 9) {
      return 2;
    } else if (props.bingo.questions.length < 16) {
      return 3;
    } else if (props.bingo.questions.length < 25) {
      return 4;
    }
    return 5;
  }


  function getGrid () {
    const res : string[][] = new Array(dimension()).fill([]).map(() => new Array(dimension()).fill(""));
    for (let i = 0; i < dimension(); i++) {
      for (let j = 0; j < dimension(); j++) {
        res[i][j] = props.bingo.questions[i * dimension() + j];
      }
    }
    return res;
  }

  const [bingoGrid, setBingoGrid] = useState(getGrid());

  function bingoCheck() {
    
  }
  
  return (
    <Page>
      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        {bingoGrid.map((row, i) => (
          <div key={i} >
            {row.map((cell, j) => (
              <div key={j} className="">
                <QuestionCard question={cell} bingoCheck={bingoCheck}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Page>
  )

}