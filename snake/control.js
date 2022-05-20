export class Control {

    squares = document.querySelectorAll("#grid div");

    constructor(direction, width, currentSnake, squares,) {
        this.direction = direction;
        this.width = width;
        this.currentSnake = currentSnake;
        this.squares = squares;
    }


    checkForHits() {
        if (
            (this.currentSnake[0] % this.width === 59 && this.direction === 1) ||
            (this.currentSnake[0] % this.width === 0 && this.direction === -1) ||
            (this.currentSnake[0] - this.width <= 0 && this.direction === - this.width) ||
            (this.currentSnake[0] + this.width >= 1800 && this.direction === this.width) ||
            (this.squares[this.currentSnake[0] + this.direction].classList.contains('snake'))

        ) {
            return true;
        } else {
            return false;
        }
    }

    control() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (this.direction !== 60) {
                        this.direction = -this.width;
                    }
                    break;

                case 'ArrowDown':

                    if (this.direction !== -60) {
                        this.direction = this.width;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 1) {

                        this.direction = -1;
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction !== -1) {

                        this.direction = 1;
                    }
                    break;
            }
        })
    }
}
