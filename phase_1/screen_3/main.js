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
     url: `http://www.chocolatepanda.co.il/kav/add_waste.php?amount=${lossAmount}&type=${lossType}`
   })
  .done((result) => {
    console.log(" >>> submitLoss success!");
  })
  .fail((error) => {
    console.log(" >>> submitLoss error!: " + JSON.stringify(error));
  })

  bringButtonsBack()
}

function bringButtonsBack() {
  $("input.loss-amount").val(0.1)
  $(".amount-container").addClass("hidden")
  $(".buttons-container").removeClass("hidden")
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
