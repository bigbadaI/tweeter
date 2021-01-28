/* eslint-env jquery */
// eslint-disable-next-line no-undef
$(document).ready(function() {
  console.log("all good");

  // eslint-disable-next-line no-undef
  $('textarea').on("keyup", function() {
    let numLength = 140 - this.value.length;
    if ((140 - this.value.length) < 0) {
      $('.counter').addClass("negative");
    }
    if ((140 - this.value.length) >= 0) {
      $('.counter').removeClass("negative");
    }
    if (numLength === 140 || numLength < 0) {
      $("button").on("click", function(event) {
        event.stopPropagation();
        // event.preventDefault();
        alert("Sorry your message doesn't fit the criteria");
      });
    }
    
    $('output.counter').html(140 - this.value.length);
    
  });


});
