const Help = ({ handleOpen }) => {
    return (
        <div className="help">
            <button onClick={handleOpen}>Close</button>
            <h2>How to Play</h2>
            <ul>
                <li>
                    This is a word-guessing game.
                </li>
                <li>
                    The words change every day and their length ranges from 5 to 8 letters.
                </li>
                <li>
                    The pictures help connect to the word.
                </li>
                <li>
                    There are 12 pictures in a day, they change every 2 hours.
                </li>
                <li>
                    Try your guesses in the input box. If the letters' positions match, it'll show up in the hints section.
                </li>
                <li>
                    You get only <strong>5</strong> tries.
                </li>
                <li>
                    For more help, the Part-of-Speech tag may also be available for the daily word.
                </li>
            </ul>
        </div>
    )
}

export default Help;