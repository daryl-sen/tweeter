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