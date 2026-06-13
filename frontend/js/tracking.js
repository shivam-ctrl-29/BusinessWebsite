const API_BASE = window.location.origin;

async function trackShipment() {
  const input = document.getElementById('trackInput').value.trim();
  if (!input) { showToast('Please enter a tracking number'); return; }

  const btn = document.getElementById('trackBtn');
  btn.textContent = '⏳ Tracking...';
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/api/track/${encodeURIComponent(input)}`);
    const json = await res.json();

    if (!json.success) {
      showToast('⚠️ ' + json.error);
      return;
    }

    const { trackingId, status, route, eta, steps } = json.data;

    document.getElementById('trackId').textContent = trackingId;
    document.getElementById('trackStatus').textContent = status;
    document.getElementById('trackRoute').textContent = route;
    document.getElementById('trackEta').textContent = eta;

    document.getElementById('trackTimeline').innerHTML = steps.map(s => `
      <div class="timeline-item">
        <div class="timeline-dot ${s.done ? 'done' : ''} ${s.active ? 'active' : ''}">${s.done ? '✓' : '○'}</div>
        <div class="timeline-text">
          <h4 style="color:${s.done ? 'var(--text)' : 'var(--text-light)'}">${s.label}</h4>
          <p>${s.desc}</p>
        </div>
      </div>
    `).join('');

    document.getElementById('trackResult').classList.add('show');
    showToast('Shipment found! ' + status);
  } catch (err) {
    showToast('Network error. Please try again.');
  } finally {
    btn.textContent = '🔍 Track';
    btn.disabled = false;
  }
}
window.trackShipment = trackShipment;

document.getElementById('trackBtn').addEventListener('click', trackShipment);
document.getElementById('trackInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') trackShipment();
});
