$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    // console.log(this);
    let newVal = 140 - this.value.length;
    $('.counter').val(newVal);
    if (newVal < 0) {
      $('.counter').addClass('red');
    } else {
      $('.counter').removeClass('red');
    }
  });
});

// no global search - slower, performance penalty
// if .counter is used in multiple locations

$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    const newVal = 140 - $(this).val().length; // default to const not let
    // for (const item of array) use const
    const counter = $(this).parent().children('#tweetButtonAndCounter').children('output')
    counter.val(newVal);
    if (newVal < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});

