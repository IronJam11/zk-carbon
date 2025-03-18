import React, { useState, useEffect } from 'react';
import { Edit, AlertTriangle, Leaf, Users } from 'lucide-react';

export default function Dashboard() {
  const [electricityUsage, setElectricityUsage] = useState('');
  const [gasUsage, setGasUsage] = useState('');
  const [fuelUsage, setFuelUsage] = useState('');
  const [emissions, setEmissions] = useState({
    total: 125.5,
    credits: -25.0,
    net: 100.5
  });

  // State for organization data
  const [organization, setOrganization] = useState({
    address: '',
    reputation_score: '0',
    carbon_credits: '0',
    debt: '0',
    times_borrowed: 0,
    total_borrowed: '0',
    total_returned: '0',
    name: 'Loading...',
    emissions: '0'
  });

  // Fetch organization data from the backend
  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/singleorg');
        const data = await response.json();

        if (data.success) {
          setOrganization(data.organization);
        } else {
          console.error('Failed to fetch organization data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };

    fetchOrganizationData();
  }, []);

  const handleCalculate = () => {
    // In a real application, this would calculate actual emissions
    // based on the input values and conversion factors
    console.log('Calculating emissions...');
    // For demo purposes, we'll keep the displayed values
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white">
      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Organization Profile */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Organization Profile</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <Edit className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="relative mr-4">
              <img 
                src="/api/placeholder/60/60" 
                alt={organization.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{organization.name}</p>
              <p className="text-sm text-gray-500">Joined: Jan 2025</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Organization Name</label>
              <input 
                type="text" 
                value={organization.name} 
                readOnly 
                className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Reputation Score */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Reputation Score</h2>
          <div className="flex justify-center items-center h-44">
            <div className="relative">
              <svg className="w-36 h-36">
                <circle 
                  cx="70" 
                  cy="70" 
                  r="60" 
                  fill="none" 
                  stroke="#e6e6e6" 
                  strokeWidth="12" 
                />
                <circle 
                  cx="70" 
                  cy="70" 
                  r="60" 
                  fill="none" 
                  stroke="#4CAF50" 
                  strokeWidth="12" 
                  strokeDasharray="377" 
                  strokeDashoffset={377 - (parseInt(organization.reputation_score)) * 3.77} 
                  transform="rotate(-90 70 70)" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <span className="text-4xl font-bold text-gray-700">{organization.reputation_score}</span>
                <span className="text-sm text-gray-500">Excellent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Credits */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Carbon Credits</h2>
          <div className="space-y-4">
            <div className="bg-green-50 p-3 rounded-md flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Available Credits</p>
                <p className="font-semibold">
                  {organization.carbon_credits} tCO<sub>2</sub>e
                </p>
              </div>
              <div className="text-green-600">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Lent Credits</p>
                <p className="font-semibold">
                  {organization.total_borrowed} tCO<sub>2</sub>e
                </p>
              </div>
              <div className="text-blue-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            
            <div className="bg-red-50 p-3 rounded-md flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Credits in Debt</p>
                <p className="font-semibold text-red-600">
                  {organization.debt} tCO<sub>2</sub>e
                </p>
              </div>
              <div className="text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Emissions Calculator */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Monthly Emissions Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Electricity Usage (kWh)</label>
              <input 
                type="number" 
                value={electricityUsage}
                onChange={(e) => setElectricityUsage(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded"
                placeholder="Enter kWh"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Natural Gas Usage (therms)</label>
              <input 
                type="number" 
                value={gasUsage}
                onChange={(e) => setGasUsage(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded"
                placeholder="Enter therms"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Vehicle Fuel (gallons)</label>
              <input 
                type="number" 
                value={fuelUsage}
                onChange={(e) => setFuelUsage(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded"
                placeholder="Enter gallons"
              />
            </div>
            
            <button 
              onClick={handleCalculate}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded transition duration-200"
            >
              Calculate Emissions
            </button>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Net Emissions</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Emissions</span>
                <span className="font-medium">
                  {emissions.total} tCO<sub>2</sub>e
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Carbon Credits Applied</span>
                <span className="font-medium text-green-600">
                  {emissions.credits} tCO<sub>2</sub>e
                </span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Net Monthly Emissions</span>
                <span className="font-medium text-blue-600">
                  {emissions.net} tCO<sub>2</sub>e
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}