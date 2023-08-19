const Color = {
	White: true,
	Black: false
}

class Piece {
    constructor(color) {
    	this.color = color;
    	this.moved = false;
    }

    static convertTo(move) {
    	let to = [parseInt(move[move.length - 1]) - 1, move.charCodeAt(move.length - 2) - 65];

        return to;
    }
    
    static convertFrom(move) {
    	let from = [parseInt(move[1]) - 1, move[0].charCodeAt(0) - 65];

        return from;
    }

    rookUp() {
    	let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

    	let j = from[1];
		for (let i = from[0] + 1; i <= 7; i++) {
			if (i === to[0] && (board[i][j] instanceof Piece || board[i][j] === 'O')) {
				if (board[i][j] instanceof Piece && ((board[i][j].color && !board[from[0]][from[1]].color) ||
					(!(board[i][j].color) && board[from[0]][from[1]].color))) {
					return true;
				} else if (!(board[i][j] instanceof Piece)) {
					return true;
				} else return false;
			} else if (i !== to[0] && board[i][j] instanceof Piece) return false;
		}
		return false;
    }

    rookDown() {
    	let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

    	let j = from[1];
		for (let i = from[0] - 1; i >= 0; i--) {
			if (i === to[0] && (board[i][j] instanceof Piece || board[i][j] === 'O')) {
				if (board[i][j] instanceof Piece && ((board[i][j].color && !board[from[0]][from[1]].color) ||
					(!(board[i][j].color) && board[from[0]][from[1]].color))) {
					return true;
				} else if (!(board[i][j] instanceof Piece)) {
					return true;
				} else return false;
			} else if (i !== to[0] && board[i][j] instanceof Piece) return false;
		}
		return false;
    }

    rookRight() {
    	let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

    	let i = to[0];
		for (let j = from[1] + 1; j <= 7; j++) {
			if (j === to[1]) {
				if (!(board[i][j] instanceof Piece)) {
					this.moved = true;
					return true;
				} else if (board[i][j] instanceof Piece) {
					if (!(board[i][j].color) && board[from[0]][from[1]].color) {
						this.moved = true;
						return true;
					} else if (board[i][j].color && !(board[from[0]][from[1]].color)) {
						this.moved = true;
						return true;
					} else return false;
				}
			} else if (j !== to[1] && board[i][j] instanceof Piece) return false;
		}
		return false;
    }

    rookLeft() {
    	let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

    	let i = to[0];
		for (let j = from[1] - 1; j >= 0; j--) {
			if (j === to[1]) {
				if (!(board[i][j] instanceof Piece)) {
					this.moved = true;
					return true;
				} else if (board[i][j] instanceof Piece) {
					if (!(board[i][j].color) && board[from[0]][from[1]].color) {
						this.moved = true;
						return true;
					} else if (board[i][j].color && !(board[from[0]][from[1]].color)) {
						this.moved = true;
						return true;
					} else return false;
				}
			} else if (j !== to[1] && board[i][j] instanceof Piece) return false;
		}
		return false;
    }

    diagonalRightUp() {
    	let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

		let j = from[1] + 1;
		for (let i = from[0] + 1; i <= 7; i++) {
			if (i === to[0] && j === to[1]) {
				if (!(board[i][j] instanceof Piece)) {
					return true;
				} else if (board[i][j] instanceof Piece) {
					if (board[i][j].color && !(board[from[0]][from[1]].color)) {
						return true;
					} else if (!(board[i][j].color) && board[from[0]][from[1]].color) {
						return true;
					} else return false;
				}
			} else if ((i !== to[0] || j !== to[1]) && board[i][j] instanceof Piece) {
				return false;
			}
			j++;
		}
    }

    diagonalLeftDown() {
    	let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

    	let j = from[1] - 1;
		for (let i = from[0] - 1; i >= 0; i--) {
			if (i === to[0] && j === to[1]) {
				if (!(board[i][j] instanceof Piece)) {
					return true;
				} else if (board[i][j] instanceof Piece) {
					if (board[i][j].color && !(board[from[0]][from[1]].color)) {
						return true;
					} else if (!(board[i][j].color) && board[from[0]][from[1]].color) {
						return true;
					} else return false;
				}
			} else if ((i !== to[0] || j !== to[1]) && board[i][j] instanceof Piece) {
				return false;
			}
			j--;
		}
    }

    diagonalLeftUp() {
    	let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

    	let j = from[1] - 1;
		for (let i = from[0] + 1; i <= 7; i++) {
			if (i === to[0] && j === to[1]) {
				if (!(board[i][j] instanceof Piece)) {
					return true;
				} else if (board[i][j] instanceof Piece) {
					if (board[i][j].color && !(board[from[0]][from[1]].color)) {
						return true;
					} else if (!(board[i][j].color) && board[from[0]][from[1]].color) {
						return true;
					} else return false;
				}
			} else if ((i !== to[0] || j !== to[1]) && board[i][j] instanceof Piece) {
				return false;
			}
			j--;
		}
    }

    diagonalRightDown() {
    	let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

    	let j = from[1] + 1;
		for (let i = from[0] - 1; i >= 0; i--) {
			if (i === to[0] && j === to[1]) {
				if (!(board[i][j] instanceof Piece)) {
					return true;
				} else if (board[i][j] instanceof Piece) {
					if (board[i][j].color && !(board[from[0]][from[1]].color)) {
						return true;
					} else if (!(board[i][j].color) && board[from[0]][from[1]].color) {
						return true;
					} else return false;
				}
			} else if ((i !== to[0] || j !== to[1]) && board[i][j] instanceof Piece) {
				return false;
			}
			j++;
		}
    }

    move() {
    	return 0;
    }
}

class Pawn extends Piece {

	//TODO zmiana piona w figure na ostatniej lini

	move() {
        let from = Piece.convertFrom(move);
        let to = Piece.convertTo(move);
        
        if (!(board[from[0]][from[1]] instanceof Pawn)) return false;
        
        if (board[from[0]][from[1]].color) {
		    if (!this.moved && from[0] + 2 == to[0] && !(board[from[0] + 1][from[1]] instanceof Piece) && 
			!(board[to[0]][to[1]] instanceof Piece) && to[0] - from[0] === 2) {
			    this.moved = true;
			    return true;
		    } else if (!(board[from[0] + 1][from[1]] instanceof Piece) && !(board[to[0]][to[1]] instanceof Piece) && 
			from[1] === to[1] && to[0] - from[0] === 1) { 
			    this.moved = true;
			    return true;
		    } else if (to[0] - from[0] === 1) {
		    	if (to[1] + 1 === from[1] && board[to[0]][to[1]] instanceof Piece && !(board[to[0]][to[1]] instanceof King)) {
		    		if (!board[to[0]][to[1]].color) {
			    		this.moved = true;
			    		return true;
			    	}
		    	} else if (to[1] - 1 === from[1] && board[to[0]][to[1]] instanceof Piece && !(board[to[0]][to[1]] instanceof King)) {
			    	if (!board[to[0]][to[1]].color) {
			    		this.moved = true;
			    		return true;
			    	}
		    	}
		    }
		}
		return false;
	}
}

class Rook extends Piece {
	move() {
		let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

		if (from[0] !== to[0] && from[1] !== to[1]) return false;

		if (from[0] > to[0]) {
			return this.rookDown();
		} else if (from[0] < to[0]) {
			return this.rookUp();
		} else if (from[1] > to[1]) {
			return this.rookLeft();
		} else if (from[1] < to[1]) {
			return this.rookRight();
		} else return false;
	}
}

class Bishop extends Piece {
	move() {
		let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

		if (to[0] > from[0] && to[1] > from[1]) {
			return this.diagonalRightUp();
		} else if (to[0] < from[0] && to[1] < from[1]) {
			return this.diagonalLeftDown();
		} else if (to[0] > from[0] && to[1] < from[1]) {
			return this.diagonalLeftUp();
		} else if (to[0] < from[0] && to[1] > from[1]) {
			return this.diagonalRightDown();
		} else return false;
	}
}

class Queen extends Piece {
	move() {
		let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);

		if (from[0] === to[0] || from[1] === to[1]) {
			if (from[0] !== to[0] && from[1] !== to[1]) return false;

			if (from[0] > to[0]) {
				return this.rookDown();
			} else if (from[0] < to[0]) {
				return this.rookUp();
			} else if (from[1] > to[1]) {
				return this.rookLeft();
			} else if (from[1] < to[1]) {
				return this.rookRight();
			} else return false;
		} else {
			if (to[0] > from[0] && to[1] > from[1]) {
				return this.diagonalRightUp();
			} else if (to[0] < from[0] && to[1] < from[1]) {
				return this.diagonalLeftDown();
			} else if (to[0] > from[0] && to[1] < from[1]) {
				return this.diagonalLeftUp();
			} else if (to[0] < from[0] && to[1] > from[1]) {
				return this.diagonalRightDown();
			} else return false;
		}	
	}
}

class Knight extends Piece {
	move() {
		let from = Piece.convertFrom(move);
		let to = Piece.convertTo(move);
										
		if (to[0] - 3 === from[0]) {
			if (to[1] + 1 === from[1] && (!(board[to[0]][to[1]] instanceof Piece) || 
				(board[from[0]][from[1]].color && !(board[to[0]][to[1]].color)) || 
				!(board[from[0]][from[1]].color) && board[to[0]][to[1]].color)) {
				return true;
			} else if (to[1] - 1 === from[1] && (!(board[to[0]][to[1]] instanceof Piece) || 
				(board[from[0]][from[1]].color && !(board[to[0]][to[1]].color)) || 
				!(board[from[0]][from[1]].color) && board[to[0]][to[1]].color)) {
				return true;
			}
		} else if (to[0] + 3 === from[0]) {
			if (to[1] + 1 === from[1] && (!(board[to[0]][to[1]] instanceof Piece) || 
				(board[from[0]][from[1]].color && !(board[to[0]][to[1]].color)) || 
				!(board[from[0]][from[1]].color) && board[to[0]][to[1]].color)) {
				return true;
			} else if (to[1] - 1 === from[1] && (!(board[to[0]][to[1]] instanceof Piece) || 
				(board[from[0]][from[1]].color && !(board[to[0]][to[1]].color)) || 
				!(board[from[0]][from[1]].color) && board[to[0]][to[1]].color)) {
				return true;
			}
		} else if (to[1] - 3 === from[1]) {
			if (to[0] + 1 === from[0] && (!(board[to[0]][to[1]] instanceof Piece) || 
				(board[from[0]][from[1]].color && !(board[to[0]][to[1]].color)) || 
				!(board[from[0]][from[1]].color) && board[to[0]][to[1]].color)) {
				return true;
			} else if (to[0] - 1 === from[0] && (!(board[to[0]][to[1]] instanceof Piece) || 
				(board[from[0]][from[1]].color && !(board[to[0]][to[1]].color)) || 
				!(board[from[0]][from[1]].color) && board[to[0]][to[1]].color)) {
				return true;
			}
		} else if (to[1] + 3 === from[1]) {
			if (to[0] + 1 === from[0] && (!(board[to[0]][to[1]] instanceof Piece) || 
				(board[from[0]][from[1]].color && !(board[to[0]][to[1]].color)) || 
				!(board[from[0]][from[1]].color) && board[to[0]][to[1]].color)) {
				return true;
			} else if (to[0] - 1 === from[0] && (!(board[to[0]][to[1]] instanceof Piece) || 
				(board[from[0]][from[1]].color && !(board[to[0]][to[1]].color)) || 
				!(board[from[0]][from[1]].color) && board[to[0]][to[1]].color)) {
				return true;
			}
		} else return false;
	}
}

class King extends Piece {
	inCheck() {
		return false;
	}

	castle() {
		return 0;
	}

	// TODO King check, King castle

	move() {
        let from = Piece.convertFrom(move);
        let to = Piece.convertTo(move);

        if (from[0] + 1 === to[0] && from[1] === to[1] && !(board[to[0]][to[1]] instanceof Piece)) return true;
        if (from[0] - 1 === to[0] && from[1] === to[1] && !(board[to[0]][to[1]] instanceof Piece)) return true;
        if (from[0] === to[0] && from[1] + 1 === to[1] && !(board[to[0]][to[1]] instanceof Piece)) return true;
        if (from[0] === to[0] && from[1] - 1 === to[1] && !(board[to[0]][to[1]] instanceof Piece)) return true;
        if (from[0] - 1 === to[0] && from[1] + 1 === to[1] && !(board[to[0]][to[1]] instanceof Piece)) return true;
        if (from[0] - 1 === to[0] && from[1] - 1 === to[1] && !(board[to[0]][to[1]] instanceof Piece)) return true;
        if (from[0] + 1 === to[0] && from[1] - 1 === to[1] && !(board[to[0]][to[1]] instanceof Piece)) return true;
        if (from[0] + 1 === to[0] && from[1] + 1 === to[1] && !(board[to[0]][to[1]] instanceof Piece)) return true;
        return false;
	}
}

let board = [[new Rook(Color.White), new Knight(Color.White), new Bishop(Color.White), new Queen(Color.White), new King(Color.White), new Bishop(Color.White), new Knight(Color.White), new Rook(Color.White)],
			[new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White)],
			['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
			['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
			['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
			['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
			[new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black)],
			[new Rook(Color.Black), new Knight(Color.Black), new Bishop(Color.Black), new Queen(Color.White), new King(Color.Black), new Bishop(Color.Black), new Knight(Color.Black), new Rook(Color.Black)]];

let move = 'A2 - C3';

console.log(board[0][1].move(move));