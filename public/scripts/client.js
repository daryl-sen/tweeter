/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTime = function(unixTime) {
  const currentUnix = new Date().getTime()
  const secondsAgo = Number(currentUnix - unixTime);
  // 1000ms in 1s, 60s in 1m, 60m in 1h, 24h in 1 day
  const daysAgo = secondsAgo / 1000 / 60 / 60 / 24;
  return Math.floor(daysAgo);
}

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
    ${escape(tweetData.content.text)}
  </p>
  <footer>
    <div class="datestamp">
      ${renderTime(tweetData.created_at)} days ago
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
    // add to the top of the list instead of bottom
    $('#tweets').prepend(processTweet(tweet));
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

const fetchLastTweet = function(containerNode) {
  // only fetch the last tweet, then prepend it to the tweets container
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
  .then((result) => {
    containerNode.prepend(createTweetElement(result[result.length - 1]));
  })
  .catch((err) => {
    console.log(err);
  });
}








$(document).ready(function() {

  $('form').on('submit', function(event) {
    event.preventDefault();
    const qString = $(this).serialize();
    const tweetContent = qString.split('=')[1];
    const notification = $('#notificationContent');

    // notify if tweet is empty or is too long
    if (tweetContent === '') {
      notification.parent().slideDown();
      notification.parent().removeClass('hidden');
      notification.text('Please do not submit empty tweets.');
      setTimeout(() => {
        notification.parent().slideUp();
      }, 3000);
    } else if (tweetContent.length > 140) {
      notification.parent().slideDown();
      notification.parent().removeClass('hidden');
      notification.text('Your tweet is too long, it must be 140 characters or less.');
      setTimeout(() => {
        notification.parent().slideUp();
      }, 3000);
    } else {
      // add tweet to the database and post it
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: qString
      })
      .then((result) => {
        const tweetsContainerNode = $('#tweets');
        fetchLastTweet(tweetsContainerNode);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    // reset the new tweet box
    $(this).children('#tweet-text').val('');
    // reset the counter
    $('.counter').text('140');
  });
  loadTweets(renderTweets);
});
