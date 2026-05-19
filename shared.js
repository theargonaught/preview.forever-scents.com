// shared.js — injects nav and footer, highlights active nav link
(function () {
  const pages = [
    { href: 'index.html',       label: 'Home' },
    { href: 'order-online.html',label: 'Order Online' },
    { href: 'why-buy-soy.html', label: 'Why Soy?' },
    { href: 'faq.html',         label: 'FAQ' },
    { href: 'safety-tips.html', label: 'Safety Tips' },
    { href: 'breads.html',      label: 'Breads' },
    { href: 'contact-us.html',  label: 'Contact Us' },
  ];

  const current = window.location.pathname.split('/').pop() || 'index.html';

  const regularPages = pages.filter(p => p.href !== 'order-online.html');
  const shopPage     = pages.find(p  => p.href === 'order-online.html');

  const navLinks = [
    ...regularPages.map(p => {
      const isActive = p.href === current;
      return `<li><a href="${p.href}" class="${isActive ? 'active' : ''}">${p.label}</a></li>`;
    }),
    `<li class="nav-spacer" aria-hidden="true"></li>`,
    `<li><a href="${shopPage.href}" class="nav-cta${current === shopPage.href ? ' active' : ''}">${shopPage.label}</a></li>`,
  ].join('');

  const drawerLinks = pages.map(p =>
    `<a href="${p.href}" class="${p.href === 'order-online.html' ? 'drawer-cta' : ''}">${p.label}</a>`
  ).join('');

  const navHTML = `
  <nav class="site-nav" role="navigation" aria-label="Main navigation">
    <a href="index.html" class="nav-logo" aria-label="Forever Scents Home">
      <img src="logo.jpg" alt="Forever Scents">
    </a>
    <ul class="nav-links">${navLinks}</ul>
    <button class="hamburger" aria-label="Open menu" aria-expanded="false" onclick="toggleDrawer(this)">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-drawer" id="mobileDrawer" role="navigation" aria-label="Mobile navigation">
    ${drawerLinks}
  </div>`;

  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-logo"><img src="logo.jpg" alt="Forever Scents"></div>
        <p class="footer-tagline">Handmade soy candles, wax melts &amp; fresh baked breads crafted in Ottawa, Illinois.<br>Small batch, big heart.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="order-online.html">Order Online</a></li>
          <li><a href="why-buy-soy.html">Why Buy Soy?</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="safety-tips.html">Safety Tips</a></li>
          <li><a href="breads.html">Fresh Breads</a></li>
          <li><a href="contact-us.html">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Get In Touch</h4>
        <p>Custom orders &amp; questions always welcome.</p><br>
        <a href="mailto:foreverscents2010@gmail.com" class="email-link">foreverscents2010@gmail.com</a>
        <br><br>
        <p style="font-size:0.78rem;opacity:0.6;">Ottawa, Illinois<br>Find us at the Ottawa Farmer's Market</p>
      </div>
    </div>
  </footer>
  <div class="footer-bar">© 2025 Forever Scents™ LLC &nbsp;·&nbsp; All rights reserved &nbsp;·&nbsp; Ottawa, Illinois</div>`;

  // Inject nav before body content, footer at end
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Hamburger toggle
  window.toggleDrawer = function (btn) {
    const drawer = document.getElementById('mobileDrawer');
    const open = drawer.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  };

  // Close drawer on link click
  document.querySelectorAll('.mobile-drawer a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobileDrawer').classList.remove('open');
    });
  });

  // Accordion support
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const isOpen = body.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.accordion-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        body.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
