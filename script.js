// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Simple form handler (no actual email sending)
const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  statusMessage.textContent = 'Thank you for your message! I will get back to you soon.';
  statusMessage.classList.remove('hidden');
  contactForm.reset();
});
