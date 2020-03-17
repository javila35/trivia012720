const RANDOM_QUESTION_URL = "http://jservice.io/api/random";
let answerNode = null;

function fetchTrivia() {
  fetch(RANDOM_QUESTION_URL)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      publishTrivia(json[0]);
    });
}

function publishTrivia(trivia) {
  //   console.log(trivia)
  const questionNode = document.querySelector(".card-text");
  questionNode.textContent = trivia.question;
  const categoryNode = document.querySelector(".card-title");
  categoryNode.textContent = trivia.category.title;
  //   const answerNode = document.querySelector(
  //   "#answer .card-body .card-text"
  //   );
  //   console.log(answerNode);
  answerNode = document.querySelector("#answer");
  answerNode.querySelector(".card-text").textContent = trivia.answer;
}

function calculateAnswers(answer) {
  const span = document.getElementById("calculation");
  const correct = document.getElementById("correct-answers");
  const incorrect = document.getElementById("incorrect-answers");
  let newNumber = document.createElement("span");
  if (answer === "correct") {
    newNumber.innerText = parseInt(correct.innerText) + 1;
    newNumber.id = "correct-answers";
    span.replaceChild(newNumber, correct);
  } else {
    newNumber.innerText = parseInt(incorrect.innerText) + 1;
    newNumber.id = "incorrect-answers";
    span.replaceChild(newNumber, incorrect);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  fetchTrivia();
  document.getElementById("answer-button").addEventListener("click", function() {
      answerNode.style.display = "block";
      console.log("hello");
    });
  document.getElementById("next-button").addEventListener("click", function() {
    answerNode.style.display = "none";
    fetchTrivia();
  });

  const form = document.getElementById("right-or-wrong")
  form.addEventListener("submit", function(event){
    event.preventDefault();
    const answer = event.target["answer"].value;
    calculateAnswers(answer);
  })

});