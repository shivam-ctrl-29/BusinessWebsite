const serviceData = {
  ftl: {
    title: 'Full Truck Load (FTL) 🚛',
    desc: 'Dedicated truck for your entire cargo consignment. Ideal for large shipments requiring maximum security, faster transit times, and cost efficiency.',
    benefits: ['Faster transit times', 'Direct point-to-point delivery', 'Reduced handling & damage risk', 'Full vehicle monitoring via GPS', 'Cost-effective for large volumes'],
    industries: 'Manufacturing, Retail, FMCG, E-Commerce',
  },
  ptl: {
    title: 'Part Truck Load (PTL) 📦',
    desc: 'Pay only for the space your cargo occupies. Your shipment is consolidated with other compatible cargo for efficient transportation across our hub network.',
    benefits: ['Cost-effective for smaller loads', 'Pan India hub network', 'Regular scheduled departures', 'Real-time tracking', 'Door-to-door service'],
    industries: 'SME, E-Commerce, Retail, FMCG',
  },
  express: {
    title: 'Express Cargo ⚡',
    desc: 'Time-critical shipments handled with priority. Our express network ensures fastest possible delivery with dedicated handling and expedited routing.',
    benefits: ['24-48 hour metro delivery', 'Priority handling', 'Dedicated express routes', 'Real-time SMS updates', 'SLA-backed delivery guarantee'],
    industries: 'Pharmaceuticals, Electronics, Banking, Fashion',
  },
  fleet: {
    title: 'Dedicated Fleet 🚚',
    desc: 'Exclusive fleet assignment for your business operations. Vehicles, drivers, and routes managed entirely as per your business requirements.',
    benefits: ['Exclusive vehicle use', 'Customized schedule & routes', 'Dedicated driver assignment', 'White-labeling available', 'Monthly SLA reporting'],
    industries: 'FMCG, Automotive, Manufacturing',
  },
  container: {
    title: 'Container Transport 🏗️',
    desc: 'ISO-certified container transportation for domestic cargo requiring weatherproof, tamper-evident, and secure movement across India.',
    benefits: ['ISO certified containers', 'Weatherproof cargo protection', 'Tamper-evident sealing', 'Port-to-warehouse connectivity', 'Import/export support'],
    industries: 'Exports, Chemicals, Electronics, Industrial',
  },
  heavy: {
    title: 'Heavy Equipment Transport ⚙️',
    desc: 'Specialized ODC (Over-Dimensional Cargo) transportation with necessary permits, police escorts, route surveys, and custom engineered trailers.',
    benefits: ['All India ODC permits', 'Route survey & planning', 'Police escort arrangement', 'Hydraulic multi-axle trailers', 'Project logistics expertise'],
    industries: 'Construction, Mining, Power, Infrastructure',
  },
  cold: {
    title: 'Temperature Controlled ❄️',
    desc: 'Refrigerated and cold-chain logistics maintaining precise temperature ranges from -20°C to +20°C with IoT-based continuous monitoring.',
    benefits: ['Real-time temp monitoring', '-20°C to +20°C range', 'FSSAI & GDP compliant', 'Alert system for deviations', 'End-to-end cold chain'],
    industries: 'Pharmaceuticals, Food & Beverage, Dairy, Horticulture',
  },
  lastmile: {
    title: 'Last Mile Delivery 🏠',
    desc: 'Efficient, technology-driven delivery to end customers. Complete with electronic proof of delivery, customer notifications, and return management.',
    benefits: ['GPS-tracked delivery agents', 'ePOD (Electronic POD)', 'Customer delivery SMS alerts', 'Failed delivery re-attempt', 'Returns & RTO management'],
    industries: 'E-Commerce, Retail, D2C Brands, Quick Commerce',
  },
};

function showServiceModal(key) {
  const s = serviceData[key];
  document.getElementById('modalTitle').textContent = s.title;
  document.getElementById('modalContent').innerHTML = `
    <p style="color:var(--text-light);font-size:.95rem;line-height:1.7;margin-bottom:20px;">${s.desc}</p>
    <h4 style="font-weight:700;margin-bottom:12px;color:var(--text);font-size:.95rem;">Key Benefits</h4>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">
      ${s.benefits.map(b => `<li style="display:flex;gap:8px;align-items:flex-start;font-size:.875rem;color:var(--text-light);"><span style="color:var(--orange);margin-top:1px;">✓</span>${b}</li>`).join('')}
    </ul>
    <div style="background:var(--light-gray);border-radius:10px;padding:14px 16px;margin-bottom:24px;">
      <span style="font-size:.8rem;font-weight:600;color:var(--text-light);text-transform:uppercase;letter-spacing:.5px;">Industries: </span>
      <span style="font-size:.875rem;color:var(--text);font-weight:500;">${s.industries}</span>
    </div>
    <button class="btn-primary" onclick="closeModal();document.getElementById('quote').scrollIntoView({behavior:'smooth'})" style="width:100%;justify-content:center;">Get Quote for This Service →</button>
  `;
  document.getElementById('serviceModal').classList.add('show');
}
window.showServiceModal = showServiceModal;

function closeModal() {
  document.getElementById('serviceModal').classList.remove('show');
}
window.closeModal = closeModal;

document.getElementById('serviceModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
