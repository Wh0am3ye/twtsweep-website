const langMap = {
  "/en/index.html": "/cy/index.html",
  "/en/services.html": "/cy/gwasanaethau.html",
  "/en/areas.html": "/cy/ardaloedd.html",
  "/en/faq.html": "/cy/cwestiynau-cyffredin.html",
  "/en/about.html": "/cy/amdana.html",
  "/en/booking.html": "/cy/bwcio.html",
  "/en/contact.html": "/cy/cysylltu.html",

  // reverse mapping
  "/cy/index.html": "/en/index.html",
  "/cy/gwasanaethau.html": "/en/services.html",
  "/cy/ardaloedd.html": "/en/areas.html",
  "/cy/cwestiynau-cyffredin.html": "/en/faq.html",
  "/cy/amdana.html": "/en/about.html",
  "/cy/bwcio.html": "/en/booking.html",
  "/cy/cysylltu.html": "/en/contact.html"
};

// Load components based on which language folder
function loadComponents() {
  getContactDetails();

  updateLangButton();
  setActiveNavLink();
}

window.addEventListener("resize", updateLangButton);

function setActiveNavLink() {
  let path = window.location.pathname;

  // Normalize trailing slash → index.html
  if (path.endsWith("/")) {
    path += "index.html";
  }
  path = path.replace(/\/+$/, "");
  if (!path.endsWith(".html")) {
    path += ".html";
  }

  document.querySelectorAll(".menu a").forEach(link => {
    let linkPath = link.pathname;
    if (linkPath.endsWith("/")) {
      linkPath += "index.html";
    }
    linkPath = linkPath.replace(/\/+$/, "");
    if (!linkPath.endsWith(".html")) {
      linkPath += ".html";
    }

    if (linkPath === path) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateLangButton() {
  const langBtn = document.querySelector(".lang-btn");
  if (!langBtn) return;

  let path = window.location.pathname;

  // Normalize trailing slash → index.html
  if (path.endsWith("/")) {
    path += "index.html";
  }

  // Remove relative weirdness (optional but safer)
  path = path.replace(/\/+$/, "");

  // Cloudflare Pages serves/redirects clean URLs without the .html
  // extension in production, so window.location.pathname won't match
  // the .html-keyed langMap unless we add it back here.
  if (!path.endsWith(".html")) {
    path += ".html";
  }

  // Set correct link
  if (langMap[path]) {
    langBtn.href = langMap[path];
  } else {
    // fallback
    if (path.includes("/en/")) {
      langBtn.href = "/cy/";
    } else {
      langBtn.href = "/en/";
    }
  }

  // Update button text
  const isEnglish = path.includes("/en/");
  const iconMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true" focusable="false"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C209.7 64 224 78.3 224 96L224 128L352 128C369.7 128 384 142.3 384 160C384 177.7 369.7 192 352 192L342.4 192L334 215.1C317.6 260.3 292.9 301.6 261.8 337.1C276 345.9 290.8 353.7 306.2 360.6L356.6 383L418.8 243C423.9 231.4 435.4 224 448 224C460.6 224 472.1 231.4 477.2 243L605.2 531C612.4 547.2 605.1 566.1 589 573.2C572.9 580.3 553.9 573.1 546.8 557L526.8 512L369.3 512L349.3 557C342.1 573.2 323.2 580.4 307.1 573.2C291 566 283.7 547.1 290.9 531L330.7 441.5L280.3 419.1C257.3 408.9 235.3 396.7 214.5 382.7C193.2 399.9 169.9 414.9 145 427.4L110.3 444.6C94.5 452.5 75.3 446.1 67.4 430.3C59.5 414.5 65.9 395.3 81.7 387.4L116.2 370.1C132.5 361.9 148 352.4 162.6 341.8C148.8 329.1 135.8 315.4 123.7 300.9L113.6 288.7C102.3 275.1 104.1 254.9 117.7 243.6C131.3 232.3 151.5 234.1 162.8 247.7L173 259.9C184.5 273.8 197.1 286.7 210.4 298.6C237.9 268.2 259.6 232.5 273.9 193.2L274.4 192L64.1 192C46.3 192 32 177.7 32 160C32 142.3 46.3 128 64 128L160 128L160 96C160 78.3 174.3 64 192 64zM448 334.8L397.7 448L498.3 448L448 334.8z"/></svg>`;
  const longLabel = isEnglish ? "Cymraeg" : "English";
  const shortLabel = isEnglish ? "CY" : "EN";

  langBtn.innerHTML = `${iconMarkup}<span class="lang-btn-label lang-btn-label--long">${longLabel}</span><span class="lang-btn-label lang-btn-label--short">${shortLabel}</span>`;
  langBtn.setAttribute("aria-label", isEnglish ? "Switch to Welsh" : "Switch to English");
  langBtn.setAttribute("title", isEnglish ? "Switch to Welsh" : "Switch to English");
}

// Load components when page is ready
document.addEventListener('DOMContentLoaded', loadComponents);

// Email parts (split to avoid scraping)
function getContactDetails() {
  const emailUser = "info";
  const emailDomain = "twtsweep.co.uk";
  const email = `${emailUser}@${emailDomain}`;
  const phone = "07793 101 565";
  const formattedPhone = formatPhone(phone);
  const whatsappNumber = "44" + phone.substring(1);

  // PHONE
  document.querySelectorAll("[data-phone]").forEach(el => {
    if (el.tagName === "A") {
      el.setAttribute("href", `tel:${phone}`);
    } else {
      el.innerHTML = `<a href="tel:${phone}">${formattedPhone}</a>`;
    }
  });

  // EMAIL
  document.querySelectorAll("[data-email]").forEach(el => {
    if (el.tagName === "A") {
      el.setAttribute("href", `mailto:${email}`);
    } else {
      el.innerHTML = `<a href="mailto:${email}">${email}</a>`;
    }
  });

  // WHATSAPP
  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    const link = `https://wa.me/${whatsappNumber}`;

    if (el.tagName === "A") {
      el.setAttribute("href", link);
    } else {
      el.innerHTML = `<a href="${link}" target="_blank">${formattedPhone}</a>`;
    }
  });
}

// Optional formatter
function formatPhone(num) {
  return num.replace(/(\d{5})(\d{3}) (\d{3})/, "$1 $2 $3");
}
