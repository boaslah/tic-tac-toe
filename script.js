// virable for all the grids
var grids = document.getElementsByClassName("grid-box");
// an array that has all the ids of the boxes
var boxesValue = ["grid1", "grid2", "grid3", "grid4", "grid5", "grid6", "grid7", "grid8", "grid9"];
// an array to store all the boxes that have been clicked
var blockboxes = [];
// a boolean variable to check if the human play
var human_play = false;
// players variable
var player1 = "X";
var player2 = "O";
// players score variables 
var player1_score = 0;
var player2_score = 0;
// an array to keep track of the grids indexes
var board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// function to check if the box clicked is clear
const check = (id) => {

    for (i = 0; i < blockboxes.length; i++) {
        if (id === blockboxes[i]) {
            return false;
        }
    }
    return true;
}

// get boxes id and allow human to play
const boxClick = (boxid) => {
    // check if human play variable is false
    if (human_play === false) {
        // check if the box clicked is clear
        if (check(boxid.id) === false) {
            alert("box alredy selected");
        }
        // if the box is clear 
        else {
            // split the id of the box to get the number
            var num = boxid.id.split('d');
            // occupy this position of the bord with the player
            board[num[1] - 1] = player1;
            boxid.innerHTML = "";
            boxid.innerHTML = player1;
            document.getElementById(boxid.id).style.color = "blue";
            // push that box to the block boxes array
            blockboxes.push(boxid.id);
            // set human play boolean variable to true because the human has play
            human_play = true;
            // call the check result function that checks if a player has won or not
            checkResult(player1);
            // if the human didn't win, call the computer to play
            setTimeout(() => {
                computerPlay();
            }, 1000);
        }
    }
}

// allow computer to play
const computerPlay = () => {
    // check if the human has play
    if (human_play === true) {
        var random = Math.floor(Math.random() * Math.floor(9))
        if (check(boxesValue[random]) === false) {
            computerPlay();
        }
        else {
            var num = boxesValue[random].split('d');
            board[num[1] - 1] = player2;
            document.getElementById(boxesValue[random]).innerHTML = "";
            document.getElementById(boxesValue[random]).innerHTML = player2;
            document.getElementById(boxesValue[random]).style.color = "blue";
            blockboxes.push(boxesValue[random]);
            checkResult(player2);
            human_play = false;
        }
    }
}

// funtion to add the players score
const incrementScore = () => {
    document.getElementById("player1").innerHTML = player1_score;
    document.getElementById("player2").innerHTML = player2_score;
}

// function to players result
const checkResult = (player) => {
    // if it's player 1
    if (player === player1) {
        // check if the player won
        if (wining(board, player1)) {
            setTimeout(() => {
                alert("You  Won the game");
                // call the increment score function
                incrementScore();
                // all the rset funtion
                restart()
            }, 200);

            // increment player 1 score
            player1_score = player1_score + 1;
        }
    }

    // if it's player 2
    else if (player === player2) {
        if (wining(board, player2)) {
            setTimeout(() => {
                alert("Computer won the game");
                // call the inccrement function
                incrementScore();
                // call the restart function
                restart()
            }, 200);
            // increment player 2 score
            player2_score = player2_score + 1;
        }
        // check if all the boxes have been selected andd end the game 
        if (blockboxes.length === 9) {
            alert("Game is over");
            restart()
        }
    }
}

// funtion to restart the game
const restart = () => {
    for (i = 0; i < blockboxes.length; i++) {
        var num = blockboxes[i].split('d');
        document.getElementById(blockboxes[i]).innerHTML = num[1];
        document.getElementById(blockboxes[i]).style.color = "rgb(173, 200, 230)";
    }
    blockboxes = [];
    human_play = false;
    player1 = "X";
    player2 = "O";
    board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

}

// function to check if a player won
const wining = (board, player) => {
    if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[0] === player && board[3] === player && board[6] === player)

    ) {
        return true;
    }
    else {
        return false;
    }
}