'use client';

import { useState } from 'react';
import RegistrationForm from './RegistrationForm';

export default function RegistrationSteps() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleStep = (stepNumber: number) => {
    setOpenStep(openStep === stepNumber ? null : stepNumber);
  };

  const openRegistrationForm = () => {
    setIsFormOpen(true);
  };

  const closeRegistrationForm = () => {
    setIsFormOpen(false);
  };

  const steps = [
    {
      id: 1,
      title: '📋 Note Course Details & Make Payment',
      icon: '💳',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-orange-700">Course Details</h3>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span><strong>Course Duration:</strong> 90-Hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span><strong>Starting Date:</strong> Pending</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span><strong>Location:</strong> NIELIT Patna</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span><strong>Payment Options:</strong> Credit/Debit Card, UPI, Net Banking</span>
              </li>
            </ul>
          </div>
          <p className="text-xs text-gray-600 italic">
            Note: Please save your payment confirmation for future reference.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: '💡 Follow Payment Instructions',
      icon: '📝',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">Step-by-Step Payment Guide</h3>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <ol className="space-y-2 text-gray-700 text-sm list-decimal list-inside">
              <li className="font-medium">
                Click on the payment link received via email
              </li>
              <li className="font-medium">
                Choose your preferred payment method (Card/UPI/Net Banking)
              </li>
              <li className="font-medium">
                Enter payment details and verify transaction
              </li>
              <li className="font-medium">
                Save the transaction ID and receipt
              </li>
              <li className="font-medium">
                Wait for payment confirmation email (within 24 hours)
              </li>
            </ol>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
            <p className="text-xs text-yellow-800">
              <strong>⚠️ Important:</strong> Do not close the payment window until you receive a confirmation message.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: '✅ Complete Registration Form',
      icon: '📄',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-orange-700">Final Step - Registration</h3>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-3 text-sm">
              Please fill out the registration form with your details.
              You will receive a payment link via email after submission.
            </p>
            <ul className="space-y-2 text-gray-700 mb-4 text-sm">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Full Name (as per documents)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Email Address (active email for communication)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Phone Number (with country code)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Course Selection</span>
              </li>
            </ul>
            <button
              onClick={openRegistrationForm}
              className="w-full px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700"
            >
              🚀 Open Registration Form
            </button>
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-3">
            <p className="text-xs text-orange-800">
              <strong>✨ Note:</strong> After submission, you'll receive an email with payment instructions within 5 minutes.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="registration-steps" className="py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Registration Steps
          </h2>
          <p className="text-base text-gray-600">
            Follow these simple steps to complete your registration
          </p>
        </div>

        {/* Accordion Steps */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleStep(step.id)}
                className={`w-full px-5 py-4 flex items-center justify-between transition-all duration-300 ${
                  openStep === step.id
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="text-base font-semibold text-left">{step.title}</span>
                </div>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openStep === step.id ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Accordion Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openStep === step.id
                    ? 'max-h-[1000px] opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="px-5 py-5 bg-gray-50 border-t border-gray-200">
                  {step.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-3 text-sm">Need help with registration?</p>
          <a
            href="mailto:iitk.applieddatascience@gmail.com"
            className="inline-block px-5 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm"
          >
            📞 Contact Support
          </a>
        </div>
      </div>

      {/* Registration Form Modal */}
      <RegistrationForm isOpen={isFormOpen} onClose={closeRegistrationForm} />
    </section>
  );
}
