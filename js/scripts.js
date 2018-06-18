function loop1() {
  $("#snare .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
  });
};
function loop2() {
  $("#bass .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
  });
};
function loop3() {
  $("#hihat .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
  });
};



function loops() {
  console.log(letItLoop)
  if(letItLoop === true) {
    loop1();
    loop2();
    loop3();
    setTimeout(loops, 3200);
    clearTimeout();
  }
}

var letItLoop = true;
$(document).ready(function() {

  $(".playButton").click(function() {
    $(".playButton").toggle();
    $(".pauseButton").toggle();
    letItLoop = true;
    loops();
  });

  $(".pauseButton").click(function() {
    $(".playButton").attr("disabled", "disabled");
    $(".playButton").toggle();
    $(".pauseButton").toggle();
    letItLoop = false;
    loops();
    $(".spot").finish();
    setTimeout(function() { $(".playButton").removeAttr("disabled")}, 3200)

  })



});
