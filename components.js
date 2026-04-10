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
        <a href="services.html">Services</a>
        <a href="areas.html">Areas</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="booking.html">Booking</a>
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
        <a href="gwasanaethau.html">Gwasanaethau</a>
        <a href="ardaloedd.html">Ardaloedd</a>
        <a href="amdana.html">Amdana</a>
        <a href="cysylltu.html">Cysylltu</a>
        <a href="bwcio.html">Bwcio</a>
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
        <a href="https://wa.me/4407793101565" target="_blank"><i class="fab fa-whatsapp"></i></a>
        <a href="tel:447793101565"><i class="fas fa-phone"></i></a>
        <a href="mailto:info@twtsweep.co.uk"><i class="fas fa-envelope"></i></a>
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
}

// Load components when page is ready
document.addEventListener('DOMContentLoaded', loadComponents);
