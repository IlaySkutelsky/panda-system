let state = {
  stage: 1,
  workingSinceTimestamp: null,
  stoppedSinceTimestamp: null,
  stopReasonsJSON: null
}

function init(){
  getAndUpdateData();
  getAndRenderReasons();
}

function getAndUpdateData() {
  getAndShowTime();
  // getLineState();
  // updateDuration();
  setTimeout(getAndUpdateData, 10000);
}

function startAdjusting() {
  state.stage = 2
  console.log("starting to adjust");
}

function startWorking() {
  state.stage = 3
  console.log("starting to work");
}

function stopWorking() {
  state.stage = 4
  console.log("stopped working");
}


function goBackToWork() {
  state.stage = 3
  console.log("back to working");
}

function reportReason(id) {
  console.log("reporting reason: " + id);
}

function getAndRenderReasons() {
  // $(".prod-rate .lds-ellipsis").addClass("hidden")
  $.ajax({
     url: "http://www.chocolatepanda.co.il/kav/stop_reasons.php",
   })
  .done((result) => {
    console.log(" >>> getAndShowReasons succes! result: ");
    console.log(JSON.parse(result));
  })
  .fail((error) => {   $(".clock").text()

    console.log(" >>> getAndShowReasons error!: " + JSON.parse(error));
  })

  let json = `[{"title":"break","id":0},{"title":"technical","id":1},{"title":"rnd of shift","id":2},{"title":"break","id":3},{"title":"technical","id":4},{"title":"rnd of shift","id":4},{"title":"break","id":6},{"title":"technical","id":7},{"title":"rnd of shift","id":8},{"title":"break","id":9},{"title":"technical","id":10},{"title":"rnd of shift","id":11}]`
  if (state.stopReasonsJSON && state.stopReasonsJSON != json) {
    state.stopReasonsJSON = json
    let reasons = JSON.parse(json)
    // jquery render reasons
  }

}



function getAndShowTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = keepTwoDigits(now.getMonth());
  let dayOfMonth = keepTwoDigits(now.getDate());
  let hours = keepTwoDigits(now.getHours());
  let minutes = keepTwoDigits(now.getMinutes());
  let timeString = dayOfMonth + "/" + month + "/" + year + " " + hours + ":" + minutes;
   $(".clock").text(timeString)
}

function keepTwoDigits(n) {
    return n > 9 ? "" + n: "0" + n;
}
