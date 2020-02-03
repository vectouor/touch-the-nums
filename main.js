'use strict'

var gBoardRow = 4;
var gNumbers;
var gNextNumClicked = 1;
var gInterval;
var gStartTime;

gNumbers = createNumbers(gBoardRow ** 2);

function init() {
    renderBoard();
}

function renderBoard() {

    var strHtml = '';

    //insert level buttons
    for (var i = 1; i <= 3; i++) {
        strHtml += `<button class="level" onclick="levels(this)">Level ${i}</button>`
    }
    var eltop = document.querySelector('.top');
    eltop.innerHTML = strHtml;

    //insert game board
    strHtml = '';
    for (var i = 0; i < gBoardRow; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gBoardRow; j++) {
            strHtml +=
                `<td class="board" onclick="cellClicked(this)">
                ${gNumbers.pop()}
            </td>`;
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell) {

    if (gNextNumClicked === (gBoardRow ** 2)) {
        console.log('done');
        clearInterval(gInterval);
    }

    var cellNum = +elCell.innerText;

    if (cellNum === 1 && cellNum === gNextNumClicked) {
        elCell.style.backgroundColor = 'red';
        elCell.style.color = 'white';
        gNextNumClicked++;
        getTime();

    } else if (cellNum === gNextNumClicked) {
        elCell.style.backgroundColor = 'red';
        elCell.style.color = 'white';
        gNextNumClicked++;
    }
}

function createNumbers(numbersCount) {

    var nums = [];

    for (var i = 0; i < numbersCount; i++) {
        nums.push(i + 1);
    }
    shuffle(nums);
    return nums;
}

function levels(elLevel) {
    switch (parseInt(elLevel.textContent.charAt(elLevel.textContent.length - 1))) {
        case 1:
            gBoardRow = 4;
            resetGame();
            break;
        case 2:
            gBoardRow = 5;
            resetGame();
            break;
        case 3:
            gBoardRow = 6;
            resetGame();
            break;
        default:
            break;
    }
}

function resetGame() {
    gNumbers = createNumbers(gBoardRow ** 2);
    renderBoard();
    clearInterval(gInterval);
    gNextNumClicked = 1;
    var elTimer = document.querySelector('.timer');
    gStartTime = 0;
    elTimer.innerText = gStartTime;
}

function getTime() {
    gStartTime = new Date().getTime();
    gInterval = setInterval(timer, 2, gStartTime)
}

function timer() {
    var elTimer = document.querySelector('.timer');
    var currentTime = new Date().getTime();
    var timeDiff = currentTime - gStartTime;
    var seconds = timeDiff / 1000;
    elTimer.innerText = seconds;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}