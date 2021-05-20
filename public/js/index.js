$(document).ready(() => {
  const li = $("li");
  li.click(function () {
    // console.log($(this)[0].className);
    li.removeClass("active");
    $(this).addClass("active");
  });
});
