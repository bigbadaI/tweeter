/* eslint-env jquery */
// eslint-disable-next-line no-undef
$(document).ready(function() {
  console.log("all good");

  $('textarea').on("input", function() {
    let str = this.value;
    let workingStr = str.trim();
    if ((140 - workingStr.length) < 0) {
      $('.counter').addClass("negative");
    }
    if ((140 - workingStr.length) >= 0) {
      $('.counter').removeClass("negative");
    }
    if ((140 - workingStr.length) > 0 && (140 - workingStr.length) < 140) {
      $('.error-message').slideUp();
    }
    $('output.counter').text(140 - workingStr.length);
  });
});
