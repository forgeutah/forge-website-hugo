/* =====================================================================
   Forge Utah · interactions
   Replaces the design prototype's DCLogic runtime with vanilla JS:
   community dropdown, mobile menu, and the interactive hero door.
   No dependencies. Safe to run on any page (guards for absent elements).
   ===================================================================== */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* ---------- Community dropdown (ARIA menu-button) ---------- */
    var dropToggle = document.querySelector("[data-fu-dropdown-toggle]");
    var dropMenu = document.querySelector("[data-fu-dropdown-menu]");
    if (dropToggle && dropMenu) {
      var items = function () { return Array.prototype.slice.call(dropMenu.querySelectorAll("a")); };
      var openDrop = function () {
        dropMenu.hidden = false;
        dropToggle.setAttribute("aria-expanded", "true");
        var first = items()[0];
        if (first) first.focus();
      };
      var closeDrop = function (returnFocus) {
        dropMenu.hidden = true;
        dropToggle.setAttribute("aria-expanded", "false");
        if (returnFocus) dropToggle.focus();
      };
      dropToggle.addEventListener("click", function (e) {
        e.preventDefault();
        if (dropMenu.hidden) openDrop(); else closeDrop(false);
      });
      dropMenu.addEventListener("keydown", function (e) {
        var list = items();
        var idx = list.indexOf(document.activeElement);
        if (e.key === "ArrowDown") { e.preventDefault(); (list[idx + 1] || list[0]).focus(); }
        else if (e.key === "ArrowUp") { e.preventDefault(); (list[idx - 1] || list[list.length - 1]).focus(); }
        else if (e.key === "Escape") { e.preventDefault(); closeDrop(true); }
      });
      dropToggle.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeDrop(false);
      });
      document.addEventListener("click", function (e) {
        if (!dropMenu.hidden && !dropMenu.contains(e.target) && e.target !== dropToggle && !dropToggle.contains(e.target)) {
          closeDrop(false);
        }
      });
    }

    /* ---------- Mobile menu ---------- */
    var menuBtn = document.querySelector("[data-fu-menu-toggle]");
    var menuPanel = document.querySelector("[data-fu-menu-panel]");
    if (menuBtn && menuPanel) {
      var menuLabel = menuBtn.querySelector("[data-fu-menu-label]") || menuBtn;
      menuBtn.addEventListener("click", function () {
        var open = menuPanel.hidden;
        menuPanel.hidden = !open;
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
        menuLabel.textContent = open ? "close" : "menu";
      });
    }

    /* ---------- Interactive hero (clubhouse door) ---------- */
    var stage = document.querySelector("[data-fu-hero]");
    if (stage) {
      var door = stage.querySelector("[data-fu-hero-enter]");
      var back = stage.querySelector("[data-fu-hero-exit]");
      if (door) door.addEventListener("click", function () { stage.classList.add("is-inside"); if (back) back.focus(); });
      if (back) back.addEventListener("click", function () { stage.classList.remove("is-inside"); if (door) door.focus(); });
    }
  });
})();
