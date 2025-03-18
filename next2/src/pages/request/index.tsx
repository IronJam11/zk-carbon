import React from 'react';
import { Clock } from 'lucide-react';

interface CreditRequest {
  id: string;
  company: string;
  creditsRequested: number;
  zkProofStatus?: 'Verified';
  eligibilityScore?: number;
  requestDate?: string;
  yourScore?: number;
  status?: 'Pending' | 'Declined';
}

export default function CreditRequests() {
  const currentDate = new Date();
  const formattedDate = `Today, ${currentDate.getHours()}:${currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()}`;
  
  const incomingRequests: CreditRequest[] = [
    {
      id: '#ECO-2025-001',
      company: 'EcoTech Solutions',
      creditsRequested: 500,
      zkProofStatus: 'Verified',
      eligibilityScore: 85,
    },
    {
      id: '#GPI-2025-003',
      company: 'GreenPath Industries',
      creditsRequested: 750,
      zkProofStatus: 'Verified',
      eligibilityScore: 92,
    },
  ];

  const outgoingRequests: CreditRequest[] = [
    {
      id: '#CTG-2025-007',
      company: 'CarbonTech Global',
      creditsRequested: 1000,
      requestDate: 'Jan 15, 2025',
      yourScore: 88,
      status: 'Pending',
    },
    {
      id: '#ESS-2025-005',
      company: 'EcoSphere Solutions',
      creditsRequested: 300,
      requestDate: 'Jan 10, 2025',
      yourScore: 78,
      status: 'Declined',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Incoming Credit Requests</h1>
        <div className="flex items-center text-gray-500">
          <Clock className="w-5 h-5 mr-2" />
          <span>Last updated: {formattedDate}</span>
        </div>
      </div>

      {/* Incoming Requests */}
      <div className="space-y-6 mb-10">
        {incomingRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#E5EDFF" />
                    <path d="M8 9H16M8 13H14M8 17H12" stroke="#0052CC" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{request.company}</h2>
                  <p className="text-gray-500 text-sm">Request ID: {request.id}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">
                  Accept
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition">
                  Decline
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Credits Requested</p>
                <p className="font-semibold text-lg">{request.creditsRequested} CCU</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">ZK Proof Status</p>
                <p className="font-semibold text-lg text-emerald-500">{request.zkProofStatus}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Eligibility Score</p>
                <p className="font-semibold text-lg">{request.eligibilityScore}/100</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Outgoing Requests Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Outgoing Requests</h1>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition flex items-center">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6L12 18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New Request
        </button>
      </div>

      {/* Outgoing Requests */}
      <div className="space-y-6">
        {outgoingRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#FFF8E5" />
                    <path d="M8 9H16M8 13H14M8 17H12" stroke="#996A13" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{request.company}</h2>
                  <p className="text-gray-500 text-sm">Request ID: {request.id}</p>
                </div>
              </div>
              {request.status === 'Pending' && (
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-sm">
                  Pending
                </span>
              )}
              {request.status === 'Declined' && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm">
                  Declined
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Credits Requested</p>
                <p className="font-semibold text-lg">{request.creditsRequested} CCU</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Request Date</p>
                <p className="font-semibold text-lg">{request.requestDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Your Score</p>
                <p className="font-semibold text-lg">{request.yourScore}/100</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}