import { Bingo, Question } from "../lib/types";
import DatabaseService from "../lib/db.service";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Page from "../src/components/Page";
import QuestionCard from "../src/components/QuestionCard";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export async function getServerSideProps(context: { query: { name: string } }) {
  const { name } = context.query;
  const db = new DatabaseService();
  const bingo = await db.getBingo(name);
  shuffle(bingo.questions);

  return {
    props: {
      bingo,
    },
  };
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
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
  };

  const [isBingo, setIsBingo] = useState(false);
  const [bingoGrid, setBingoGrid] = useState(getGrid());

  function getGrid() {
    const res: Question[][] = new Array(dimension())
      .fill([])
      .map(() => new Array(dimension()).fill(""));
    for (let i = 0; i < dimension(); i++) {
      for (let j = 0; j < dimension(); j++) {
        res[i][j] = {
          question: props.bingo.questions[i * dimension() + j],
          isAnswered: false,
        };
      }
    }
    return res;
  }

  function bingoCheck() {
    setIsBingo(false);

    // Check rows
    for (let i = 0; i < bingoGrid.length; i++) {
      for (let j = 0; j < bingoGrid[i].length; j++) {
        if (!bingoGrid[j][i].isAnswered) {
          break;
        } else {
          if (j == bingoGrid[i].length - 1) {
            setIsBingo(true);
            return;
          }
          continue;
        }
      }
    }

    // Check columns
    for (let i = 0; i < bingoGrid.length; i++) {
      for (let j = 0; j < bingoGrid[i].length; j++) {
        if (!bingoGrid[i][j].isAnswered) {
          break;
        } else {
          if (j == bingoGrid[i].length - 1) {
            setIsBingo(true);
            return;
          }
          continue;
        }
      }
    }
  }

  const style = {
    gridTemplateColumns: `repeat(${dimension()}, 1fr)`,
    gridTemplateRows: `repeat(${dimension()}, 1fr)`,
    display: "grid",
  };

  const { width, height } = useWindowSize();

  return (
    <Page>
      {isBingo && (
        <div className="">
          <Confetti gravity={0.15} width={width} height={height} />
          <span className="pointer-events-none flex place-items-center justify-center text-9xl text-black absolute top-0 left-0 w-full h-full animate-spin z-50">
            BINGO
          </span>
        </div>
      )}

      <div style={style} className="gap-2 w-full">
        {bingoGrid.map((row, i) => (
          <div key={i} className="w-full">
            {row.map((cell, j) => (
              <div key={j} className="">
                <QuestionCard question={cell} bingoCheck={bingoCheck} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Page>
  );
}
