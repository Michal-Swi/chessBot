const { Client } = require('discord.js');
const fs = require('fs');
const bot = new Client();

let token = fs.readFileSync('Token.txt', 'utf8');

const BOT_TOKEN = token;
bot.login(BOT_TOKEN);

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

function trim(s) {
	let sReturn = "";

	for (let i = 0; i < s.length; i++) {
		if (s[i] === ' ') continue;
		else sReturn += s[i];
	}

	return sReturn;
}

let players = new Map();
let board = new Map();
let temporaryPlayers = [null, null];

bot.on('message', (message) => {
	console.log(message.content);
	if (message.content === '!ping' || message.content === '!Ping') {
		message.channel.send('Pong!');
	}

	if (message.content === '!play' && temporaryPlayers[0] === null) {
		temporaryPlayers[0] = message.author.id;
	} else if (message.content === '!play' && temporaryPlayers[0] !== null) {
		temporaryPlayers[1] = message.author.id;

		message.channel.send(`Player 1 <@${temporaryPlayers[0]}>`);
		message.channel.send(`Player 2 <@${temporaryPlayers[1]}>`);

		players.set(temporaryPlayers[0], temporaryPlayers[1]);
		players.set(temporaryPlayers[1], temporaryPlayers[0]);

		temporaryPlayers = [null, null];

		console.log(message.guild.name);

		message.channel.send('The game will begin shortly!');
	}
});