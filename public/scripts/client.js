/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
console.log('client loaded');



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
    tweetsContainerNode.append(processTweet(tweet));
  }
};




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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$( document ).ready(function() {
  renderTweets(data, $('#tweets'), createTweetElement);
});