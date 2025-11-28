'use client';

import Image from 'next/image';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: '💼',
      title: 'Industry-Relevant Skills',
      description: 'Master robotics, automation, IoT, and unmanned aerial systems',
    },
    {
      icon: '🛠️',
      title: 'Hands-On Experience',
      description: 'Work with real sensors, microcontrollers, drones, and hardware',
    },
    {
      icon: '💪',
      title: 'Technical Confidence',
      description: 'Design, build, and troubleshoot complex systems independently',
    },
    {
      icon: '🧩',
      title: 'Problem-Solving Skills',
      description: 'Develop critical thinking through practical challenges',
    },
    {
      icon: '📂',
      title: 'Portfolio Projects',
      description: 'Build impressive projects for academic and professional use',
    },
    {
      icon: '🚀',
      title: 'Career Opportunities',
      description: 'Excel in robotics, drones, mechatronics, automation, and STEM fields',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Benefits of the Program
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto mb-4"></div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Transform your future with comprehensive skills and real-world experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-orange-500"
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/2.jpg"
              alt="Benefits of Robotics Training Program"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-bold mb-1">Build Your Future</h3>
              <p className="text-sm text-gray-200">
                Gain skills that matter in today's tech-driven world
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1"></div>
            <div className="text-gray-600 font-medium text-sm"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1"></div>
            <div className="text-gray-600 font-medium text-sm"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1"></div>
            <div className="text-gray-600 font-medium text-sm"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1"></div>
            <div className="text-gray-600 font-medium text-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
