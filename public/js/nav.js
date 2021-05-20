$(document).ready(() => {
  const li = document.querySelectorAll("li");
  li.forEach((e) => {
    e.classList.remove("active");
    console.log(e.dataset.page);
    if (e.dataset.page == page) {
      e.classList.add("active");
    }
    if (e.dataset.page == "customers" && page == "view") {
      e.classList.add("active");
    }
  });
  const toggler = $(".toggler");
  const nav = $("nav .links");
  //   nav.animate({ top: "100%" });
  toggler.click(function () {
    toggler.toggleClass("close open");
    console.log($(this).children()[0]);
    if (toggler.hasClass("close")) {
      //   nav.fadeOut(500);
      nav.animate({ left: "100%" });

      $(this).children()[0].src = "../assets/menu.svg";
    } else {
      //   nav.fadeIn(500);
      nav.animate({ left: "0px" });

      $(this).children()[0].src = "../assets/close.svg";
    }
  });
});
