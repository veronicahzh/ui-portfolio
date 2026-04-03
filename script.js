/**
 * UI Portfolio – interactivity
 *
 * Features:
 *  1. Category filter – show/hide project cards
 *  2. Image lightbox – enlarge project screenshots
 *  3. Smooth active-state management for filter buttons
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     0. Preloader
  ------------------------------------------------------------------ */
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    
    if (preloader) {
      // Phase: Fade out
      setTimeout(() => {
        preloader.classList.add("preloader--hidden");
        document.body.classList.add("loaded"); // Trigger content reveal animations
      }, 3000); 
    }
  });

  /* ------------------------------------------------------------------
     1. Category Filter
  ------------------------------------------------------------------ */
  const filterBar = document.querySelector(".filter-bar__inner");
  const cards = /** @type {NodeListOf<HTMLElement>} */ (
    document.querySelectorAll(".project-card")
  );

  if (filterBar) {
    filterBar.addEventListener("click", function (e) {
      const btn = /** @type {HTMLElement} */ (
        e.target.closest(".filter-btn")
      );
      if (!btn) return;

      // Update active state
      filterBar
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const match =
          filter === "all" || card.dataset.category === filter;
        if (match) {
          card.removeAttribute("hidden");
        } else {
          card.setAttribute("hidden", "");
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     2. Lightbox
  ------------------------------------------------------------------ */
  const lightbox = /** @type {HTMLElement} */ (
    document.getElementById("lightbox")
  );
  const lightboxImg = /** @type {HTMLImageElement} */ (
    document.getElementById("lightboxImg")
  );
  const lightboxClose = document.getElementById("lightboxClose");

  /** @param {string} src @param {string} alt */
  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.removeAttribute("hidden");
    lightbox.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.setAttribute("hidden", "");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    document.body.style.overflow = "";
  }

  // Delegate click to all overlay buttons
  document.addEventListener("click", function (e) {
    const btn = /** @type {HTMLElement} */ (
      e.target.closest(".overlay-btn")
    );
    if (!btn) return;
    openLightbox(btn.dataset.img || "", btn.dataset.alt || "");
  });

  // Close button
  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  // Click outside the image to close
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard: Escape to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && !lightbox.hasAttribute("hidden")) {
      closeLightbox();
    }
  });
})();
