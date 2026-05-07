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
  if (path.includes("/en/")) {
    langBtn.textContent = "Cymraeg";
  } else {
    langBtn.textContent = "English";
  }
}

// Load components when page is ready
document.addEventListener('DOMContentLoaded', loadComponents);

// Email parts (split to avoid scraping)
function getContactDetails() {
  const emailUser = "info";
  const emailDomain = "twtsweep.co.uk";
  const email = `${emailUser}@${emailDomain}`;
  const phone = "07793101565";
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
