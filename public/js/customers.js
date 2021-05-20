$(document).ready(function () {
  const table = $("table");
  const cards = $(".grid");
  cards.hide();
  let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const balance = document.querySelectorAll(".balance");
  balance.forEach((e) => {
    e.textContent = numberWithCommas(e.textContent);
  });

  const togglerSub = $(".toggler-sub .view");
  togglerSub.click(function () {
    $(`.toggler-sub .view`).removeClass("active");
    $(this).addClass("active");
    if ($(".active").hasClass("table")) {
      console.log("table");
      cards.fadeOut(10);
      table.fadeIn(500);
    } else {
      table.fadeOut(10);
      cards.fadeIn(500);
    }
  });
  const row = document.querySelectorAll(".row");
  $("tr").click(function () {
    let userID = this.dataset.link;
    window.location.href = `/user/${userID}`;
  });
});
