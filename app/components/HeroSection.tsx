'use client';

export default function HeroSection() {
  const scrollToRegistration = () => {
    const element = document.getElementById('registration-steps');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-[70vh] md:h-[75vh] flex items-center bg-white"
      style={{
        boxShadow: '0 12px 30px -8px rgba(251, 191, 36, 0.6), 0 6px 16px -2px rgba(251, 191, 36, 0.5), 0 2px 8px rgba(251, 191, 36, 0.3)'
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          
          {/* Left Side - Content */}
          <div className="text-left">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
             90 Hours Certification course Robotics & Drone Technology NIELIT Patna Center
              <span className="block text-2xl sm:text-3xl md:text-4xl mt-2">
              
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-700 mb-8 animate-fade-in-up animation-delay-200 max-w-2xl">
             Gain hands-on experience in Robotics & Drone Technology with this 90-hour certified course by NIELIT Patna, focused on practical skills, live projects, and industry-ready training.
            </p>

            {/* Course Tags */}
            {/*<div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up animation-delay-300">
              <span className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-full">
                30-Day Online Course
              </span>
              <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full">
                3-Day Bootcamp
              </span>
              <span className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-full">
                Starts 15th November
              </span>
            </div>*/}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <button
                onClick={scrollToRegistration}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-semibold rounded-full shadow-xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 hover:from-orange-700 hover:to-amber-700 min-w-[160px]"
              >
                <span className="relative z-10">📝 Registration</span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>

              {/* <button
                onClick={() => alert('Login feature coming soon!')}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white text-sm font-semibold rounded-full shadow-xl hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 hover:from-gray-800 hover:to-gray-900 min-w-[160px]"
              >
                <span className="relative z-10">🔐 Login</span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button> */}

              {/* <button
                onClick={scrollToRegistration}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full shadow-xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 min-w-[160px]"
              >
                <span className="relative z-10">🚀 Join Now</span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button> */}
            </div>
          </div>

          {/* Right Side - Logo */}
          <div className="flex justify-center lg:justify-end items-center animate-fade-in-up animation-delay-500">
            <div className="text-center">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto mb-6 relative">
                <img 
                  src="/logo2.png" 
                  alt="NIELIT Logo" 
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
              </div>
              <div className="text-gray-900">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  National Institute of Electronics & Information Technology
                </h3>
                <div className="inline-block px-4 py-2 bg-gray-100 border border-gray-300 rounded-full">
                  <span className="text-sm font-medium text-gray-700">Certified by NIELIT</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToRegistration}
          className="text-gray-600 opacity-75 hover:opacity-100 transition-opacity"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
