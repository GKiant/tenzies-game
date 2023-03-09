import { nanoid } from "nanoid";

const allNewDice = () => {
  const newDice = [];
  for (let i = 0; i < 10; i++) {
    newDice.push(generateNewDie());
  }
  return newDice;
};

const generateNewDie = () => {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  };
};

export { allNewDice, generateNewDie };
