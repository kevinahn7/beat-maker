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

function Beat(name, beat){
  this.name = name;
  this.beat = [];
  this.savedBeats = []
}

Beat.prototype.saveBeat = function (){
  var beatArray = [];
  $(".beatsAll .spot").each(function(){
    if($(this).hasClass("selected")){
      beatArray.push("selected");
    } else {
      beatArray.push("no");
    }
  });
  this.beat = beatArray;
}

Beat.prototype.savedArray = function (){
  this.savedBeats.push(this.beat);
}


$(document).ready(function() {
  var beatWan = new Beat();
  var saved = 0;
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

  $(".saveButton").click(function(){
    beatWan.saveBeat();
    beatWan.savedArray();
    $(".savedBeats").show();
      $("#listOfBeats").append("<li value='" + saved + "'>"+ saved + " beat" + "</li>");
      saved++;
      console.log(beatWan);
  });


  $("#listOfBeats").on('click', 'li', function(){
    var chosenBeat = beatWan.savedBeats[$(this).val()];
    $(".beatsAll .spot").removeClass("selected snare bass hihat bongo keys");
    $(".beatsAll .spot").each(function(i){
        if(chosenBeat[i] === "selected") {
        $(this).addClass("selected snare bass hihat bongo keys");
      }
    });
  });

  $(".spot").click(function() {
    $(this).toggleClass("selected snare bass hihat bongo keys");
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
    if ($(this).hasClass("selected")) {
      $(".spot").mouseenter(function() {
        $(this).removeClass("selected snare bass hihat bongo keys");
        $(document).mouseup(function() {
          $(".spot").off('mouseenter');
        })
      });
      $(".spot").mouseleave(function() {
        $(this).removeClass("selected snare bass hihat bongo keys");
        $(document).mouseup(function() {
          $(".spot").off('mouseleave');
        })
      });
    } else if (!$(this).hasClass("selected")) {
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
    }
  });
});
