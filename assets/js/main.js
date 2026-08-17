/* MINDATHON ACADEMY — site interactions (vanilla, no dependencies) */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- header scroll state ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- active nav state ---------- */
  document.querySelectorAll(".nav-link[data-active]").forEach(function (link) {
    if (link.dataset.active === document.body.dataset.page) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduced) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          cio.unobserve(el);
          var target = parseInt(el.dataset.count, 10) || 0;
          var dur = 1100;
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- gallery filter ---------- */
  var chips = document.querySelectorAll(".filter-chip");
  var items = document.querySelectorAll(".gallery-item");
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        var f = chip.dataset.filter;
        items.forEach(function (it) {
          var show = f === "all" || it.dataset.category === f;
          it.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".caption");
    var photos = Array.prototype.slice.call(
      document.querySelectorAll(".gallery-item img")
    );
    var idx = 0;

    function openAt(i) {
      idx = i;
      show();
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lb-close").focus();
    }

    function show() {
      var img = photos[idx];
      if (!img) return;
      lbImg.src = img.getAttribute("data-full") || img.src;
      lbImg.alt = img.alt;
      var cap = img.closest(".gallery-item");
      lbCap.textContent = cap ? cap.querySelector("figcaption").textContent : "";
    }

    document.querySelectorAll(".gallery-item").forEach(function (item, i) {
      if (item.classList.contains("placeholder-gallery-item")) return;
      item.addEventListener("click", function () { openAt(i); });
    });

    function close() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (photos[idx]) photos[idx].focus();
    }

    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function () {
      idx = (idx - 1 + photos.length) % photos.length;
      show();
    });
    lb.querySelector(".lb-next").addEventListener("click", function () {
      idx = (idx + 1) % photos.length;
      show();
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") { idx = (idx - 1 + photos.length) % photos.length; show(); }
      if (e.key === "ArrowRight") { idx = (idx + 1) % photos.length; show(); }
    });
  }

  /* ---------- contact form → WhatsApp ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [
        "New Mindathon enquiry:",
        "",
        "Name: " + (data.get("name") || "-"),
        "Email: " + (data.get("email") || "-"),
        "Phone: " + (data.get("phone") || "-"),
        "Reason: " + (data.get("reason") || "-"),
        "",
        "Message: " + (data.get("message") || "-"),
      ];
      var url =
        "https://wa.me/60177664345?text=" +
        encodeURIComponent(lines.join("\n"));
      var success = document.getElementById("form-success");
      if (success) success.classList.add("show");
      window.open(url, "_blank", "noopener");
      form.reset();
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("footer-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();