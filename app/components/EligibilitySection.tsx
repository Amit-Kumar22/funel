'use client';

import Image from 'next/image';

export default function EligibilitySection() {
  const eligibilityCriteria = [
    {
      icon: '🎓',
      title: 'Students',
      description: 'School/College/Technical students interested in robotics and unmanned systems',
    },
    {
      icon: '👨‍🏫',
      title: 'Educators & Professionals',
      description: 'Trainers and professionals looking to upgrade their technical skills',
    },
    {
      icon: '🚀',
      title: 'Beginners Welcome',
      description: 'No prior robotics or drone experience required—just basic interest!',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Eligibility & Requirements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto mb-4"></div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Who can join our comprehensive robotics and drone technology program
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative h-[300px] lg:h-[350px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/1.jpg"
              alt="Robotics and Drone Technology Training"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            {eligibilityCriteria.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-orange-500"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-5 rounded-lg text-white mt-6">
              <h4 className="text-lg font-bold mb-1">Ready to Start?</h4>
              <p className="text-orange-100 mb-3 text-sm">
                Join hundreds of learners already transforming their careers with our program
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById('registration-steps');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-orange-600 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-sm"
              >
                Enroll Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
