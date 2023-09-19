const { Client } = require('discord.js');
const fs = require('fs');
const bot = new Client();
const { exec } = require('child_process');
const mysql = require('mysql');
const {Piece, Pawn, Rook, Bishop, Knight, King, Queen} = require('./script.js');

let token = fs.readFileSync('Token.txt', 'utf8');

const Color = {
	White: true,
	Black: false
}

const BOT_TOKEN = token;
bot.login(BOT_TOKEN);

const data = fs.readFileSync('board.txt', 'utf8');

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

function boardPrint(message) {
	board.forEach(
		sub => {
			let s = "";
			sub.forEach(char => s += char)
			message.channel.send(s);
	});
}

// function fileExists(path) {
// 	try {
// 		if (fs.existsSync(path)) {
// 			//file does exist
// 			return true;
// 		}

// 		} catch(err) {
// 			//file doesnt exist
// 			console.error(err);
// 		}
	
// 		return false;
// }

function boardAssign(data) {
	let s = "";
	let n = 0;
	let where = 0;
	let board = new Array(9);

	for (let i = 0; i < 9; i++) {
		board[i] = new Array(8);
	}

	for (let i = 0; i < data.length; i++) {
		s += data[i];
		n++;
		if (n === 9) {
			for (let i = 0; i < 8; i++) {
				board[where][i] = s[i];
			}

			where++;
			n = 0;
			s = "";
		} 
	}

	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			if (board[i][j] === 'W') {
				board[i][j] = new Rook(Color.White);
			} else if (board[i][j] === 'S') {
				board[i][j] = new Knight(Color.White);
			} else if (board[i][j] === 'G') {
				board[i][j] = new Bishop(Color.White);
			} else if (board[i][j] === 'H') {
				board[i][j] = new Queen(Color.White);
			} else if (board[i][j] === 'K') {
				board[i][j] = new King(Color.White);
			} else if (board[i][j] === 'P') {
				board[i][j] = new Pawn(Color.White);
			} else if (board[i][j] === 'w') {
				board[i][j] = new Rook(Color.Black);
			} else if (board[i][j] === 's') {
				board[i][j] = new Knight(Color.Black);
			} else if (board[i][j] === 'g') {
				board[i][j] = new Bishop(Color.Black);
			} else if (board[i][j] === 'h') {
				board[i][j] = new Queen(Color.Black);
			} else if (board[i][j] === 'k') {
				board[i][j] = new King(Color.Black);
			} else if (board[i][j] === 'p') {
				board[i][j] = new Pawn(Color.Black);
			}
		}
	}
}

let players = new Map();
let board = new Map();
let temporaryPlayers = [null, null];

function notPlaying(a, b) {
	if (players[temporaryPlayers[0]] === 0 || players[temporaryPlayers[0]] === undefined) {
		if (players[temporaryPlayers[1]] === 1 || players[temporaryPlayers[1]] === undefined) {
			return true;
		}
	}

	return false;
}

bot.on('message', (message) => {
	console.log(message.content);
	if (message.content === '!ping' || message.content === '!Ping') {
		message.channel.send('Pong!');

		// let s = "";
		// s += trim(message.guild.name);
		// s += '.txt';

		// if (fileExists(s)) {
		// 	console.log("exists");
		// } else {
		// 	s = 'touch ' + s;
		// 	exec(s);
		// }
	}

	if (message.content === '!play' && temporaryPlayers[0] === null) {
		temporaryPlayers[0] = message.author.id;
	} else if (message.content === '!play' && temporaryPlayers[0] !== null && notPlaying(temporaryPlayers[0], temporaryPlayers[1])) {
		temporaryPlayers[1] = message.author.id;

		message.channel.send(`Player 1 <@${temporaryPlayers[0]}>`);
		message.channel.send(`Player 2 <@${temporaryPlayers[1]}>`);

		players.set(temporaryPlayers[0], temporaryPlayers[1]);
		players.set(temporaryPlayers[1], temporaryPlayers[0]);

		board[temporaryPlayers[0]] = boardAssign(data);
		board[temporaryPlayers[1]] = boardAssign(data);

		temporaryPlayers = [null, null];

		// printBoard(board[temporaryPlayers[0]);		

		// console.log(message.guild.name);
		message.channel.send('The game will begin shortly!');
	}
});