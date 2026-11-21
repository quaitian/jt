// يحوّل أرقام الهوامش إلى الأرقام العربية بين قوسين: (١) (٢) ...
// ويضع عنوان «الهوامش» قبل قائمتها، وينقل «ملاحظات المترجم» إلى ما بعدها.
(function () {
  var digits = "٠١٢٣٤٥٦٧٨٩";
  function toArabic(s) {
    return s.replace(/[0-9]/g, function (d) { return digits[+d]; });
  }

  function fix() {
    document.querySelectorAll(".md-typeset .footnote-ref").forEach(function (a) {
      if (a.dataset.ar) return;
      a.textContent = "(" + toArabic(a.textContent.trim()) + ")";
      a.dataset.ar = "1";
    });

    var fn = document.querySelector(".md-typeset .footnote");
    if (fn && !fn.dataset.ar) {
      var h = document.createElement("h2");
      h.id = "الهوامش";
      h.textContent = "الهوامش";
      fn.parentNode.insertBefore(h, fn);
      var notes = document.querySelector(".md-typeset .translator-notes");
      if (notes) fn.parentNode.insertBefore(notes, fn.nextSibling);
      fn.dataset.ar = "1";
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(fix);
  } else {
    document.addEventListener("DOMContentLoaded", fix);
  }
})();
