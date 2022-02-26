import Celebration from "../src/celeb.gif";
import Sad from "../src/sad.gif";

const Modal = ({ status, open, setOpen, todayword, correctPos }) => {
  const copyToClipboard = () => {
    let shareText = "";
    if(correctPos && correctPos.length) {
      for(let i = 0; i < correctPos.length; i++) {
        let x = Array(todayword.length);
        for(let j = 0; j < correctPos[i].length; j++) {
          x[correctPos[i][j]] = '🟩';
          // x = x.slice(0, correctPos[i][j]) + '🟩' + x.slice(correctPos[i][j] + 1, todayword.length);
        }
        for(let k = 0; k < todayword.length; k++) {
          if(x[k] !== '🟩') {
            x[k] = '🟫';
            // x = x.slice(0, k) + '🟫' + x.slice(k + 1, todayword.length);
          }
        }
        x.map((a) => {
          shareText += a;
        })
        shareText += "\n";
      }
    }
    shareText += "Hey! Check out my score on today's Pic-A-Word!";
    window.navigator.clipboard.writeText(shareText);
  };

  return (
    <>
      {open ? (
        <div className="modal">
          <div className="modal-head">
            {status === "winner" ? (
              <>
                <h3>Congratulations!</h3>
                <h3>You won today's Pic-A-Word.😊</h3>
              </>
            ) : (
              <h3>
                Oh oh! You got a bit unlucky today. You used all of the 5 daily
                tries.🙁
              </h3>
            )}
            <p>Today's word was</p>
            <h2>{todayword.toUpperCase()}</h2>
          </div>
          <div className="modal-body">
            <img
              className="celebration"
              src={status === "winner" ? Celebration : Sad}
              alt="celebration"
            />
            <p>Share your result</p>
            <button className="share-button" onClick={copyToClipboard}>
              Share
            </button>
            <hr />
            <button className="share-button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
