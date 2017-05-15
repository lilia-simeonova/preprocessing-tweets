'use strict';
var fs = require('fs');
var emoji = require('emoji-strip')



function removeDuplicates(tweets) {
  var hash = new Map();
  for (var i = 0; i < tweets.length; i++) {
    var temp = hash.get(tweets[i]);
    if (!temp) {
      hash.set(tweets[i], tweets[i])
    } else {
      tweets.splice(i, 1)
       i = i -1;
    }
  }
  return tweets;
}

exports.clean = function(file, savedFile, options) {
  
  var filter = new Object;
  if (!options) {
      filter.mentions = true;
      filter.links = true;
      filter.emojis = true;
  } else {
      filter = JSON.parse(options)
  }

  fs.readFile(file, 'utf-8', function read(err, data) {
    if (err) {
      throw err;
    }

    var tweets = data.split('\n');
    var result = [];
    console.log('before',tweets.length)

    for (var i = 0; i < tweets.length; i++) {
      var tweet = tweets[i]
      if (filter.mentions) {
        tweet = tweet.replace(/(@)[\n\S]+/g, '')
      }
      if (filter.emojis) {
        tweet = emoji(tweet)
        tweet = tweet.replace(/(^|\s)(:D|:\/|:\)+|;\)|:-\))(?=\s|[^[:alnum:]+-]|$)/g,'')
      }
      if (filter.links) {
        tweet = tweet.replace(/(?:https?):\/\/[\n\S]+/g, '')
      }
      
      tweet = tweet.replace('\r', '')
          .replace(/RT\s+/g, '')
          .replace('&amp;', '')
          .replace('&lt;', '')
          .replace('&gt;', '')
          .replace(/&gt;+/g,'')
          .replace(/#/g, '')
          .replace(/\s+/g, ' ').trim()

        result.push(tweet);
    }

    result = removeDuplicates(result);
    console.log('after', result.length)
    for (var i = 0; i < result.length; i++) {
      tweet = result[i];
      var words = tweet.split(' ');
      if (words.length > 1) {
        fs.appendFile(savedFile, tweet + '\n', function (err) {
          if (err) throw err;
          
        });
      }
    }
  });

}
