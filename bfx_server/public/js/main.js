"use strict";

window.onload = function () {
  var navOffset = document.querySelector(".navbar").offsetHeight;
  var elems = document.querySelectorAll(".nav-link");

  function getHref(event) {
    event.preventDefault();
    var href = event.target.hash;

    if ("#".concat(window.location.href.split("#")[1]) !== href) {
      window.location.hash = href;
      window.scrollBy({
        top: -navOffset,
        // could be negative value
        left: 0,
        behavior: "smooth"
      });
    }
  }

  elems.forEach(function (el) {
    return el.addEventListener("click", getHref);
  }); // We can set a scss variable like this ????

  document.documentElement.style.setProperty("$fixed-top-offset", navOffset);
  console.log(navOffset);
};
//# sourceMappingURL=main.js.map