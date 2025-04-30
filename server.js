const express = require('express');
const stripe = require('stripe')('your-stripe-secret-key'); // Replace with your Stripe Secret Key
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock Database
const domains = [
  { id: 1, name: 'example.com', price: 10 },
  { id: 2, name: 'testdomain.net', price: 15 },
];

// API to get domain list
app.get('/api/domains', (req, res) => {
  res.json(domains);
});

// API to purchase a domain
app.post('/api/purchase', async (req, res) => {
  const { domainId, paymentMethodId } = req.body;
  const domain = domains.find((d) => d.id === domainId);

  if (!domain) {
    return res.status(404).json({ error: 'Domain not found' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: domain.price * 100, // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Mock database update to mark domain as sold
    domain.sold = true;

    res.json({ success: true, domain });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});