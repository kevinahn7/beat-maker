function playOnClass(element, time) {
  setTimeout(function() {
    if($(element).hasClass('selected')) {
      const origAudio = document.getElementById('audiotag');
      const newAudio = origAudio.cloneNode();
      newAudio.play();
    };
  }, time);
}


function loop() {

  $(".beatsRows .spot").each(function(i) {
    $(this).delay(300 * i).animate({
      opacity: .5,
    }, 299).animate({
      opacity: 1,
    }, 0);

    var that = this;

    playOnClass(that, 300 * i);

  });
  setTimeout("loop()", 4800);
}


$(function() {

  $(".beatsRows .spot").click(function() {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }
  });

 loop();

});
