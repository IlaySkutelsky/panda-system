let state = {
  isWorking: false,
  workingSinceTimestamp: null,
  stoppedSinceTimestamp: Date.now(),
  stopReasonsJSON: null
}

function init(){
  getAndUpdateData();
  getAndShowReasons();
  // get reasons and render
}

function getAndUpdateData() {
  getAndShowTime();
  // updateDuration();
  setTimeout(getAndUpdateData, 10000);
}

function getAndShowReasons() {
  // $(".prod-rate .lds-ellipsis").addClass("hidden")
  $.ajax({
     url: "http://www.chocolatepanda.co.il/kav/stop_reasons.php",
   })
  .done((result) => {
    console.log(" >>> getAndShowReasons succes! result: " + result);
  })
  .fail((error) => {
    console.log(" >>> getAndShowReasons error!: " + JSON.stringify(error));
  })

  let json = `[{"title":"break","id":0},{"title":"technical","id":1},{"title":"rnd of shift","id":2},{"title":"break","id":3},{"title":"technical","id":4},{"title":"rnd of shift","id":4},{"title":"break","id":6},{"title":"technical","id":7},{"title":"rnd of shift","id":8},{"title":"break","id":9},{"title":"technical","id":10},{"title":"rnd of shift","id":11}]`
  if (state.stopReasonsJSON && state.stopReasonsJSON != json) {
    state.stopReasonsJSON = json
    let reasons = JSON.parse(json)
    // jquery render reasons
  }

}


function goBackToWork() {
  $(".stop-button span").text(" ")
  $(".stop-button .lds-ellipsis").removeClass("hidden");
  $.ajax({
     url: "http://www.chocolatepanda.co.il/kav/start_line.php",
     method: "POST"
   })
  .done((result) => {
    console.log(" >>> goBackToWork succes! result: " + result);
    $(".stop-button .lds-ellipsis").addClass("hidden")
  })
  .fail((error) => {
    console.log(" >>> goBackToWork error!: " + JSON.stringify(error));
  })

  state.isWorking = true;
  state.workingSinceTimestamp = Date.now();
  state.stoppedSinceTimestamp = null;
  $("section.is-stopped").addClass("hidden");
  $("section.is-working").removeClass("hidden");
  getAndShowReasons();
}

function getAndShowTime() {
  let now = new Date();
  let dayOfMonth = keepTwoDigits(now.getDate());
  let month = keepTwoDigits(now.getMonth());
  let year = now.getFullYear();
  let hours = keepTwoDigits(now.getHours());
  let minutes = keepTwoDigits(now.getMinutes());
  let timeString = dayOfMonth + "/" + month + "/" + year + " " + hours + ":" + minutes;
   $(".clock").text(timeString)
}

function keepTwoDigits(n) {
    return n > 9 ? "" + n: "0" + n;
}
