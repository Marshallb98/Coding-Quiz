var quizQuestions = document.getElementById("questions");
var btnStart = document.getElementById("btn-start");
var titleitem = document.getElementById("title-item");
var qAnswer = document.getElementById("qAnswer");
var questionanswers = document.getElementById("question-answers");
var btnScore = document.getElementById("btnScore");
var myScore = document.getElementById("score");
var nextQuestions
var timercounter = document.getElementById("timer-counter");
var info = document.getElementById("info");
var currentindex = 0;
var score = 0;
var count = 60;
// array that keeps my scores and will put in local storage
var allScores = [];
//getting my scores from local storage
var storedScores = JSON.parse(localStorage.getItem("scoresSaved"));
// all of my questions
var questionsArray = [
    {
        title: "HTML stands for?",
        choices: ["Hyper Text Marking Language", "Hope This Make Language", "Hyper Text Markup Language", "Hyper Text Markup Lingo"],
        answer: "Hyper Text Markup Language"
    },
    {
        title: "What are all elements wrapped in?",
        choices: ["Quotes", "{}", "()", "<>"],
        answer: "<>"
    },
    {
        title: "Which has the biggest font size?",
        choices: ["p", "h2", "h1", "h6"],
        answer: "h1"
    },
    {
        title: "I want to reference li only with the parent el of ul in css how can I do that?",
        choices: ["ul > li", "ul", "li", "ul-li"],
        answer: "ul > li"
    },
    {
        title: "What is the best way to look at how a website is built?",
        choices: ["Download the webpage", "console.log", "email them", "inspect tool"],
        answer: "inspect tool"
    },
]
// when I click start button it begins the quiz
btnStart.addEventListener("click", quiz);
function quiz() {
    if (storedScores !== null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timercounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions = questionsArray[currentindex]

    setQuestion(nextQuestions)

    startGame()
}
// starts the quiz when called and sets counter = 60
function startGame() {

    var timeinterval = setInterval(function () {
        timercounter.innerText = count
        count--;
    }, 1000);

}
// when you enter your initials it saves it to the highscore page
btnScore.addEventListener("click", function () {
    var name = document.getElementById("inputScore").value
    scorePage(name, count)
});
// pulls question from array and displays it with the answer choices
function setQuestion(questionArray) {
    titleitem.innerText = questionArray.title
    questionArray.choices.forEach(element => {
        var button = document.createElement("button")
        button.className = "btn-primary btn-block text-left"
        button.innerText = element
        questionanswers.appendChild(button)
        button.addEventListener("click", setNextQuestion)
    });
}

// sets next question 
function setNextQuestion(event) {
    currentindex++
    if (currentindex < questionsArray.length) {
        answer(event.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML = ""
        if (currentindex < questionsArray.length) {
            nextQuestions = questionsArray[currentindex]
            setQuestion(nextQuestions)
        } else {
            currentindex = 0
            setQuestion(nextQuestions)
        }

    } else {
        endgame()


    }


}
// if answer is no or yes it responds accordingly and subtracts time from timer if answer is incorrect
function answer(response) {

    if (response) {
        qAnswer.innerText = "Correct!"
    } else {
        qAnswer.innerText = "Wrong Answer!"
        count = count - 15
        timercounter.innerHTML = count
    }
    setTimeout(function () {
        qAnswer.innerText = ""

    }, 1000);

}


function endgame() {
    myScore.innaText = count
    addscore.classList.remove("d-none")
    timercounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
}


function scorePage(a, b) {

    var scoresSaved = {
        name: a,
        userScore: b
    };
    allScores.push(scoresSaved);
    localStorage.setItem("scoresSaved", JSON.stringify(allScores));
    location.href = "high-score.html";
}


