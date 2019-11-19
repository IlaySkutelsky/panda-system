
function init(){
  getAndUpdateDate();
}

function getAndUpdateDate() {
  getAndShowTime();
  getAndShowProdRate();
  getAndShowShiftSum();
  getAndShowInstructions();
  setTimeout(getAndUpdateDate, 10000)
}

function getAndShowProdRate() {
  $.ajax({
     url: "http://www.chocolatepanda.co.il/kav/current_rate.php",
   })
  .done((result) => {
    console.log(" >>> getAndShowProdRate succes! result: " + result);
    let amount = result.data;
    $(".prod-rate .lds-ellipsis").addClass("hidden")
    $(".prod-rate .amount").text(amount)
  })
  .fail((error) => {
    console.log(" >>> getAndShowProdRate error!: " + JSON.stringify(error));
  })
  // $(".prod-rate .lds-ellipsis").removeClass("hidden")

  let amount = 350;
  $(".prod-rate .amount").text(amount)
}

function getAndShowShiftSum() {
  $.ajax({
     url: "http://www.chocolatepanda.co.il/kav/shift_output.php",
   })
  .done((result) => {
    console.log(" >>> getAndShowShiftSum succes! result: " + result);
    let amount = result.data;
    $(".shift-sum .lds-ellipsis").addClass("hidden")
    $(".prod-rate .amount").text(amount)
  })
  .fail((error) => {
    console.log(" >>> getAndShowShiftSum error!: " + JSON.stringify(error));
  })
  // $(".shift-sum .lds-ellipsis").removeClass("hidden")

  let amount = 350;
  $(".shift-sum .amount").text(amount)
}

function getAndShowInstructions() {
  $.ajax({
     url: "http://www.chocolatepanda.co.il/kav/shift_output.php",
   })
  .done((result) => {
    console.log(" >>> getAndShowInstructions succes! result: " + result);
    let instructions = result.data;
    $(".instructions-container .lds-ellipsis").addClass("hidden")
    $(".instructions").text(instructions)
  })
  .fail((error) => {
    console.log(" >>> getAndShowInstructions error!: " + JSON.stringify(error));
  })
  // $(".instructions-container .lds-ellipsis").removeClass("hidden")

  let instructions = `
    לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית גולר. מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, לפרומי בלוף קינץ תתיח לרעח. `;
  $(".instructions").text(instructions)
  $(".instructions").shrinkText();
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

(function($){
  $.fn.shrinkText = function() {

    var $_me = this;
    var $_parent = $_me.parent();

    var int_my_height = $_me.height();
    var int_parent_height = $_parent.height();

    if ( int_my_height > int_parent_height ){
      rl_ratio = int_parent_height / int_my_height;
      var int_my_fontSize = $_me.css("font-size").replace(/[^-\d\.]/g, '');
      int_my_fontSize = Math.floor(int_my_fontSize * rl_ratio);
      $_me.css("font-size", int_my_fontSize + "px");
    }
  };
})(jQuery);
