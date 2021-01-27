/* eslint-env jquery */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// eslint-disable-next-line no-undef
$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    let answer = {};
    tweets.forEach(element => {
      answer = createTweetElement(element);
      $('#tweets-container').prepend(answer);
    });
  };



  const createTweetElement = function(data) {
    let $tweet = $('<article></article');
    let newHeader = $(`<header><img src=${data.user.avatars}><h2>${data.user.handle}</h2>`);
    let newBody = $(`<body><p>${data.content.text}</p></body>`);
    let breakLine = $('<hr>');
    let newFooter = $(`<div class="footer"><p>${data.created_at}</p>      
    <div class="footer-images">
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    <i class="fab fa-font-awesome-flag"></i>
  </div></div>`);
    $tweet.append(newHeader);
    $tweet.append(newBody);
    $tweet.append(breakLine);
    $tweet.append(newFooter);
    console.log($tweet);
    return $tweet;
  };

  renderTweets(data);

});