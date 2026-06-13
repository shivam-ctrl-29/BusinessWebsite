// Use the real logo file from assets
const LOGO = '/assets/logo.jpg';

// Inject logo into all placeholder images
document.querySelectorAll('[id$="-logo-img"]').forEach(img => {
  img.src = LOGO;
});
