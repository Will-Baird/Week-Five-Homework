var triviaQuestions = [{
    question: "What sea creature has three hearts?",
    answerList: ["Cuttlefish", "Octopus", "Starfish", "Swordfish"],
    answer: 1
}, {
    question: "In nautical terms, what is the opposite of port?",
    answerList: ["Stern", "Bow", "Starboard", "Port Bow"],
    answer: 2
}, {
    question: "Who sang about being an eggman and a walrus?",
    answerList: ["The Beatles", "ACDC", "Van Halen", "The Who"],
    answer: 0
}, {
    question: "Which planet shares its name with a dog?",
    answerList: ["Saturn", "Mars", "Neptune", "Pluto"],
    answer: 3
}, {
    question: "How many bones are there on a Skull & Crossbones flag?",
    answerList: ["1", "2", "3", "4"],
    answer: 2
},
];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "Correct!",
    incorrect: "Sorry, that is incorrect",
    endTime: "Out of time!",
    finished: "Alright! Let's see the results!"
}

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;

    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "400px">');

    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}
