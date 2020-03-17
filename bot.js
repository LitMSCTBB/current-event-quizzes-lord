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
var db = firebase.database();

//node-schedule
const schedule = require('node-schedule');

//Sheets API
const {google} = require('googleapis');
const keys = require('./keys.json');
const client2 = new google.auth.JWT(keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
client2.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Connected with Sheets API!');
    }
});
async function dbToGS(cl) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
        spreadsheetId: '1xq-avwsqvh4RsndyrUnVHo0dZo4-aFJs4ItNW1I5His',
    };
    var all = db.ref();
    var all_vals;
    all.once('value', function (data) {
        all_vals = data.val();
    })
    const updateOptions = {
        spreadsheetId: '1xq-avwsqvh4RsndyrUnVHo0dZo4-aFJs4ItNW1I5His',
        ranges: ['Leaderboard!A2:A1000', 'Leaderboard!C2'],
        valueInputOption: 'USER_ENTERED',
        resource: { values:  all_vals}
    };

    let res = await gsapi.spreadsheets.values.batchUpdate(updateOptions);
};



//help embed
const helpEmbed = {
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
    ]
};

//questions+answers
var questions = ['test1', 'test2', 'test3'];
var answers = ['yes', 'ooo', 'bet'];

var updateGSheetsRef = db.ref();
updateGSheetsRef.on('value', function (data) {
    dbToGS(client2);
})

client.on('ready', () => {
    console.log('uwu bet boi i b ready aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb!');
    guild = client.guilds.get('634574175238881280');
    client.user.setActivity("cqlord help");
    var j = schedule.scheduleJob({ hour: 18, minute: 0, dayOfWeek: 0 }, function () {
        client.channels.get('635672167773896725').send('Quiz released @everyone. For the quiz, DM your answer to me, CurrentEventQuizzesLord. In the DM, (all in one message) "cqlord answer", followed by EXACTLY 1 space, followed by the question number you want to answer, followed by EXACTLY 1 space, followed by the answer. Make sure the answer is in all lowercase.');
        for (i = 0; i < questions.length; i++) {
            client.channels.get('635672167773896725').send((i + 1) + ': ' + questions[i]);
        }
        var ref = db.ref('week');
        ref.once('value', function (data) {
            var week = data.val() + 1;
            ref.set(week + 1);
        });
    });
});

client.on('message', message => {
    if (message.author.bot) return;
    
    if (message.content.substr(0,7) === 'cqlord '); {
        var command = message.content.substr(7);
        
        if (command === 'help') {
            message.channel.send({ helpEmbed });
        }
        if (command === 'quiz') {
            message.channel.send(`For the quiz, DM your answer to me, CurrentEventQuizzesLord. In the DM, (all in one message) "cqlord answer", followed by EXACTLY 1 space, followed by the question number you want to answer, followed by EXACTLY 1 space, followed by the answer. Make sure the answer is in all lowercase.`);
            for (i = 0; i < questions.length; i++) {
                message.channel.send((i + 1) + ': ' + questions[i]);
            }
        }
        if (command.startsWith('answer ')) {
            if (message.channel.type === 'dm') {
                var qnum = parseInt(command.substr(7, 8));
                var ans = command.substr(9);
                //check whether user has gotten right already
                
                if (ans === answers[qnum - 1]) {
                    message.channel.send(`Yes, that is correct! You will receive a point for that.`);

                } else {
                    message.channel.send(`Either that is wrong, or you have entered bad input. Your answer was ` + ans + '.');
                }
            }
        }
        if (command.startsWith('score ')) {
        
        }
        if (command === 'leaderboard') {
            message.channel.send("https://docs.google.com/spreadsheets/d/1xq-avwsqvh4RsndyrUnVHo0dZo4-aFJs4ItNW1I5His/edit#gid=0");
        }
	}
});


client.login(auth.token);