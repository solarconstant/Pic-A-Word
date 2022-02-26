import axios from "axios";
import { useState, useEffect } from "react";
import GetPOSTag from "./functions/GetPOSTag";
import Modal from "./modal";
import "./App.css";

const App = () => {
  const [randomWord, setRandomWord] = useState();
  const [images, setImages] = useState();
  const [guess, setGuess] = useState();
  const [hour, setHour] = useState(0);
  const [pos, setPos] = useState();
  const [winner, setWinner] = useState("play");
  const [modelopen, setModelopen] = useState(false);
  const [alertModal, setAlertModel] = useState(false);
  const [correctPos, setCorrectPos] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [frame, setFrame] = useState();

  const getTodayData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/worddata`);

    if (res.data && res.data.length) {
      setRandomWord(() => res.data[0]["day_word"]);
      setImages(() => res.data[0]["photos"]);
    }
  };

  const handleChange = (e) => {
    e.target.value = e.target.value.toUpperCase();
    setGuess(() => e.target.value);
  };

  const handleClick = () => {
    if (guesses.length === 5) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      setModelopen((prev) => !prev);
      setWinner("loser");
    } else {
      if (guess.length !== randomWord.length) {
        setGuess(() => "");
        setAlertModel((prev) => !prev);
      } else {
        setGuesses(() => [...guesses, guess]);
        let x = frame;
        let nums = [];
        for (let i = 0; i < guess.length; i++) {
          if (guess[i].toLowerCase() === randomWord[i].toLowerCase()) {
            nums.push(i);
            x =
              x.slice(0, i) +
              randomWord[i].toUpperCase() +
              x.slice(i + 1, x.length);
          }
        }
        setGuess(() => "");
        if (winner === "play") {
          setCorrectPos(() => [...correctPos, nums]);
        }
        setFrame(() => x);
        if (guess.toLowerCase() === randomWord.toLowerCase()) {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          setWinner(() => "winner");
          setModelopen((prev) => !prev);
          setGuess(() => guess);
        } else {
          console.log("Try Again");
        }
      }
    }
  };

  useEffect(() => {
    console.log("Ha bhai Hacker? Kya chahiye?");
    getTodayData();
    setHour(() => Math.floor(new Date().getHours() / 2));
    let postag = GetPOSTag(randomWord);
    if (postag) {
      setPos(() => postag);
    }
    setAlertModel(() => false);
    setWinner(() => "play");
    if (randomWord && randomWord.length) {
      setFrame(() => "_".repeat(randomWord.length));
    }
  }, [randomWord]);

  return (
    <div className="App">
      {winner !== "play" ? (
        <Modal
          todayword={randomWord}
          open={modelopen}
          setOpen={setModelopen}
          status={winner}
          correctPos={correctPos}
        />
      ) : (
        <></>
      )}
      <h1 className="heading">PIC-A-WORD</h1>
      <h2 className="heading">Today's Picture</h2>
      <p>The picture will change every two hours.</p>
      <div className="image-holder">
        {images && images.length ? (
          <img className="image" src={`${images[hour]}`} alt="hint-image" />
        ) : (
          <h3>No image to show.</h3>
        )}
      </div>
      <div className="guess-area">
        <h3 className="heading">Guess the word:</h3>
        <div className="hints">
          <h3>Hints</h3>
          <p>
            {pos
              ? `Today's word is a/an ${pos}`
              : `No POS Tag found for today's word.`}
          </p>
          {alertModal && <p>Today's word is of Length: {randomWord.length}</p>}
          <h4>The word will be formed here</h4>
          {guesses && guesses.length && frame && frame.length ? (
            <p className="frameword">{frame}</p>
          ) : (
            <></>
          )}
        </div>
        {randomWord && (
          <input
            className="guess-input"
            value={guess}
            onChange={(e) => handleChange(e)}
            disabled={winner === "loser"}
          />
        )}
        <button className="guess-button" onClick={handleClick}>
          {winner === "play" ? `Guess` : `You've completed today's game.`}
        </button>
      </div>
    </div>
  );
};

export default App;
