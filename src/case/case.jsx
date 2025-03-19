import React from "react";
import GameBoard from "../components/GameBoard";

const caseLogic = {
  handleUserClick: (num, { sequence, userInput, setUserInput, setMessage, setPlaying, setTimerMap, setHiddenPoints }) => {
    const newInput = [...userInput, num];

    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      setMessage("Game Over");
      setPlaying(false);
      return;
    }

    setUserInput(newInput);

    setTimerMap((prev) => ({
      ...prev,
      [num]: 3,
    }));

    const countdown = setInterval(() => {
      setTimerMap((prev) => {
        if (!prev[num]) return prev;
        if (prev[num] === 1) {
          clearInterval(countdown);
          setHiddenPoints((prevHidden) => {
            const newHidden = new Set([...prevHidden, num]);
    
            if (newHidden.size === sequence.length) {
              setTimeout(() => {
                setMessage("ALL CLEARED");
                setPlaying(false);
              }, 500);
            }
    
            return newHidden;
          });
    
          const { [num]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [num]: prev[num] - 1 };
      });
    }, 1000);
    
  },
};

const Case = () => {
  return <GameBoard caseLogic={caseLogic} />;
};

export default Case;
