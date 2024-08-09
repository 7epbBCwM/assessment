import React, { useState, useEffect } from 'react'
import aetnaLogo from '/src/assets/aetna-logo.png';
import cignaLogo from '/src/assets/cigna-logo.png';
import medicaidLogo from '/src/assets/medicaid-logo.png';
import medicareLogo from '/src/assets/medicare-logo.png';


import './LandingPage.css';

const plans = {
  Aetna: { cost: 50, logo: aetnaLogo },
  Cigna: { cost: 100, logo: cignaLogo },
  Medicaid: { cost: 500, logo: medicaidLogo },
  Medicare: { cost: 500, logo: medicareLogo }
};

const LandingPage = () => {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [providerType, setProviderType] = useState('Group');
  const [providerCount, setProviderCount] = useState(1);
  const [estimatedCost, setEstimatedCost] = useState(0);

  useEffect(() => {
    const totalCost = selectedPlans.reduce((sum, plan) => sum + plans[plan].cost, 0) * providerCount;
    setEstimatedCost(totalCost);
  }, [selectedPlans, providerCount]);

  const handlePlanChange = (plan) => {
    setSelectedPlans(prev =>
      prev.includes(plan) ? prev.filter(p => p !== plan) : [...prev, plan]
    );
  };

  const handleProviderCountChange = (event) => {
    const count = Math.max(1, parseInt(event.target.value, 10));
    setProviderCount(count);
  };

  return (
    <div className="landing-page">
      <h1>Select Your Plan</h1>
      <div className="plans">
        {Object.keys(plans).map((plan) => (
          <label key={plan} className={`plan ${selectedPlans.includes(plan) ? 'selected' : ''}`}>
            <input
              type="checkbox"
              value={plan}
              onChange={() => handlePlanChange(plan)}
            />
            <img src={plans[plan].logo} alt={`${plan} Logo`} />
            {plan}
          </label>
        ))}
      </div>

      <div className="provider-type">
        <label>
          <input
            type="radio"
            value="Group"
            checked={providerType === 'Group'}
            onChange={() => setProviderType('Group')}
          />
          Group
        </label>
        <label>
          <input
            type="radio"
            value="Solo"
            checked={providerType === 'Solo'}
            onChange={() => setProviderType('Solo')}
          />
          Solo
        </label>
      </div>

      <div className="provider-count">
        <label>Number of Providers:</label>
        <input
          type="number"
          value={providerCount}
          onChange={handleProviderCountChange}
          min="1"
        />
      </div>

      <div className="estimated-cost">
        <h2>Estimated Cost: <span className="cost-value">${estimatedCost}</span></h2>
      </div>
    </div>
  );
};

export default LandingPage;
