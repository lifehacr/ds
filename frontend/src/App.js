import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('your-stripe-publishable-key'); // Replace with your Stripe Publishable Key

function App() {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    fetch('/api/domains')
      .then((res) => res.json())
      .then((data) => setDomains(data));
  }, []);

  return (
    <div>
      <h1>Domain Selling Platform</h1>
      <ul>
        {domains.map((domain) => (
          <li key={domain.id}>
            {domain.name} - ${domain.price}
            <button onClick={() => setSelectedDomain(domain)}>Buy</button>
          </li>
        ))}
      </ul>
      {selectedDomain && (
        <Elements stripe={stripePromise}>
          <CheckoutForm domain={selectedDomain} />
        </Elements>
      )}
    </div>
  );
}

export default App;
