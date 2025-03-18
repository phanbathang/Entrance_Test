import React, { useState, useEffect } from "react";

const GameBoard = ({ caseLogic }) => {
  const [points, setPoints] = useState(5);
  const [sequence, setSequence] = useState([]);
  const [shuffledSequence, setShuffledSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [message, setMessage] = useState("Play");
  const [autoPlay, setAutoPlay] = useState(false);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [timerMap, setTimerMap] = useState({});
  const [hiddenPoints, setHiddenPoints] = useState(new Set());
  const [positions, setPositions] = useState({});
  const [tempPoints, setTempPoints] = useState(points);
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0); // Lưu index auto play
//// test
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

  useEffect(() => {
    let timer;
    if (playing) {
      timer = setInterval(() => setTime((t) => t + 0.1), 100);
    }
    return () => clearInterval(timer);
  }, [playing]);

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

  const handleRestart = () => {
    setUserInput([]);
    setMessage("Restart");
    setTime(0);
    setPlaying(true);
    setTimerMap({});
    setHiddenPoints(new Set());
    setSequence([...Array(points).keys()].map((i) => i + 1));
    setCurrentAutoIndex(0); // Reset auto play
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
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>{message === "All CLEARED" ? "" : message}</h2>
      <p>
        Points:
        <input
          type="number"
          value={tempPoints}
          onChange={handlePointsChange}
          onKeyDown={handlePointsKeyDown}
          style={{ width: "60px", textAlign: "center", marginLeft: "10px" }}
        />
      </p>
      <p>Time: {time.toFixed(1)}s</p>
      <button onClick={handleRestart}>{message === "All CLEARED" ? "Restart" : message}</button>
      {playing && (
        <button onClick={toggleAutoPlay}>
          Auto Play {autoPlay ? "OFF" : "ON"}
        </button>
      )}

      <div
        style={{
          width: "700px",
          height: "340px",
          border: "5px solid black",
          position: "relative",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          overflow: "hidden",
        }}
      >
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
                <button
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "18px",
                    borderRadius: "50%",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: timerMap[num] !== undefined ? 0.5 : 1,
                    cursor: "pointer",
                  }}
                  onClick={() => handleUserClick(num)}
                  disabled={timerMap[num] !== undefined}
                >
                  {num}
                </button>
                {timerMap[num] !== undefined && (
                  <span
                    style={{
                      position: "absolute",
                      top: "70%",
                      left: "50%",
                      transform: "translate(-50%, 0)",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
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
