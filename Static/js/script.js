// BLACKJACK GAME
let blackjackGame = {
  you: { scoreSpan: "#youresult", div: "#youBox", score: 0 },
  dealer: { scoreSpan: "#dealerresult", div: "#dealerBox", score: 0 },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const player = blackjackGame["you"];
const autoDeal = blackjackGame["dealer"];

const hitSound = new Audio("Static/sounds/swish.m4a");
const winSound = new Audio("Static/sounds/cash.mp3");
const loseSound = new Audio("Static/sounds/aww.mp3");

document.querySelector("#blackHit").addEventListener("click", blackjackHit);
document.querySelector("#blackStand").addEventListener("click", dealerLogic);
document.querySelector("#blackDeal").addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = blackchoice();
    showCard(card, player);
    updateScore(card, player);
    showScore(player);
  }
}

function blackchoice() {
  let randomBlackchoice = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomBlackchoice];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img"); //creating
    cardImage.src = `Static/images/blackjack/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

const resultGame = document.querySelector("#blackresult");

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;

    let youImages = document.querySelector("#youBox").querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealerBox")
      .querySelectorAll("img");

    for (let i = 0; i < youImages.length; i++) {
      youImages[i].remove();
    }

    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    // RESETTING EVERYTHING

    player["score"] = 0;
    autoDeal["score"] = 0;

    document.querySelector("#youresult").textContent = 0;
    document.querySelector("#youresult").style.color = "white";
    document.querySelector("#dealerresult").textContent = 0;
    document.querySelector("#dealerresult").style.color = "white";
    resultGame.textContent = "Let's Plaayyyyyy!!!!";
    resultGame.style.color = "white";

    blackjackGame["turnsOver"] === true;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] <= 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "OOPS!!!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  }
}
// Setting up bot to play every 0.5s
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//ADDING A SECOND PLAYER

async function dealerLogic() {
  blackjackGame["isStand"] = true;

  // Turning dealer into a bot

  while (autoDeal["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = blackchoice();
    showCard(card, autoDeal);
    updateScore(card, autoDeal);
    showScore(autoDeal);
    await sleep(500);
  }

  blackjackGame["turnsOver"] = true;
  let winner = computeWinner();
  showResult(winner);
}

// Computing and Displaying Winner

function computeWinner() {
  let winner;

  if (player["score"] <= 21) {
    if (player["score"] > autoDeal["score"] || autoDeal["score"] > 21) {
      blackjackGame["wins"]++;
      winner = player;
    } else if (player["score"] < autoDeal["score"]) {
      blackjackGame["losses"]++;
      winner = autoDeal;
    } else if (player["score"] === autoDeal["score"]) {
      blackjackGame["draws"]++;
    }
  } else if (player["score"] > 21 && autoDeal["score"] <= 21) {
    blackjackGame["losses"]++;
    winner = autoDeal;
  } else if (player["score"] > 21 && autoDeal["score"] > 21) {
    blackjackGame["draws"]++;
  }

  console.log(blackjackGame);
  return winner;
}

// RESULT FUNCTION

function showResult(winner) {
  if (blackjackGame["turnsOver"] === true) {
    if (winner === player) {
      resultGame.textContent = "You Win!!!";
      resultGame.style.color = "red";
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      winSound.play();
    } else if (winner === autoDeal) {
      resultGame.textContent = "You Lose!!!";
      resultGame.style.color = "blue";
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      loseSound.play();
    } else {
      resultGame.textContent = "IT'S A DRAW!!!";
      resultGame.style.color = "green";
      document.querySelector("#draws").textContent = blackjackGame["draws"];
    }
  }
}

// Rock, Paper, Scissors

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const resetBtn = document.getElementById("rpsReset");
const wrapper = document.getElementById("flexrps");

function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(getRanchoice());
  results = decideWinner(humanChoice, botChoice);
  message = finalMessage(results); // returns an object like {'message": You Won', color: 'green'}
  // onclick what is displayed : displays human, bot and message
  finalDisplay(humanChoice, botChoice, message);
}

function getRanchoice() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, compChoice) {
  let rpsDatabase = {
    rock: { scissors: 1, paper: 0, rock: 0.5 },
    paper: { scissors: 0, paper: 0.5, rock: 1 },
    scissors: { scissors: 0.5, paper: 1, rock: 0 },
  };
  let yourScore = rpsDatabase[yourChoice][compChoice];
  let compScore = rpsDatabase[compChoice][yourChoice];
  return [yourScore, compScore];
}

function finalMessage([yourScore, compScore]) {
  if (yourScore === 0) {
    return { message: "YOU LOSE!", color: "red" };
  } else if (yourScore === 1) {
    return { message: "YOU WIN!", color: "blue" };
  } else {
    return { message: "DRAW!!", color: "green" };
  }
}

var humanDiv = document.createElement("div");
var messageDiv = document.createElement("div");
var botDiv = document.createElement("div");

function finalDisplay(humanImageChoice, botImageChoice, finalMessage) {
  rock.remove();
  paper.remove();
  scissors.remove();

  let imageDatabase = {
    rock: rock.src,
    paper: paper.src,
    scissors: scissors.src,
  };

  humanDiv.innerHTML =
    "<img src='" +
    imageDatabase[humanImageChoice] +
    "'height=150px width=150px style='box-shadow: 10px 10px 5px #453457'>";

  messageDiv.innerHTML =
    "<h1 style = 'color: " +
    finalMessage["color"] +
    "; font-size: 60px; padding: 30px; '>" +
    finalMessage["message"] +
    "</h1>";

  botDiv.innerHTML =
    "<img src='" +
    imageDatabase[botImageChoice] +
    "'height=150px width=150px style='box-shadow: 10px 10px 5px #490000'>";

  wrapper.appendChild(humanDiv);
  wrapper.appendChild(messageDiv);
  wrapper.appendChild(botDiv);
}

resetBtn.addEventListener("click", () => {
  if (wrapper.contains(humanDiv)) {
    wrapper.removeChild(humanDiv);
    wrapper.removeChild(messageDiv);
    wrapper.removeChild(botDiv);
    wrapper.appendChild(rock);
    wrapper.appendChild(paper);
    wrapper.appendChild(scissors);
  }
});
