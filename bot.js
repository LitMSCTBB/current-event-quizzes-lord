const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

var questions = ['test1', 'test2', 'test3'];
var answers = ['yes', 'ooo', 'bet'];

var points = {};
var qbers = [];
var guild;

client.on('ready', () => {
    console.log('uwu bet boi i b ready aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
    guild = client.guilds.get('634574175238881280');
    guild.members.forEach(member => qbers.push(member.user.username));
});


client.on('message', message => {
    if (message.author.bot) return;
    if (message.content === '!quiz') {
        message.channel.send(`@everyone Current Event Quiz Released! Type !quiz in any channel to retrieve the quiz there as well.`);
        message.channel.send(`DM your answer to me, CurrentEventQuizzesLord. In the DM, enter the question number you want to answer, followed by EXACTLY 1 space, followed by the answer. Make sure the answer is in all lowercase.`);
        for (i = 0; i < questions.length; i++) {
            message.channel.send((i + 1) + ': ' + questions[i]);
        }

    }
    if (message.channel.type === 'dm' && !(message.content === '!leaderboard') && !(message.content === '!clearleaderboard') && !(message.content === '!mypoints') && !(message.content.startsWith('!score'))) {
        var qnum = parseInt(message.content.substr(0, 1));
        var ans = message.content.substr(2);
        if (ans === answers[qnum - 1]) {
            message.channel.send(`Yes, that is correct! You will receive a point for that.`);
            points[message.author.username] += 1;
        } else {
            message.channel.send(`Either that is wrong, or you have entered bad input.`);
        }
    }
    if (message.content === '!leaderboard') {
        for (i = 0; i < qbers.length; i++) {
            let user = qbers[i];
            message.channel.send(user + `: ` + points[user]);
        }
    }
    if (message.content.startsWith('!score')) {
        let user = message.content.substr(7);
        message.channel.send(user + `: ` + points[user]);
    }
    if (message.content === '!clearleaderboard') {
        if (message.author.id === '497237135317925898') {
            for (i = 0; i < qbers.length; i++) {
                let user = qbers[i];
                points[user] = 0;
            }
            message.channel.send('Leaderboard cleared!');
        } else {
            message.channel.send('You are not authorized to do that!');
        }
    }

});



client.login(auth.token);
