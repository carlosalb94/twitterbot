const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://user001:XXXX@cluster0.mrjlp.mongodb.net/';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Our Twitter library
const Twit = require('twit');
// We need to include our configuration file
const twit = new Twit(require('../config.js'));

const stream = twit.stream('statuses/filter', { track: '#vistimaBot' });
stream.on('tweet', tweetEvent);

function searchUserIdInTweet(tweet) {
    let regexId = /\d+/g;
    const arrTweet = tweet.split(' ');

    const results = arrTweet.filter((el) => {
        const isUserIdValid = regexId.test(el);
        return isUserIdValid ? el : null;
    });

    if (results.length === 1) {
        return results[0];
    } else {
        return null;
    }
}

const searchUserInDB = (id) => {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            const collection = client
                .db('FB_IDS_DATABASE')
                .collection('FB_IDS');

            var query = { id };
            console.log(id); // ✅
            // TODO: Check what happens with the query.
            collection.find(query).toArray((err, result) => {
                console.log(result);
                resolve(result);
                client.close();
            });
        });
    });
};

function tweetEvent(tweet) {
    // const name = tweet.user.screen_name;
    // const nameID = tweet.id_str;
    const tweetText = tweet.text;

    const userId = searchUserIdInTweet(tweetText);

    if (userId) {
        searchUserInDB(parseInt(userId)).then((res) => {
            console.log(res);
        });
    }

    // TODO: Send the tweet response.
}
