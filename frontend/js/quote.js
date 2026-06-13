const API_BASE_QUOTE = window.location.origin;

async function requestQuote() {
  const name    = document.getElementById('q-name').value.trim();
  const contact = document.getElementById('q-contact').value.trim();
  const pickup  = document.getElementById('q-pickup').value.trim();
  const delivery= document.getElementById('q-delivery').value.trim();
  const material= document.getElementById('q-material').value;
  const weight  = document.getElementById('q-weight').value;
  const vehicle = document.getElementById('q-vehicle').value;
  const date    = document.getElementById('q-date').value;
  const notes   = document.getElementById('q-notes').value.trim();

  if (!name)     { showToast('⚠️ Please enter your name'); return; }
  if (!contact)  { showToast('⚠️ Please enter your phone or email'); return; }
  if (!pickup)   { showToast('⚠️ Please enter pickup location'); return; }
  if (!delivery) { showToast('⚠️ Please enter delivery location'); return; }

  const btn = document.getElementById('requestQuoteBtn');
  btn.textContent = '⏳ Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE_QUOTE}/api/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact, pickup, delivery, material, weight, vehicle, date, notes }),
    });
    const json = await res.json();

    if (json.success) {
      showSuccessState({ name, contact, pickup, delivery, material, vehicle, date });
    } else {
      showToast('⚠️ ' + (json.error || 'Something went wrong. Please try WhatsApp.'));
    }
  } catch (err) {
    showToast('Network error. Please try WhatsApp or call us directly.');
  } finally {
    btn.textContent = '📩 Request My Quote';
    btn.disabled = false;
  }
}
window.requestQuote = requestQuote;

function showSuccessState(data) {
  document.getElementById('quoteFormWrap').style.display = 'none';
  const success = document.getElementById('quoteSuccess');
  success.classList.add('show');

  const badges = [
    { label: 'From',     value: data.pickup },
    { label: 'To',       value: data.delivery },
    { label: 'Material', value: data.material || 'General Goods' },
    { label: 'Vehicle',  value: data.vehicle  || 'To be advised' },
    { label: 'Date',     value: data.date     || 'Flexible' },
    { label: 'Contact',  value: data.contact },
  ];

  document.getElementById('quoteSuccessDetails').innerHTML = badges
    .filter(b => b.value)
    .map(b => `<div class="quote-success-badge"><strong>${b.label}</strong>${b.value}</div>`)
    .join('');
}

function resetQuoteForm() {
  ['q-name','q-contact','q-pickup','q-delivery','q-weight','q-notes'].forEach(id => {
    document.getElementById(id).value = '';
  });
  ['q-material','q-vehicle'].forEach(id => {
    document.getElementById(id).selectedIndex = 0;
  });
  document.getElementById('q-date').value = '';
  document.getElementById('quoteFormWrap').style.display = 'block';
  document.getElementById('quoteSuccess').classList.remove('show');
}
window.resetQuoteForm = resetQuoteForm;

document.getElementById('requestQuoteBtn').addEventListener('click', requestQuote);
