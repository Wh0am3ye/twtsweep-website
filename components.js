// Header and Footer Components
const headerEN = `
  <header>
    <nav>
      <img src="../images/logo.webp" alt="TWTSweep Logo" class="logo">
      <div class="nav-right">
        <a href="../cy/cartref.html" class="lang-btn">Cymraeg</a>
        <div class="toggle">☰</div>
      </div>
      <div class="menu">
        <div class="close">×</div>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="areas.html">Areas</a>
        <a href="services.html">Services</a>
        <a href="booking.html">Booking</a>
        <a href="contact.html">Contact</a>
        
      </div>
    </nav>
  </header>
`;

const headerCY = `
  <header>
    <nav>
      <img src="../images/logo.webp" alt="TWTSweep Logo" class="logo">
      <div class="nav-right">
        <a href="../en/index.html" class="lang-btn">English</a>
        <div class="toggle">☰</div>
      </div>
      <div class="menu">
        <div class="close">×</div>
        <a href="cartref.html">Cartref</a>
        <a href="amdana.html">Amdana</a>
        <a href="ardaloedd.html">Ardaloedd</a>
        <a href="gwasanaethau.html">Gwasanaethau</a>
        <a href="bwcio.html">Bwcio</a>
        <a href="cysylltu.html">Cysylltu</a>
      </div>
    </nav>
  </header>
`;

const footer = `
  <footer>
    <div class="footer-content">
      <div class="social-links">
        <a href="https://facebook.com/twtsweep" target="_blank"><i class="fab fa-facebook"></i></a>
        <a href="https://instagram.com/twtsweep" target="_blank"><i class="fab fa-instagram"></i></a>
        <a data-whatsapp href="#" target="_blank"><i class="fab fa-whatsapp"></i></a>
        <a data-phone href="#"><i class="fas fa-phone"></i></a>
        <a data-email href="#"><i class="fas fa-envelope"></i></a>
      </div>
      <p>© TWTSweep</p>
    </div>
  </footer>
`;

// Load components based on which language folder
function loadComponents() {
  // Detect if we're in en/ or cy/ folder by checking the current page path
  const isEnglish = window.location.pathname.includes('/en/');
  
  // Replace header placeholder
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = isEnglish ? headerEN : headerCY;
  }
  
  // Replace footer placeholder
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footer;
  }

  getContactDetails();
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
