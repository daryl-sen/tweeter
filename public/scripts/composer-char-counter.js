
$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    const newVal = 140 - $(this).val().length;
    const counter = $(this).parent().children('#tweetButtonAndCounter').children('output');
    counter.val(newVal);
    if (newVal < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});

// MENTOR'S NOTES:
// no global search by traversing tree - faster, avoid performance penalty
// prevents problems if .counter is used in multiple locations

