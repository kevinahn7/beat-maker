function playOnClass(element, time) {
  setTimeout(function() {
    if($(element).hasClass('selected')) {
      const origAudio = document.getElementById("audio");
      const newAudio = origAudio.cloneNode();
      newAudio.play();
    };
  }, time);
}



function loop() {
  $("#tap .grid-item").each(function(i) {
    $(this).delay(300 * i).animate({
      opacity: .5,
    }, 299).animate({
      opacity: 1,
    }, 0);

    var that = this;

    playOnClass(that, 300 * i);
    console.log(Date.now());

  });
  setTimeout("loop()", 2400);
}


$(function() {

  $("#tap .grid-item").click(function() {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }
  });

 loop();

});
