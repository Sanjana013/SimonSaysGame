let gameSeq = [];
let userSeq = [];
let scores = [];

let btnList = ["orange", "pink", "blue", "green"];

let level = 0;
let started = false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (started == false) {
        started = true;
        console.log("started");

        gameLevelUp();
    }
});

function gameLevelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btnList[randIndex];
    let randButton = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    buttonFlash(randButton);
}

function buttonFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash")
    }, 150);
}

function matchColors(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(gameLevelUp, 1000);
        }
    } else {
        if (level == 0) {
            scores.push(level);
        } else {
            scores.push(level-1);
        }
        
        let highScoreVal = maxScore(scores);
        if (level == 0) {
            h2.innerHTML = `Oops! You clicked before game started!<br><br>Press any key to restart the game!`;
        } else {
            h2.innerHTML = `Game Over! Your score was ${level-1}.
            <br>Press any key to restart the game!<br><br><span>HIGH SCORE : ${highScoreVal}</span>`;
        }
       
        let body = document.querySelector("body");
        body.style.backgroundColor = "#c9184a";
        setTimeout(function() {
            body.style.backgroundColor = "#e2ece9";
        },200);
        gameReset();
    }
}

function maxScore(scores) {
    let max = scores[0];
    for (let i=0; i<scores.length; i++) {
        if (scores[i]>max) {
            max = scores[i];
        }
    }
    return max;
}

function userButton() {
    let btn = this;
    // console.log(btn);
    buttonFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    matchColors(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", userButton);
}

function gameReset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}