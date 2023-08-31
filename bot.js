const { Client } = require('discord.js');
const fs = require('fs');
const bot = new Client();

const BOT_TOKEN = 'MTA1NjU0OTM1NzI1MzU2MjQ4MQ.GlToiH.XdgD_A5Q2g3kR-uTOi8PQqXQgw8tTx0s1CoBBQ';
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