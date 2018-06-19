function playOnBeat(element, time, instrument) {
    if($(element).hasClass('selected')) {
      setTimeout(function() {
        if(instrument === "snare") {
          var origAudio1 = document.getElementById("snareSound");
          var newAudio1 = origAudio1.cloneNode();
          if (letItLoop === true) {
            newAudio1.play();
          }
        } else if(instrument === "bass") {
          var origAudio2 = document.getElementById("bassSound");
          var newAudio2 = origAudio2.cloneNode();
          if (letItLoop === true) {
            newAudio2.play();
          }

        } else if(instrument === "hihat") {
          var origAudio3 = document.getElementById("hihatSound");
          var newAudio3 = origAudio3.cloneNode();
          if (letItLoop === true) {
            newAudio3.play();
          }
        }
      }, time);
    }
}
function loop1() {
  if (letItLoop === true) {
    $("#snare .spot").each(function(i) {
      $(this).delay(100 * i).animate({
        opacity: .1,
      }, 100).animate({
        opacity: 1,
      }, 0);
      playOnBeat(this, 100 * i, "snare");
    });
  }
};
function loop2() {
  $("#bass .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "bass");

  });
};
function loop3() {
  $("#hihat .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "hihat");

  });
};
function loops() {
  if(letItLoop === true) {
    loop1();
    loop2();
    loop3();
    setTimeout(loops, 3200);
  }
}

let letItLoop = true;

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
    setTimeout(function() {
      $(".playButton").removeAttr("disabled")
    }, 3200)
  });
  $("#snare .spot").click(function() {
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected snare");
    } else {
      $(this).addClass("selected snare");
    }
  });
  $("#bass .spot").click(function() {
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected bass");
    } else {
      $(this).addClass("selected bass");
    }
  });
  $("#hihat .spot").click(function() {
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected hihat");
    } else {
      $(this).addClass("selected hihat");
    }
  });
});
