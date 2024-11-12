const questions = [
    {
        question: "who is the best player in the world?",
        answers: [
            {text: "Kevin Durant", correct: false},
            {text: "Lebron James", correct: true},
            {text: "Luka Doncic", correct: false},
            {text: "Stepen Curry", correct: false},
        ]
    },
    {
        question: "who is the GOAT?",
        answers: [
            {text: "Stephen Curry", correct: false},
            {text: "Micheal Jordan", correct: false},
            {text: "Lebron James", correct: true},
            {text: "Magic Johnson", correct: false},
        ]

    },
    {
        question: "Who is the best Center EVER?",
        answers: [
            {text: "Hakeem Olajoun", correct: false},
            {text: "Dwight Howard", correct: false},
            {text: "Patrick Ewing", correct: false},
            {text: "Shaquille O'neal", correct: true},
        ]
    },
    {
        question: "Who is the best 3 point Shooter EVER?",
        answers: [
            {text: "Stephen Curry", correct: true},
            {text: "Reggie Miller", correct: false},
            {text: "Kyle Corver", correct: false},
            {text: "Klay Thomson", correct: false},
        ]
    },
    {
        question: "Who is the best Rebounder EVER?",
        answers: [
            {text: "Patrick Ewing", correct: false},
            {text: "David Robinson", correct: false},
            {text: "Dwight Howard", correct: false},
            {text: "Dennis Rodman", correct: true},
        ]

    },
    {
        question: "Who is the best shot Blocker EVER?",
        answers: [
            {text: "Dwight Howard", correct: false},
            {text: "Ben Wallace", correct: false},
            {text: "Dikembe Mutumbo", correct: true},
            {text: "Alonzo Morning", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore();
    }
}


nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{

        startQuiz()
    }

})

startQuiz()