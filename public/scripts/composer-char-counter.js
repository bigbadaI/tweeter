/* eslint-env jquery */
// eslint-disable-next-line no-undef
$(document).ready(function() {
  console.log("all good");

  // eslint-disable-next-line no-undef
  $('textarea').on("keyup", function() {
    if ((140 - this.value.length) < 0) {
      $('.counter').addClass("negative");
    }
    if ((140 - this.value.length) >= 0) {
      $('.counter').removeClass("negative");
    }
    $('output.counter').html(140 - this.value.length);
  });

});
