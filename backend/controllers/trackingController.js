// Simulated tracking data — replace with real DB queries when ready
const statuses = ['In Transit', 'At Hub', 'Out For Delivery', 'Delivered'];
const routes = ['Mumbai → Delhi', 'Pune → Bangalore', 'Chennai → Hyderabad', 'Mumbai → Kolkata'];
const etas = ['Tomorrow', 'In 2 Days', 'Today by 6 PM', 'Delivered'];

function trackShipment(req, res) {
  const { id } = req.params;

  if (!id || id.length < 5) {
    return res.status(400).json({ success: false, error: 'Invalid tracking number' });
  }

  // Deterministic "random" based on tracking ID so same ID gives same result
  const seed = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const idx = seed % statuses.length;

  const steps = [
    { label: 'Booked',            desc: 'Shipment booked & pickup scheduled',  done: true,       active: false },
    { label: 'Picked Up',         desc: 'Cargo collected from origin',          done: idx >= 1,   active: false },
    { label: 'In Transit',        desc: 'Moving through logistics network',     done: idx >= 1,   active: idx === 1 },
    { label: 'At Hub',            desc: 'Arrived at sorting hub',              done: idx >= 2,   active: idx === 2 },
    { label: 'Out For Delivery',  desc: 'With delivery agent',                 done: idx >= 3,   active: idx === 3 },
    { label: 'Delivered',         desc: 'Successfully delivered',              done: idx >= 3,   active: false },
  ];

  res.json({
    success: true,
    data: {
      trackingId: id.toUpperCase(),
      status:     statuses[idx],
      route:      routes[idx],
      eta:        etas[idx],
      steps,
    },
  });
}

module.exports = { trackShipment };
