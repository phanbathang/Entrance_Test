import React, { useState, useEffect } from "react";
import  "./GameBoard.css";

const GameBoard = ({ caseLogic }) => {
  const [points, setPoints] = useState(5); //The number of points to find
  const [sequence, setSequence] = useState([]); //An array containing a sequence of numbers from 1 to points
  const [shuffledSequence, setShuffledSequence] = useState([]); //The sequence array shuffled to display randomly
  const [userInput, setUserInput] = useState([]); //A list of numbers selected by the player
  const [message, setMessage] = useState("Play"); //The game status (Play, Restart, ALL CLEARED)
  const [autoPlay, setAutoPlay] = useState(false); //Determines whether Auto Play mode is enabled
  const [time, setTime] = useState(0); //The game timer
  const [playing, setPlaying] = useState(false); //Indicates whether the game is in progress
  const [timerMap, setTimerMap] = useState({}); //Stores the time display state for each number
  const [hiddenPoints, setHiddenPoints] = useState(new Set()); //A set of numbers that have been correctly selected and hidden
  const [positions, setPositions] = useState({}); //Stores the random position of each number on the board
  const [tempPoints, setTempPoints] = useState(points); //Used to input the desired number of points
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0); //Stores the index of the next number in Auto Play mode

  //Set up the sequence and number positions
  useEffect(() => {
    const newSequence = [...Array(points).keys()].map((i) => i + 1);
    setSequence(newSequence);
    setShuffledSequence([...newSequence].sort(() => Math.random() - 0.5));

    const newPositions = {};
    newSequence.forEach((num) => {
      newPositions[num] = {
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
      };
    });
    setPositions(newPositions);
  }, [points]);

  //Calculate play time
  useEffect(() => {
    let timer;
    if (playing) {
      timer = setInterval(() => setTime((t) => t + 0.1), 100);
    }
    return () => clearInterval(timer);
  }, [playing]);

  //Auto Play mode
  useEffect(() => {
    let autoTimer;
    if (autoPlay && playing && currentAutoIndex < sequence.length) {
      autoTimer = setTimeout(() => {
        const nextNum = sequence[currentAutoIndex];
        if (!hiddenPoints.has(nextNum)) {
          handleUserClick(nextNum);
        }
        setCurrentAutoIndex((prevIndex) => prevIndex + 1);
      }, 2000);
    }
    return () => clearTimeout(autoTimer);
  }, [autoPlay, playing, currentAutoIndex]);

  //Handle user number selection
  const handleUserClick = (num) => {
    if (!playing || hiddenPoints.has(num) || timerMap[num] !== undefined) return;

    caseLogic.handleUserClick(num, {
      sequence,
      userInput,
      setUserInput,
      setMessage,
      setPlaying,
      setTimerMap,
      setHiddenPoints,
    });
  };

  //Handle Restart
  const handleRestart = () => {
    setUserInput([]);
    setMessage("Restart");
    setTime(0);
    setPlaying(true);
    setTimerMap({});
    setHiddenPoints(new Set());
    setSequence([...Array(points).keys()].map((i) => i + 1));
    setCurrentAutoIndex(0);
  };

  const handlePointsChange = (e) => {
    setTempPoints(e.target.value);
  };

  const handlePointsKeyDown = (e) => {
    if (e.key === "Enter") {
      setPoints(parseInt(tempPoints) || 5);
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev);
  };

  return (
    <div className="WrapperContainer">
      <h2>{message === "All CLEARED" ? "" : message}</h2>
      <p>
        Points:
        <input
          className="WrapperPoint"
          type="number"
          value={tempPoints}
          onChange={handlePointsChange}
          onKeyDown={handlePointsKeyDown}
        />
      </p>
      <p>Time: {time.toFixed(1)}s</p>
      <button className="WrapperButton" onClick={handleRestart}>{message === "All CLEARED" ? "Restart" : message}</button>
      {playing && (
        <button className="WrapperButtonAutoPlay" onClick={toggleAutoPlay}>
          Auto Play {autoPlay ? "OFF" : "ON"}
        </button>
      )}
      <div className="WrapperGameBoard">
        {shuffledSequence.map(
          (num) =>
            !hiddenPoints.has(num) && (
              <div
                key={num}
                style={{
                  position: "absolute",
                  ...positions[num],
                }}
              >
                <button className="WrapperNumberButton"
                  style={{ opacity: timerMap[num] !== undefined ? 0.5 : 1 }}
                  onClick={() => handleUserClick(num)}
                  disabled={timerMap[num] !== undefined}
                >
                  {num}
                </button>
                {timerMap[num] !== undefined && (
                  <span className="WrapperTimerText">
                    {timerMap[num]}
                  </span>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default GameBoard;
