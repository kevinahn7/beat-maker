// function to play sounds that gets called during animation loops, piggybacks off of animation function already iteration through the rows
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
      } else if(instrument === "bongo") {
        var origAudio4 = document.getElementById("bongoSound");
        var newAudio4 = origAudio4.cloneNode();
        if (letItLoop === true) {
          newAudio4.play();
        }
      } else if(instrument === "keys") {
        var origAudio5 = document.getElementById("keysSound");
        var newAudio5 = origAudio5.cloneNode();
        if (letItLoop === true) {
          newAudio5.play();
        }
      }
//Insert here for new instruments
    }, time);
  }
}
// loops that iterate through each row - ideally should be refactored into just one function that can be called on for each instrument.
function loop1() {
  // letItLoop was set as a global boolean so we could tell script to stop everything on pause clicks
  if (letItLoop === true) {
    // this is why what we're doing's probably really rough, since we could have a general function with a parameter for where "#snare .spot" is called so it'd be reuseable.
    $("#snare .spot").each(function(i) {
      // "each" method goes through each of the .spot items, variable i is declared to delay the animation between each because otherwise animations would start at the same time for all the .spots.
      $(this).delay(100 * i).animate({
        opacity: .1,
      }, 100).animate({
        opacity: 1,
      }, 0);
      // shoving arguments into playOnBeat function that plays sounds. We ended up making it its own function so it'd run concurrently with this animation function, using "100 * i" as its "time" parameter.
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
function loop4() {
  $("#bongo .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "bongo");
  });
};
function loop5() {
  $("#keys .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "keys");
  });
};

function loops() {
  if(letItLoop === true) {
    loop1();
    loop2();
    loop3();
    loop4();
    loop5();
    setTimeout(loops, 3200);
  }
}

function barBounce() {
  if(letItLoop) {
    $(".bars div").each(function() {
      $(this).animate({
        height: (Math.floor(Math.random() * 650)) + "px",
        opacity: (Math.random() + .2)
      }, 350);

    });
    setTimeout(barBounce, 400);
  } else {
    $(".bars div").each(function() {
      $(this).animate({
        height: "0",
        opacity: 0
      }, 700);
    });
  }
}

let letItLoop = false;


$(document).ready(function() {
  $(".playButton").click(function() {
    $(".playButton").toggle();
    $(".pauseButton").toggle();
    letItLoop = true;
    barBounce();
    loops();
    $(".record, .smallRecord").addClass("fa-spin");
  });
  $(".pauseButton").click(function() {
    $(".playButton").attr("disabled", "disabled");
    $(".playButton").toggle();
    $(".pauseButton").toggle();
    letItLoop = false;
    $(".spot").finish();
    setTimeout(function() {
      $(".playButton").removeAttr("disabled")
    }, 3200)
    $(".record, .smallRecord").removeClass("fa-spin");
  });
  $(".clearButton").click(function() {
    $(".beatsAll .spot").removeClass("selected snare bass hihat bongo keys");
  });

  $("#snare .spot").click(function() {
    $(this).toggleClass("selected snare");
  });
  $("#bass .spot").click(function() {
    $(this).toggleClass("selected bass");
  });
  $("#hihat .spot").click(function() {
    $(this).toggleClass("selected hihat");
  });
  $("#bongo .spot").click(function() {
    $(this).toggleClass("selected bongo");
  });
  $("#keys .spot").click(function() {
    $(this).toggleClass("selected keys");
  });

  $(".spot").hover(function() {
    $(this).parent().animate({
      "opacity": ".9"
    }, 0);
  });
  $(".spot").mouseout(function() {
    $(this).parent().animate({
      "opacity": "1"
    }, 0);
  });

  $(".spot").mousedown(function() {
    $(".spot").mouseenter(function() {
      $(this).addClass("selected snare bass hihat bongo keys");
      $(document).mouseup(function() {
        $(".spot").off('mouseenter');
      })
    });
    $(".spot").mouseleave(function() {
      $(this).addClass("selected snare bass hihat bongo keys");
      $(document).mouseup(function() {
        $(".spot").off('mouseleave');
      })
    });
  });
});
