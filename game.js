const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
    question:"What does HTML stand for?",
    choice1:" Hyperlinks and Text Markup Language",
    choice2:"Hyper Text Markup Language",
    choice3:"Home Tool Markup Language",
    choice4:"None",
    answer: 2
  },
  {
    question:"Which of the following tags is used to define an unordered list in HTML?",
    choice1:"&lt;ol&gt;",
    choice2:"&lt;li&gt;",
    choice3:"&lt;ul&gt;",
    choice4:"&lt;ul&gt",
    answer: 3
  },
  {
    question:"What is the correct CSS syntax to change the font size of a paragraph to 18 pixels?",
    choice1:"p {font-size: 18px;}",
    choice2:"p.font-color {18px;}",
    choice3:"paragraph {font-size: 18px;}",
    choice4:"p.font-size {18px;}",
    answer: 4
  },
  {
    question:"What does CSS stand for?",
    choice1:"Computer Style Sheets",
    choice2:"Creative Style Sheets",
    choice3:"Cascading Style Sheets",
    choice4:"None",
    answer: 3
  },
  {
    question:"Which property is used to change the background color of an element in CSS?",
    choice1:"color",
    choice2:"background-color",
    choice3:"backgroundcolor",
    choice4:"bgcolor",
    answer: 2
  },
  {
    question:"What is the purpose of JavaScript in web development?",
    choice1:"To create dynamic and interactive web pages",
    choice2:"To style web pages",
    choice3:"To define the structure of web pages",
    choice4:"None",
    answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();