import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "./Die.jsx";
import { allNewDice, generateNewDie } from "./utils.js";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [round, setRound] = useState(0);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || ""
  );

  useEffect(() => {
    console.log("there");
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const rollDice = () => {
    setRound((oldRound) => oldRound + 1);
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  };

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const startNewGame = () => {
    if (!bestScore || round < bestScore) {
      setBestScore(round);
      localStorage.setItem("bestScore", JSON.stringify(round));
    }
    setTenzies(false);
    setDice(allNewDice());
    setRound(0);
  };

  return (
    <main>
      {tenzies ? <Confetti /> : null}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {!tenzies ? (
        <h3>Round: {round}</h3>
      ) : (
        <h3>
          You won in {round} round{round > 1 && "s"}!
        </h3>
      )}
      <div className="dice-container">{diceElements}</div>

      {!tenzies ? (
        <button className="action-btn" onClick={rollDice}>
          Roll
        </button>
      ) : (
        <button className="action-btn" onClick={startNewGame}>
          New Game
        </button>
      )}
      <h4>Best score: {bestScore}</h4>
    </main>
  );
}
