/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  return `<article>
  <header>
    <div class="nameAndProfile">
      <img class="profile" src="${tweetData.user.avatars}" alt="profile picture" />
      <span>${tweetData.user.name}</span>
    </div>
    <div class="username">${tweetData.user.handle}</div>
  </header>
  <p>
    ${tweetData.content.text}
  </p>
  <footer>
    <div class="datestamp">
      ${tweetData.created_at} days ago
    </div>
    <div class="controls">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`;
};

const renderTweets = function(tweetsArray, tweetsContainerNode, processTweet) {
  for (const tweet of tweetsArray) {
    $('#tweets').append(processTweet(tweet));
  }
};

const loadTweets = function(callback) {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
    .then((result) => {
      callback(result, $('#tweets'), createTweetElement);
    })
    .catch((err) => {
      console.log(err);
    });
};








$(document).ready(function() {
  // renderTweets(data, $('#tweets'), createTweetElement);

  $('form').on('submit', function(event) {
    event.preventDefault();
    const qstring = $(this).serialize();
    const tweetContent = qstring.split('=')[1];

    console.log(tweetContent);
    if (tweetContent === '') {
      alert('Empty tweet!');
    } else if (tweetContent.length > 140) {
      alert('Tweet too long');
    } else {
      $.ajax({
        url: '/tweets/',
        method: 'GET'
      })
      .then((result) => {
        const tweetsContainerNode = $('#tweets');
        renderTweets(result, tweetsContainerNode, createTweetElement);
      })
      .catch((err) => {
        console.log('something bad happened');
      })
    }
  });

  // loadTweets(renderTweets);
});
