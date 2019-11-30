const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

const embed = {
    "title": "Command List",
    "color": 100000,
    "timestamp": "2019-11-30T20:22:42.695Z",
    "footer": {
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
        "text": "TH Rogers Quiz Bowl CurrentEventQuizzesLord"
    },
    "author": {
        "name": "CurrentEventQuizzesLord",
        "url": "https://discordapp.com",
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "fields": [
        {
            "name": "!help",
            "value": "uh duh"
        },
        {
            "name": "!leaderboard",
            "value": "Get leaderboard link"
        },
        {
            "name": "!score <user>",
            "value": "Retrieve the score of <user>"
        },
        {
            "name": "!setscore <user> <newscore>",
            "value": "Sets the score of <user> to <newscore>"
        }
    ]
};

var questions = ['test1', 'test2', 'test3'];
var answers = ['yes', 'ooo', 'bet'];

var points = {};
var qbers = [];
var guild;

client.on('ready', () => {
    console.log('uwu bet boi i b ready aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb!');
    guild = client.guilds.get('634574175238881280');
    guild.members.forEach(member => qbers.push(member.user.username));
});


client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') {
        var qnum = parseInt(message.content.substr(0, 1));
        var ans = message.content.substr(2);
        if (ans === answers[qnum - 1]) {
            message.channel.send(`Yes, that is correct! You will receive a point for that.`);
        } else {
            message.channel.send(`Either that is wrong, or you have entered bad input.`);
        }
    }
    if (message.content === '!quiz') {
        message.channel.send(`Quiz here! Type !help for a list of commands that I handle.`);
        message.channel.send(`For the quiz, DM your answer to me, CurrentEventQuizzesLord. In the DM, enter the question number you want to answer, followed by EXACTLY 1 space, followed by the answer. Make sure the answer is in all lowercase.`);
        for (i = 0; i < questions.length; i++) {
            message.channel.send((i + 1) + ': ' + questions[i]);
        }
    }
    if (message.content === '!help') {
        message.channel.send({ embed });
    }
    if (message.content === '!leaderboard') {
        
    }
    if (message.content === '!clearleaderboard') {
        if (message.author.id === '497237135317925898') {
            message.channel.send('Leaderboard cleared!');
        } else {
            message.channel.send('You are not authorized to do that!');
        }
    }
});



client.login(auth.token);
