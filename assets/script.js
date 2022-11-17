var time = 60;
var timerStart;
var currentQuestionIndex = 0;

var startBtn = document.getElementById("start");
var timerEl = document.getElementById("time");
var startScreen = document.getElementById("start-screen");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var titleEl = document.getElementById("question-title");
var feedbackEl = document.getElementById("feedback");
var endScreenEl = document.getElementById("end-screen");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var highscoresEl = document.getElementById("highscores");

var questions = [
  {
    title: "Which of the following is NOT a primitive data type?",
    choices: ["String", "Boolean", "Number", "Object"],
    answer: "Object",
  },
  {
    title:
      "True or False: Global scope variables are accesible only within the function that they are defined?",
    choices: ["True", "False"],
    answer: "False",
  },
  {
    title: "Which of the following removes the last item from an array?",
    choices: ["push()", "shift()", "delete()", "pop()"],
    answer: "pop()",
  },
  {
    title: "In which HTML element do we link the Javascript code?",
    choices: ["<javascript>", "<index>", "<href>", "<script>"],
    answer: "<script>",
  },
  {
    title: "Which javascript method is used to write on the browsers console?",
    choices: ["console.window()", "console.DOM()", "console.log()", "console.write()"],
    answer: "console.log()",
  },
];

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  console.log("Start");
  startScreen.setAttribute("class", "hide");
  timerStart = setInterval(countdown, 1000);
  questionsEl.removeAttribute("class");
  getQuestion();
}

function getQuestion() {
  var currentQuest = questions[currentQuestionIndex];
  titleEl.textContent = currentQuest.title;

  choicesEl.innerHTML = "";

  for (i = 0; i < currentQuest.choices.length; i++) {
    var choice = currentQuest.choices[i];
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.innerText = i + 1 + ") " + choice;
    choicesEl.appendChild(choiceBtn);
  }
}
function countdown() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    time = 0;
  }
}

function questionClick(e) {
  var selectedButton = e.target;
  if (selectedButton.value === questions[currentQuestionIndex].answer) {
    console.log("correct!");
    time += 5;
    window.alert("Correct!");
  } else {
    console.log("Wrong!");
    time -= 10;
    window.alert("Wrong!");
  }
  currentQuestionIndex++;

  if (time <= 0 || currentQuestionIndex === questions.length) {
    gameOver();
    console.log("game over");
  } else {
    getQuestion();
  }
}

function gameOver() {
  clearInterval(timerStart);
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

function saveHighScore() {
  var initials = initialsEl.value;
  var highScore = JSON.parse(window.localStorage.getItem("highscores")) || [];

  var newScore = {
    initials: initials,
    score: time,
  };

  highScore.push(newScore);
  window.localStorage.setItem("highscores", JSON.stringify(highScore));
  window.location.href = "highscores.html";
}

choicesEl.onclick = questionClick;

submitBtn.onclick = saveHighScore;
