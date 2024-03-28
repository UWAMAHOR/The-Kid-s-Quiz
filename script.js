const questions = [
    {
        question: "What is capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "Landon", correct: false },
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false },
        ],
    },

    {
        question: "What is the tallest mammal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: true },
            { text: "Lion", correct: false },
            { text: "Hippopotamus", correct: false },
        ],
    },
    {
        question: "Which fruit is often called the 'king of fruits' and has a strong smell ",
        answers: [
            { text: "Grapefruit", correct: false },
            { text: "Banana", correct: false },
            { text: "Durian", correct: true },
            { text: "Mango", correct: false },
        ],
    },

    {
        question: "Who was the first President of the United States?",
        answers: [
            { text: "George Washington", correct: true },
            { text: "Abraham Lincoln", correct: false },
            { text: "Thomas Jefferson", correct: false },
            { text: "Benjamin Franklin", correct: false },
        ],
    },
    {
        question: "What is the largest country in the world by land area?",
        answers: [
            { text: "United States", correct: false },
            { text: "Russia", correct: true },
            { text: "Canada", correct: false },
            { text: "China", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let userScore = 0;

const startButtonEl = document.querySelector(".start-btn");
const welcomeScreenEl = document.querySelector(".welcome-screen");
const quizScreenEl = document.querySelector(".quiz-screen");
const questionEl = document.querySelector(".question");
const answersButtons = document.querySelector(".answers-container");
const nextButtonEl = document.querySelector(".next-btn");

startButtonEl.addEventListener("click", startQuiz);

function startQuiz() {
    welcomeScreenEl.style.display = "none";
    // quizScreenEl.style.display = "block";
    quizScreenEl.style.display = "flex";
    currentQuestionIndex = 0;
    userScore = 0;
    nextButtonEl.innerHTML = "Next";
    nextButtonEl.style.display = "none";
    displayQuestion();
}

function displayQuestion() {
    resetContainer();
    questionEl.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach((answer) => {
        const buttonEl = document.createElement("button");
        buttonEl.innerHTML = answer.text;
        buttonEl.classList.add("ans-btn");
        answersButtons.appendChild(buttonEl);

        if (answer.correct) {
            buttonEl.dataset.correctAns = answer.correct;
        }

        // console.log(buttonEl);

        buttonEl.addEventListener("click", checkAnswer);
    });
}

function checkAnswer(e) {
    const selectedButton = e.target;
    if (selectedButton.dataset.correctAns) {
        userScore++;
        console.log(userScore);
        selectedButton.classList.add("correct-ans");
    } else {
        selectedButton.classList.add("wrong-ans");
    }

    Array.from(answersButtons.children).forEach((button) => {
        if (button.dataset.correctAns === "true") {
            button.classList.add("correct-ans");
        }
        button.disabled = "true";
    });

    nextButtonEl.style.display = "block";
}

function displayResult() {
    resetContainer();
    questionEl.innerHTML = `Quiz is Completed! <br> Your Score: <span class="score">${userScore}/${questions.length}</span>`;

    nextButtonEl.innerHTML = "Restart Quiz";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        nextButtonEl.style.display = "none";
    } else {
        displayResult();
    }
}

nextButtonEl.addEventListener("click", function () {
    if (currentQuestionIndex < questions.length) {
        nextQuestion();
    } else {
        startQuiz();
    }
});

function resetContainer() {
    questionEl.textContent = "";
    answersButtons.innerHTML = "";
}
