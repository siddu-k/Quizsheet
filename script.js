let timeLeft = 30;
let timerId;
let score = 0;
let userPin = "";

function startQuiz() {
    const pinInput = document.getElementById("pin");
    userPin = pinInput.value.trim();

    if (!userPin) {
        alert("Please enter a valid PIN!");
        return;
    }

    document.getElementById("pin-page").classList.add("hidden");
    document.getElementById("quiz-page").classList.remove("hidden");
    startTimer();
}

function startTimer() {
    timerId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            endQuiz();
        } else {
            document.getElementById("time").textContent = --timeLeft;
        }
    }, 1000);
}

function checkAnswer(button) {
    if (button.dataset.correct === "true") {
        score++;
    }
    clearInterval(timerId);
    endQuiz();
}

function endQuiz() {
    document.getElementById("quiz-page").classList.add("hidden");
    document.getElementById("result-page").classList.remove("hidden");
    document.getElementById("score").textContent = score;

    // Send data to the server
    sendToServer(userPin, score);
}

async function sendToServer(pin, score) {
    const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin, score }),
    });

    if (response.ok) {
        console.log("Data successfully sent to the server!");
    } else {
        console.error("Failed to send data.");
    }
}