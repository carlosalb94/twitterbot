// Our Twitter library
const Twit = require('twit');

// We need to include our configuration file
const twit = new Twit(require('../config.js'));

// This is the URL of a search for the latest tweets on the '#MeetMaye' hashtag.
const mediaArtsSearch = { q: '#MeetMaye', count: 100, result_type: 'recent' };

const stream = twit.stream('statuses/filter', { track: '#vistimaBot' });
stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {
    const name = tweet.user.screen_name;
    const nameID = tweet.id_str;
    const tweetText = tweet.text;
    // startScraping(({ title, mediaName }) => {

    //   const file_path = "./media/" + mediaName;

    //   T.postMediaChunked({ file_path }, (err, data, response) => {

    //     if (!err) {
    //       const mediaIdStr = data.media_id_string;
    //       const meta_params = { media_id: mediaIdStr };

    //       T.post('media/metadata/create', meta_params, (err, data, response) => {

    //         if (!err) {
    //           const reply = "@" + name + " " + title;
    //           const params = {
    //             status: reply,
    //             in_reply_to_status_id: nameID,
    //             media_ids: [mediaIdStr]
    //           };

    //           T.post('statuses/update', params, (err, tweet, response) => {

    //             if (!err) {
    //               console.log('Tweeted 🚀 ');
    //             } else {
    //               console.log("Create Tweet error " + err)
    //             }
    //           });

    //         } else {
    //           console.log("Create Media Tweet error " + err)
    //         }
    //       });

    //     } else {
    //       console.log("PostMediaChunked error " + err)
    //     }
    //   });
    // })
}

// // This function finds the latest tweet with the MeetMaye hashtag and retweets.
// const retweetLatest = () => {
//   twit.get("search/tweets", mediaArtsSearch, (error, data) => {
//     // log out any errors and responses
//     console.log(error, data);
//     // If our search request to the server had no errors...
//     if (!error) {
//       // ...then we grab the ID of the tweet we want to retweetwit...
//       let retweetId = data.statuses[0].id_str;
//       // ...and then we tell Twitter we want to retweet it!
//       twit.post("statuses/retweet/" + retweetId, {}, (error, response) => {
//         if (response) {
//           console.log(
//             "Success! Check your bot, it should have retweeted something."
//           );
//         }
//         // If there was an error with our Twitter call, we print it out here.
//         if (error) {
//           console.log("There was an error with Twitter:", error);
//         }
//       });
//     }
//     // However, if our original search request had an error, we want to print it out here.
//     else {
//       console.log("There was an error with your hashtag search:", error);
//     }
//   });
// }

// // Try to retweet something as soon as we run the program...
// retweetLatest();
// ...and then every hour/half thereafter. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
// setInterval(retweetLatest, 1000 * 60 * 30);
