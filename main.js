// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let LettersArray = Array.from(letters);

//Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
LettersArray.forEach((e) => {
  // Create Empty Span To Put Our Litter In
  let span = document.createElement("span");
  // Create Letter Text
  let theLetter = document.createTextNode(e);
  // Put Letter Text In The Empty Span
  span.appendChild(theLetter);
  // Adding Class For The Span
  span.className = "letter-box";
  // Adding Span For Letters Container
  lettersContainer.appendChild(span);
});

// Objects Of Words + Categories
const words = {
  Programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "mysql",
    "python",
  ],
  Movies: [
    "Perstige",
    "inception",
    "Parasite",
    "interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  People: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahata Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Random Property

let allKeys = Object.keys(words);
// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomPropName = allKeys[randomPropNumber];
// Category Words
let randomPropValue = words[randomPropName];
// Random Number Depend On Words
let randomValueNumber = Math.floor(
  Math.floor(Math.random() * randomPropValue.length)
);
// Random Word From Random Key
let randomValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValue);

// Create Spans Depend On Word
lettersAndSpace.forEach((e) => {
  //Create Empty Span
  let span = document.createElement("span");
  // If Letter Is Space
  if (e === " ") {
    // Add Class To The Span
    span.className = "with-space";
  }

  // Append Spans To The Letters Guess Container
  lettersGuessContainer.appendChild(span);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;
let rightAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    document.getElementById("pop").play();
    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    // The Chosen Word
    let theChosenWord = Array.from(randomValue.toLowerCase());

    theChosenWord.forEach((e, i) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter === e) {
        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (i === spanIndex) {
            span.innerHTML = e;
            span.classList.add("correct");
          }
        });
      }
    });
    // Outside Loop
    // If Letter Is Wrong
    if (
      document
        .querySelector(".letters-guess")
        .contains(document.querySelector(".with-space")) === true
    ) {
      rightAttempts = rightAttempts - 1;
    }
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;
      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Play Fail Sound
    } else {
      rightAttempts++;
    }
    if (wrongAttempts === 8) {
      document.getElementById("fail").play();
      endGameLose();
      lettersContainer.classList.add("finished");
    } else if (
      rightAttempts ===
      document.querySelector(".letters-guess").childElementCount
    ) {
      endGameWin();
    }
  }
});
// End Game Function
function endGameLose() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(
    `Game Over,The Word Is "${randomValue}"`
  );

  // Append Text To Div
  div.appendChild(divText);

  //Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);
}

function endGameWin() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`Perfect !"`);

  // Append Text To Div
  div.appendChild(divText);

  //Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);
}
