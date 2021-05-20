$(document).ready(function () {
  let close = $(".closemd,.accept");
  $("#amount").val("");
  $(".hidden").hide();

  $("#show").click(function () {
    $("#show").hide(300);
    $(".hidden").show(300);
  });
  //   $(".container").fadeOut(0);
  close.click(function () {
    $(".container").fadeOut(500);
    location.reload();
  });
  const account = $(".number");
  let acc_no = account[0].textContent;
  let numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
  };
  account[0].textContent = numberWithSpaces(acc_no);
  let numberWithCommas = (x) => {
    // return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  };
  const balance = document.querySelectorAll(".balance");
  balance.forEach((e) => {
    e.textContent = numberWithCommas(e.textContent);
  });

  const form = $("#form");
  form.submit(function (e) {
    e.preventDefault();
    let sender = userID;
    let username = userName;
    let balance = $(".balance").html();
    let tempBalance = balance.slice(1, balance.length).split(",");
    let currBalance = "";
    tempBalance.forEach((e) => (currBalance += e));
    let receiver = $("#accounts").find(":selected")[0].dataset.uid;
    let receivername = $("#accounts").find(":selected").text();
    let sendAmount = $("#amount").val();

    if (parseInt(sendAmount) <= parseInt(currBalance)) {
      $("#transfer").html('<i class="fa fa-spinner fa-spin"></i>Loading');

      console.log(sender, username, currBalance);
      console.log(receiver, receivername, sendAmount);
      const currentdate = new Date();
      let minutes =
        currentdate.getMinutes() < 10
          ? "0" + currentdate.getMinutes()
          : currentdate.getMinutes();

      const datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        minutes;
      let details = {
        userID: sender,
        username: username,
        balance: parseInt(currBalance),
        receiver: receiver,
        receivername: receivername,
        amount: parseInt(sendAmount),
        date: datetime,
      };
      console.log(details);
      fetch("/transact", {
        method: "POST",
        body: JSON.stringify(details),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          $(".container").fadeIn(500);
          $("#tid").html(json.tid);
          $("#transfer").html("Transfer");
        });
    } else {
      alert("Insufficient Balance!");
    }
  });
});
