document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 950);
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => mainNav.classList.remove("open"));
    });
  }

  const progress = document.getElementById("progress");
  const updateProgress = () => {
    if (!progress) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});

  document.querySelectorAll("section, .info-card, .ethic-card, .evidence-card, .timeline-item, .member-card").forEach(el => {
    el.classList.add("scroll-reveal");
    observer.observe(el);
  });

  const style = document.createElement("style");
  style.textContent = `.scroll-reveal{opacity:0;transform:translateY(25px);transition:opacity .75s ease,transform .75s ease}.scroll-reveal.in-view{opacity:1;transform:none}`;
  document.head.appendChild(style);

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const content = lightbox.querySelector(".lightbox-content");
    document.querySelectorAll(".photo-placeholder, .real-evidence > img, .section-photo-feature > img").forEach(card => {
      card.addEventListener("click", () => {
        if (card.tagName === "IMG") {
          content.innerHTML = `<img src="${card.src}" alt="${card.alt || "Fotografía de evidencia"}">`;
        } else {
          content.innerHTML = card.outerHTML;
        }
        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });
    const close = () => {
      lightbox.classList.remove("show");
      lightbox.setAttribute("aria-hidden", "true");
    };
    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
        history.replaceState(null, "", link.getAttribute("href"));
      }
    });
  });
});
