function loop1() {
  $("#snare .spot").each(function(i) {
    $(this).delay(300 * i).animate({
      opacity: .1,
    }, 299).animate({
      opacity: 1,
    }, 0);
  });
};
function loop2() {
  $("#bass .spot").each(function(i) {
    $(this).delay(300 * i).animate({
      opacity: .1,
    }, 299).animate({
      opacity: 1,
    }, 0);
  });
};
function loop3() {
  $("#hihat .spot").each(function(i) {
    $(this).delay(300 * i).animate({
      opacity: .1,
    }, 299).animate({
      opacity: 1,
    }, 0);
  });
};




function loops(play) {
  loop1();
  loop2();
  loop3();
  console.log(play)
  if(play !== true) {
    setTimeout(loops, 4800);
  }
}



$(document).ready(function() {
  $(".playButton").click(function() {
    $(".playButton").toggle();
    $(".pauseButton").toggle();
    loops(false);
  });

  $(".pauseButton").click(function() {
    $(".playButton").toggle();
    $(".pauseButton").toggle();

    loops(true);
    $(".spot").finish();
  })



});
