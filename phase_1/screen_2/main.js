let state = {
  stage: 1,
  stoppedSinceTimestamp: null,
  stopReasonId: null
}

function init(){
  getAndUpdateData();
  getAndRenderReasons();
}

function getAndUpdateData() {
  getAndShowTime();
  getLineState();
  updateDownDuration();
  setTimeout(getAndUpdateData, 10000);
}

function getLineState() {
  $.ajax({
     url: 'http://www.chocolatepanda.co.il/kav/get_status.php',
   })
  .done((result) => {
    result = +JSON.parse(result)
    if (result != state.stage) {
      setCurrentStage(result, true);
    };
  })
  .fail((error) => {
    console.log(" >>> getLineState error!: " + error);
  })
}

function setCurrentStage(id, fromServer) {
  if (id === 4) {
    state.stoppedSinceTimestamp = Date.now()
  }
  state.stage = id
  if (!fromServer) {
    reportCurrStatus(id, state.stopReasonId)
  }
  showCurrentStage()
  console.log("current stage: " + id);

}

function reportCurrStatus(id, reasonId) {
  console.log("reporting status id: " + id + " and reasonId: " + reasonId);
  let url = 'http://www.chocolatepanda.co.il/kav/set_status.php?status=' + id
  if (reasonId) {
    url += '&stop_reason=' + reasonId
  }
  state.currentStopReason = id;
  console.log("reporting to url: " + url);
  $.ajax({
     url: url,
   })
  .done((result) => {
    console.log(" >>> reportReason success: " + result);
  })
  .fail((error) => {
    console.log(" >>> reportReason error!: " + JSON.parse(error));
  })
}

function setReason(id) {
  state.stopReasonId = id
  console.log("setting stop reason id: " + id);
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
  debugger;
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
      buttonsHtml += `<button onclick="setReason(${index})">${value}</button>`
    })
    $(".reasons-container").html(buttonsHtml)
  })
  .fail((error) => {
    console.log(" >>> getAndShowReasons error!: " + JSON.parse(error));
  })
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
