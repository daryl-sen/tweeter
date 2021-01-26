// $(document).ready(function() {
//   $('#tweet-text').on('keyup', function() {
//     // console.log(this);
//     let newVal = 140 - this.value.length;
//     $('.counter').val(newVal);
//     if (newVal < 0) {
//       $('.counter').addClass('red');
//     } else {
//       $('.counter').removeClass('red');
//     }
//   });
// });

$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    let newVal = 140 - $(this).val().length;
    // why???
    const counter = $(this).parent().children('#tweetButtonAndCounter').children('output')
    counter.val(newVal);
    if (newVal < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});

