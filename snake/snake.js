import {Control} from "./control.js";

class Snake extends Control {

    squares;
    popup = document.getElementById('popup');
    start = document.getElementById('start');
    stop = document.getElementById('stop');
    playAgain = document.getElementById('playAgain');
    newScore = document.getElementById('newScore');
    highScoreDiv = document.getElementById('highScore');
    width = 60;
    currentSnake = [2, 1, 0];
    direction = 1;
    score = '0';
    highScore = '0';
    intervalTime = 0;
    interval = 0;


    constructor(direction, width, currentSnake) {
        super(direction, width, currentSnake);

        this._play();
        this._toggleGame();
        this.control();
    }


    _play() {
        this._createBoard();
        this.squares = document.querySelectorAll("#grid div");
        this._startGame();
    }

    _createBoard() {
        this.popup.style.display = "none";
        for (let i = 0; i < 1800; i++) {
            let div = document.createElement("div");
            document.getElementById('grid').appendChild(div);
        }
    }


    _startGame() {
        let squares = document.querySelectorAll("#grid div");
        this._randomApple(squares);
        this.direction = 1;
        this.intervalTime = 250;
        this.newScore.innerHTML = this.score;
        this.highScoreDiv.innerHTML = this.highScore;
        this.currentSnake = [2, 1, 0];
        this.currentSnake.forEach((index) => squares[index].classList.add("snake"));
    }


    _moveOutcome(squares) {
        if (this.checkForHits()) {
            this.popup.style.display = "flex";
            if (this.highScore < this.score) {
                this.highScore = this.score;
                this.highScoreDiv.innerHTML = this.highScore;
            }
            this.score = 0;
            this.newScore.innerHTML = this.score;
            return clearInterval(this.interval);
        } else {
            this._moveSnake(squares);
        }
    }

    _moveSnake(squares) {
        let tail = this.currentSnake.pop();
        squares[tail].classList.remove("snake");
        this.currentSnake.unshift(this.currentSnake[0] + this.direction);
        console.log(this.currentSnake);
        this.intervalTime = 10;
        this._eatApple(squares, tail);
        squares[this.currentSnake[0]].classList.add("snake");
    }

    _toggleGame() {
        document.addEventListener('click', (e) => {
            switch (e.target) {
                case this.playAgain:
                    this.start.style.display = 'block';
                    this.stop.style.display = 'none';
                    document.getElementById("grid").innerHTML = "";
                    this._play();
                    this.popup.style.display = "none";
                    clearInterval(this.interval);
                    break;
                case this.start:
                    this.start.style.display = 'none';
                    this.stop.style.display = 'block';
                    this.intervalTime = 250;
                    this.interval = setInterval(() => {
                        this._moveOutcome(this.squares);
                    }, this.intervalTime);
                    break;
                case this.stop:
                    this.start.style.display = 'block';
                    this.stop.style.display = 'none';
                    clearInterval(this.interval);
            }
        })
    }


    _eatApple(squares, tail) {
        if (squares[this.currentSnake[0]].classList.contains("apple")) {
            squares[this.currentSnake[0]].classList.remove("apple");
            squares[tail].classList.add("snake");
            this.currentSnake.push(tail);
            this._randomApple(squares);
            this.score++;
            this.newScore.textContent = this.score;
        }
    }


    _randomApple(squares) {
        let appleIndex = Math.floor(Math.random() * squares.length) + 1;
        squares[appleIndex].classList.add("apple");
    }

}

new Snake();