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

document.addEventListener("DOMContentLoaded", function() {
  fetchTrivia();
  document
    .getElementById("answer-button")
    .addEventListener("click", function() {
      answerNode.style.display = "block";
      console.log("hello");
    });
  document.getElementById("next-button").addEventListener("click", function() {
    answerNode.style.display = "none";
    fetchTrivia();
  });
});

//YOUR CODE HERE
