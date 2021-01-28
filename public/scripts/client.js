/* eslint-env jquery */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// eslint-disable-next-line no-undef
$(document).ready(function() {

  //takes an array of tweets and uses a callback to break down the array to each individaul tweet
  const renderTweets = function(tweets) {
    let answer = {};
    tweets.forEach(element => {
      answer = createTweetElement(element);
      $('#tweets-container').prepend(answer);
    });
  };


  //changes the tweet object into html text for rendering on the page
  const createTweetElement = function(data) {
    let words = data.content.text;
    let newWords = words.replace(/(<([^>]+)>)/gi, "").trim();
    let $tweet = $('<article></article');
    let newHeader = $(`<header><img src=${data.user.avatars}><h2>${data.user.handle}</h2>`);
    let newBody = $(`<body><p>${newWords}</p></body>`);
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
    return $tweet;
  };


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

    $.ajax({
      type: "POST",
      url: 'http://localhost:8080/tweets',
      data: $(this).serialize(),
      success: function() {
        loadTweets();
      }
    });
  });

  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(moretweets) {
        renderTweets(moretweets);
      });

  };
  loadTweets();



});