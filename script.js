// Hajime!
// NOTE: I did this a MILLION WAYS and deleted them all. This was incredibly tough.
// ------------------------------------------------------------------------------------------------------------
// VARIABLES
var timer = document.getElementById('timer');
var startBtn = document.getElementById('start_quiz');
var questionContainer = document.getElementById('btn_container');
var startContainer = document.getElementById('start_container');
var shuffledQuestions, currentQuestionIndex;
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-btns');
var nextButton = document.getElementById('next-button');

// ------------------------------------------------------------------------------------------------------------

startBtn.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQ();
})

// ------------------------------------------------------------------------------------------------------------

// Questions and Answers
var questions = [
    {
        question: 'Objectively, what is the best KPOP group?',
        answers: [
            { text: 'ITZY', correct: true },
            { text: 'BTS', incorrect: false },
            { text: 'BLACKPINK', incorrect: false },
            { text: 'TWICE', incorrect: false }
        ]
    },
    {
        question: 'Objectively, what is the greatest Shounen?',
        answers: [
            { text: 'One Piece', correct: true },
            { text: 'Dragon Ball', incorrect: false },
            { text: 'Bleach', incorrect: false },
            { text: 'Naruto', incorrect: false }
        ]
    }
    // {
    //     question: 'Objectively, what is the best KPOP group?',
    //     answers: [
    //         { text: 'ITZY', correct: true },
    //         { text: 'BTS', correct: false },
    //         { text: 'BLACKPINK', correct: false },
    //         { text: 'TWICE', correct: false }
    //     ]
    // },
    // {
    //     question: 'Objectively, what is the best KPOP group?',
    //     answers: [
    //         { text: 'ITZY', correct: true },
    //         { text: 'BTS', correct: false },
    //         { text: 'BLACKPINK', correct: false },
    //         { text: 'TWICE', correct: false }
    //     ]
    // }
]

// ------------------------------------------------------------------------------------------------------------

function showQuestion(question) {
    questionElement.textContent = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

// ------------------------------------------------------------------------------------------------------------

function resetState() {
    nextButton.classList.add('hidden')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// ------------------------------------------------------------------------------------------------------------

function selectAnswer(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct
    addBtnClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        addBtnClass(button, button.dataset.correct);
    })
    // IF the shuffled Q length is greater tha nthe current index + 1...
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // remove HIDDEn 
        nextButton.classList.remove('hidden');
    } else {
        startBtn.innerText = 'Replay Quiz';
        startBtn.classList.remove('hidden');
    }
}

// ------------------------------------------------------------------------------------------------------------

function addBtnClass(element, correct) {
    removeBtn(element)
    if (correct) {
        element.classList.add('correct')
        // alert('Correct! Bravo citizen!')
        return;
    } else {
        element.classList.add('incorrect')
        // alert('Attrocious!')
    }
    console.log('Working as well')
}

// ------------------------------------------------------------------------------------------------------------

// 
function removeBtn(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
    console.log('Working')
}

// ------------------------------------------------------------------------------------------------------------

// TIMER function
function count() {
    // Sets the base amount of time
    var timeLeft = 50;

    var timeInt = setInterval(function() {
        // Subtracts one from the timeLeft variable...
        timeLeft--;
        timer.textContent = timeLeft + " seconds left.";
        // IF timeLeft equals 0, timer stops (timeInt ceases; does not restart)
        if (timeLeft === 0) {
            clearInterval(timeInt);
            // IF incorrect, subract the time by 10
        } else if (!correct) {
            timeLeft = timeLeft - 10;
        }

    }, 1000)

}

// ------------------------------------------------------------------------------------------------------------

// Start Game
function startGame() {
    console.log('Start')
    // HIDE the class list to HIDE the start container...
    startContainer.classList.add('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    // And then to remove the HIDDEN on the question container
    questionContainer.classList.remove('hidden');
    nextQ()
    count();
}

function nextQ() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

// ------------------------------------------------------------------------------------------------------------


// WHEN all questiones answered OR timer goes to 0 ----> Send USER to SCORE.HTML and display their score 