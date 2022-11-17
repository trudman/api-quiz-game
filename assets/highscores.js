var highScoresEl = document.getElementById("highscores");
var highScore = JSON.parse(localStorage.getItem("highscores")) || [];

console.log(highScore);

highScoresEl.innerHTML = highScore
  .map((score) => {
    return `<li>${score.initials} - ${score.score}</li>`;
  })
  .join("");

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;
