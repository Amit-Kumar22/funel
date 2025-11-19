'use client';

import Image from 'next/image';

export default function ModulesSection() {
  const roboticsModules = [
    {
      number: 'Module 1',
      title: 'Introduction to Robotics',
      description: 'Fundamentals and applications of robotics',
    },
    {
      number: 'Module 2',
      title: 'Electronics & Circuit Design',
      description: 'Learn circuit design and electronic components',
    },
    {
      number: 'Module 3',
      title: 'Microcontrollers',
      description: 'Programming and interfacing microcontrollers',
    },
    {
      number: 'Module 4',
      title: 'Sensors',
      description: 'Understanding and working with various sensors',
    },
    {
      number: 'Module 5',
      title: 'Wireless Communication',
      description: 'Bluetooth, WiFi, and IoT integration',
    },
    {
      number: 'Module 6',
      title: 'Advanced Robotics',
      description: 'Complex robotic systems and AI integration',
    },
    {
      number: 'Module 7',
      title: 'Mechanical Design',
      description: 'Robot structure and mechanical components',
    },
    {
      number: 'Module 8',
      title: 'Final Project',
      description: 'Build your complete robotics system',
    },
  ];

  const droneModules = [
    {
      number: 'Module 9',
      title: 'Introduction to Drone Technology',
      description: 'Drone basics and applications',
    },
    {
      number: 'Module 10',
      title: 'Drone Rules & Regulations',
      description: 'Legal compliance and safety protocols',
    },
    {
      number: 'Module 11',
      title: 'Basic Principles of Flight',
      description: 'Aerodynamics and flight mechanics',
    },
    {
      number: 'Module 12',
      title: 'Assembly & Calibration',
      description: 'Building and configuring drones',
    },
    {
      number: 'Module 13',
      title: 'Flight Simulator',
      description: 'Practice flying in virtual environment',
    },
    {
      number: 'Module 14',
      title: 'Outdoor Flying',
      description: 'Real-world flying experience',
    },
  ];

  const scrollToRegistration = () => {
    const element = document.getElementById('registration-steps');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Course Curriculum
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto mb-4"></div>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Comprehensive training modules designed by industry experts
          </p>
        </div>

        {/* Robotics Modules */}
        <div className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Robotics Image */}
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/3.JPG"
                alt="Robotics Training Program"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold mb-1">Robotics Program</h3>
                <p className="text-sm text-gray-200">
                  8 comprehensive modules covering all aspects of robotics
                </p>
              </div>
            </div>

            {/* Robotics Modules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roboticsModules.map((module, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg border-l-4 border-orange-500 hover:bg-gray-750 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="text-orange-500 font-bold text-xs mb-1">
                    {module.number}
                  </div>
                  <h4 className="text-sm font-bold mb-1">{module.title}</h4>
                  <p className="text-gray-400 text-xs">{module.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drone Modules */}
        <div className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Drone Modules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 order-2 lg:order-1">
              {droneModules.map((module, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg border-l-4 border-amber-500 hover:bg-gray-750 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="text-amber-500 font-bold text-xs mb-1">
                    {module.number}
                  </div>
                  <h4 className="text-sm font-bold mb-1">{module.title}</h4>
                  <p className="text-gray-400 text-xs">{module.description}</p>
                </div>
              ))}
            </div>

            {/* Drone Image */}
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl order-1 lg:order-2">
              <Image
                src="/4.jpg"
                alt="Drone Training Program"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold mb-1">Drone Program</h3>
                <p className="text-sm text-gray-200">
                  6 specialized modules for mastering drone technology
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-bold mb-2">
              Ready to Start Your Journey?
            </h3>
            <p className="text-base mb-4 text-white/90">
              Join thousands of students mastering robotics and drone technology
            </p>
            <button
              onClick={scrollToRegistration}
              className="bg-white text-orange-600 font-bold py-2 px-6 rounded-full text-sm hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
