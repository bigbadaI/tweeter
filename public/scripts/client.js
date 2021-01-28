/* eslint-env jquery */

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// eslint-disable-next-line no-undef
$(document).ready(function() {

  //Takes an array of tweets and uses a callback to break down the array to each individaul tweet
  const renderTweets = function(tweets) {
    let answer = {};
    tweets.forEach(element => {
      answer = createTweetElement(element);
      $('#tweets-container').prepend(answer);
    });
  };

  //How much time has passed between tweets
  const timeAgo = function(time) {

    switch (typeof time) {
    case 'number':
      break;
    default:
      time = +new Date();
    }
    let timeFormats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    ];
    let seconds = (+new Date() - time) / 1000,
      token = 'ago',
      listChoice = 1;

    if (seconds === 0) {
      return 'Just now';
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      listChoice = 2;
    }
    let i = 0,
      format;
    while (format = timeFormats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] === 'string')
          return format[listChoice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  };

  //changes the tweet object into html text for rendering on the page
  const createTweetElement = function(data) {
    let words = data.content.text;
    let newWords = words.replace(/(<([^>]+)>)/gi, "").trim();
    let $tweet = $('<article></article');
    let newHeader = $(`<header><img src=${data.user.avatars}><h2>${data.user.handle}</h2>`);
    let newBody = $(`<body><p>${newWords}</p></body>`);
    let breakLine = $('<hr>');
    let newFooter = $(`<div class="footer"><p>${timeAgo(data.created_at)}</p>      
    <div class="footer-images">
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    <i class="fab fa-font-awesome-flag"></i>
    </div></div>`);
    $tweet.append(newHeader);
    $tweet.append(newBody);
    $tweet.append(breakLine);
    $tweet.append(newFooter);
    return $tweet;
  };

  //Checks if the tweet meets conditions upon submit and if so submits the tweet. If not user will get an error
  $("form").on("submit", function(event) {
    event.preventDefault();
    if ($("textarea").val().length <= 0) {
      $('.error-message').html('<span>Sorry please type something for us to tweet.</span>');
      $('.error-message').slideDown("slow");
      return false;
    }
    if ($("textarea").val().length > 140) {
      $('.error-message').html('<span>Sorry to many characters please follow the 140 limit.</span>');
      $('.error-message').slideDown("slow");
      return false;
    }
    //If no problems with text length post made and tweets reloaded
    $.ajax({
      type: "POST",
      url: 'http://localhost:8080/tweets',
      data: $(this).serialize(),
      success: function() {
        $('#tweets-container').empty();
        loadTweets();
      }
    });
  });
  //Loads all saved tweets to the page
  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(moretweets) {
        renderTweets(moretweets);
      });
  };

  loadTweets();
});