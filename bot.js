const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

var questions = ['test1', 'test2', 'test3'];
var answers = ['yes', 'ooo', 'bet'];

var points = {};
bot.guilds.array().forEach((guild) => {
    let qbers = guild.members.array();
});
for (var qb in qbers) {
    points[qb] = 0;
}

function sortJsObject(obj) {
    var keys = [];
    for (var key in obj) {
        keys[keys.length] = key;
    }

    var values = [];
    for (var i = 0; i < keys.length; i++) {
        values[values.length] = obj[keys[i]];
    }

    var sortedValues = values.sort(sortNumber);
    return sortedValues;
}
function sortNumber(a, b) {
    return a - b;
}


client.on('message', message => {
    if (message.author.bot) return;
    if (message.content === '!quiz') {
        message.channel.send(`@everyone Current Event Quiz Released`);
        message.channel.send(`DM your answer to me, CurrentEventQuizzesLord. In the DM, enter the question number you want to answer, followed by EXACTLY 1 space, followed by the answer. Make sure the answer is in all lowercase.`);
        for (i = 0; i < questions.length; i++) {
            message.channel.send((i + 1) + ': ' + questions[i]);
        }

    }
    if (message.channel.type === 'dm') {
        var qnum = parseInt(message.content.substr(0, 1));
        var ans = message.content.substr(2);
        console.log(qnum);
        console.log(ans);
        if (ans === answers[qnum - 1]) {
            message.channel.send(`Yes, that is correct!`);
            points[message.author] += 1;
        } else {
            message.channel.send(`Either that is wrong, or you have entered bad input.`);
        }
    }
    if (message.content === '!leaderboard') {
        for (var user in points) {
            message.channel.send(user + `: ` + points[user])
        }
    }
    if (message.content === '!mypoints') {
        message.channel.send(message.author + `: ` + points[message.author])
    }
    if (message.content === '!clearleaderboard') {
        for (var user in points) {
            points[user] = 0;
        }
    }

});



client.login(auth.token);
