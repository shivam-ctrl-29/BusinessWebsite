// Escapes HTML special characters so user input can never break out of the
// email template or inject markup/scripts into the rendered email.
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Strips characters that could be used for SMTP/email header injection
// (CR/LF) if a field is ever used in a header (subject, from, etc.).
function sanitizeHeaderValue(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[\r\n]+/g, ' ').trim();
}

function truncate(str, max) {
  if (!str) return str;
  return String(str).slice(0, max);
}

module.exports = { escapeHtml, sanitizeHeaderValue, truncate };
