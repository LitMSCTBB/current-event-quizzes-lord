//discord.js
const Discord = require('discord.js');
const client = new Discord.Client();

//token file
const auth = require('./auth.json');

//firebase
const firebase = require('firebase/app');
require('firebase/database');
const firebaseConfig = {
    apiKey: "AIzaSyCDzzlKFRQ7nPf6QNn4yA7wRW-qw7RpQFA",
    authDomain: "currenteventquizzesleaderboard.firebaseapp.com",
    databaseURL: "https://currenteventquizzesleaderboard.firebaseio.com",
    projectId: "currenteventquizzesleaderboard",
    storageBucket: "currenteventquizzesleaderboard.appspot.com",
    messagingSenderId: "155229259135",
    appId: "1:155229259135:web:70cd89daf39c61f2c1464a",
    measurementId: "G-WSPKY8G03K"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//node-schedule
const schedule = require('node-schedule');

//Sheets API
const {google} = require('googleapis');
const keys = require('./keys.json');
const client2 = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);
client2.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Connected with Sheets API!');
    }
});
//for next time: define more async functions meant for the purposes of the functions for the bot i still need to do, and figure out how to do disjoint ranges
async function gsrun(cl) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
        spreadsheetId: '1xq-avwsqvh4RsndyrUnVHo0dZo4-aFJs4ItNW1I5His',
        range: 'C2:Z4'
    };
    let entries = await gsapi.spreadsheets.values.get(opt);
    let dataArray = entries.data.values;
    //make sure there are always the same amount of columns to prevent unwanted undefined things in the sheet
    dataArray = dataArray.map(function (r) {
        while (r.length < 2) {
            r.push('');
        }
        return r;
    });

    dataArray[0].push('3');

    const updateOptions = {
        spreadsheetId: '1xq-avwsqvh4RsndyrUnVHo0dZo4-aFJs4ItNW1I5His',
        range: 'C2',
        valueInputOption: 'USER_ENTERED',
        resource: { values: dataArray }
    };

    let res = await gsapi.spreadsheets.values.update(updateOptions);
};

//help embed
const embed = {
    "title": "Command List",
    "color": 100000,
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
            "name": "cqlord help",
            "value": "uh duh"
        },
        {
            "name": "cqlord quiz",
            "value": "Retrieve the quiz"
        },
        {
            "name": "cqlord answer",
            "value": "Submit an answer (only works in a DM)"
        },
        {
            "name": "cqlord leaderboard",
            "value": "Get leaderboard link"
        },
        {
            "name": "cqlord score <user>",
            "value": "Retrieve the score of <user>"
        },
        {
            "name": "cqlord setscore <user> <newscore>",
            "value": "Sets the score of <user> to <newscore>"
        },
        {
            "name": "cqlord clearleaderboard",
            "value": "Resets the leaderboard"
        }
    ]
};

//questions+answers
var questions = ['test1', 'test2', 'test3'];
var answers = ['yes', 'ooo', 'bet'];

client.on('ready', () => {
    console.log('uwu bet boi i b ready aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb!');
    guild = client.guilds.get('634574175238881280');
    client.user.setActivity("cqlord help");
    var j = schedule.scheduleJob({ hour: 18, minute: 0, dayOfWeek: 0 }, function () {
        client.channels.get('635672167773896725').send('Quiz released @everyone. For the quiz, DM your answer to me, CurrentEventQuizzesLord. In the DM, (all in one message) "cqlord answer", followed by EXACTLY 1 space, followed by the question number you want to answer, followed by EXACTLY 1 space, followed by the answer. Make sure the answer is in all lowercase.');
    });
});

client.on('message', message => {
    if (message.author.bot) return;
    
    if (message.content.substr(0,7) === 'cqlord '); {
        var command = message.content.substr(7);
        
        if (command === 'help') {
            message.channel.send({ embed });
        }
        if (command === 'quiz') {
            message.channel.send(`Quiz released @everyone. For the quiz, DM your answer to me, CurrentEventQuizzesLord. In the DM, (all in one message) "cqlord answer", followed by EXACTLY 1 space, followed by the question number you want to answer, followed by EXACTLY 1 space, followed by the answer. Make sure the answer is in all lowercase.`);
            for (i = 0; i < questions.length; i++) {
                message.channel.send((i + 1) + ': ' + questions[i]);
            }
        }
        if (command.startsWith('answer ')) {
            if (message.channel.type === 'dm') {
                var qnum = parseInt(command.substr(7, 8));
                var ans = command.substr(9);
                if (ans === answers[qnum - 1]) {
                    message.channel.send(`Yes, that is correct! You will receive a point for that.`);
                } else {
                    message.channel.send(`Either that is wrong, or you have entered bad input. Your answer was ` + ans + '.');
                    
                }
            }
        }
        if (command.startsWith('score ')) {
        
        }
        if (command.startsWith('setscore ')) {
            if (message.author.id === '497237135317925898') {






                message.channel.send('Score set!');
            } else {
                message.channel.send('You are not authorized to do that!');
            }
        }
        if (command === 'leaderboard') {
            message.channel.send("https://docs.google.com/spreadsheets/d/1xq-avwsqvh4RsndyrUnVHo0dZo4-aFJs4ItNW1I5His/edit#gid=0");
        }
        if (command === 'clearleaderboard') {
            if (message.author.id === '497237135317925898') {
                
                
                
                
                
                
                message.channel.send('Leaderboard cleared!');
            } else {
                message.channel.send('You are not authorized to do that!');
            }
        }
	}
});


client.login(auth.token);