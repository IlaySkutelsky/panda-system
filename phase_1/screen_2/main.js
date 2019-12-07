let state = {
  stage: 1,
  workingSinceTimestamp: null,
  stoppedSinceTimestamp: null,
  currentStopReason: null
}

function init(){
  getAndUpdateData();
  getAndRenderReasons();
}

function getAndUpdateData() {
  getAndShowTime();
  // getLineState();
  updateDownDuration();
  setTimeout(getAndUpdateData, 10000);
}

function startAdjusting() {
  state.stage = 2
  showCurrentStage()
  console.log("starting to adjust");
}

function startWorking() {
  state.stage = 3
  showCurrentStage()
  console.log("starting to work");
}

function stopWorking() {
  state.stoppedSinceTimestamp = Date.now()
  state.stage = 4
  showCurrentStage()
  console.log("stopped working");
}


function goBackToWork() {
  state.stage = 3
  showCurrentStage()
  console.log("back to working");
}

function reportReason(id) {
  console.log("reporting reason: " + id);
  $.ajax({
     url: "https://www.chocolatepanda.co.il/kav/stop_line.php?reason_id=$reason",
   })
  .done((result) => {
    console.log(" >>> reportReason success: " + JSON.parse(result));
  })
  .fail((error) => {
    console.log(" >>> reportReason error!: " + JSON.parse(error));
  })

}

function showCurrentStage() {
  $("section").addClass("hidden")
  let stageClassesMap = {
    1: "start",
    2: "adjusting",
    3: "working",
    4: "stopped"
  }
  let stageClass = stageClassesMap[state.stage]
  $(`section.${stageClass}`).removeClass("hidden")
}

function updateDownDuration() {
  if (!state.stoppedSinceTimestamp) return
  let seconds = (Date.now() - state.stoppedSinceTimestamp) / 1000;
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  let durationString = keepTwoDigits(hours)+":"+keepTwoDigits(minutes)
  $(".stopped .stop-dur .dur").text(durationString)
}

function getAndRenderReasons() {
  // $(".prod-rate .lds-ellipsis").addClass("hidden")
  $.ajax({
     url: "https://www.chocolatepanda.co.il/kav/stop_reasons.php",
   })
  .done((result) => {
    let reasonsObj =  JSON.parse(result);
    let buttonsHtml = ''
    $.each(reasonsObj, (index, value) => {
      buttonsHtml += `<button onclick="reportReason(${index})">${value}</button>`
    })
    $(".reasons-container").html(buttonsHtml)
  })
  .fail((error) => {
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
