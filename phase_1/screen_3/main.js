var lossType

function init(){
  getAndUpdateData();
}

function getAndUpdateData() {
  getAndShowTime();
  setTimeout(getAndUpdateData, 10000);
}

function setLossType(id) {
  lossType = id;
  let subHeaderText = "כמות שוקולד למיחזור";
  if (id==2) {
    subHeaderText = "כמות שוקולד לזריקה"
  }
  $(".amount-container h2").text(subHeaderText);
  $(".amount-container").removeClass("hidden")
  $(".buttons-container").addClass("hidden")
}

function submitLoss() {
  let lossAmount = $("input.loss-amount").val();

  $.ajax({
     url: `https://www.chocolatepanda.co.il/kav/add_waste.php?amount=${lossAmount}&type=${lossType}`
   })
  .done((result) => {
    console.log(" >>> submitLoss success!");
    $("h2.status.success").removeClass("hidden")
    $("h2.status.success").addClass("fade-out")
    setTimeout(hideStatus, 6000, "success")
  })
  .fail((error) => {
    console.log(" >>> submitLoss error!: " + JSON.stringify(error));
    $("h2.status.error").removeClass("hidden")
  })

  bringButtonsBack()
}

function bringButtonsBack() {
  $("input.loss-amount").val(250)
  $(".amount-container").addClass("hidden")
  $(".buttons-container").removeClass("hidden")
}

function hideStatus(type) {
  $(`h2.status.${type}`).addClass("hidden")
  $(`h2.status.${type}`).removeClass("fade-out")
}

// function addDecimalPlaces(event) {  // Depracated for causing the input to "blink"
//   $(event.target).val(parseFloat($(event.target).val()).toFixed(3))
// }

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
