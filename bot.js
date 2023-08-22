const { Client } = require('discord.js');
const bot = new Client();


const BOT_TOKEN =;
bot.login(BOT_TOKEN);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

let players = [null, null];

let playerName = [null, null];
let game = false;
let board = [['W', 'S', 'G', 'H', 'K', 'G', 'S', 'W'],
			['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
			['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
			['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
			['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
			['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
			['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
			['w', 's', 'g', 'h', 'k', 'g', 's', 'w']];

function boardPrint(message) {
	board.forEach(
		sub => {
			let s = "";
			sub.forEach(char => s += char)
			message.channel.send(s);
	});
}

function chessBoard(message) {
	let color = Math.random() % 2;

	if (color >= 0.5) {
		message.channel.send(`<@${players[0]}> Will be white`);
		message.channel.send(`<@${players[1]}> Will be black`);

		let white = players[0];
		let black = players[1];
	} else {
		message.channel.send(`<@${players[1]}> Will be white`);
		message.channel.send(`<@${players[0]}> Will be black`);

		let white = players[1];
		let black = players[0];
	}

	boardPrint(message);

}

bot.on('message', (message) => {
	console.log(message.content);
	if (message.content === '!ping') {
		message.channel.send('Pong!');
	}

	if (message.content === '!play' && game !== true && players[0] === null) {
		players[0] = message.author.id;
		playerName[0] = message.author.username;
	} else if (message.content === '!play' && game !== true && players[0] != message.author.id) {
		players[1] = message.author.id;
		playerName = message.author.username;

		console.log(playerName[0]);
		console.log(playerName[1]);

		game = true;
		message.channel.send('The game will begin shortly!');
		chessBoard(message);
	} else if (message.content === '!play' && game === true) {
		message.channel.send('You need to wait until the current game will stop!');
	}
});
