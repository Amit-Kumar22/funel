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
      className="relative h-[70vh] md:h-[75vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hero.webp')`,
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/40 to-gray-900/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
          Applied Data Science & Machine Intelligence
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 animate-fade-in-up animation-delay-200">
          Fundamentals to Next Generation AI - Certified by IIT Kanpur
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          <button
            onClick={scrollToRegistration}
            className="group relative px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-semibold rounded-full shadow-xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 hover:from-orange-700 hover:to-amber-700 min-w-[160px]"
          >
            <span className="relative z-10">📝 Registration</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => alert('Login feature coming soon!')}
            className="group relative px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white text-sm font-semibold rounded-full shadow-xl hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 hover:from-gray-800 hover:to-gray-900 min-w-[160px]"
          >
            <span className="relative z-10">🔐 Login</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={scrollToRegistration}
            className="group relative px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full shadow-xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 min-w-[160px]"
          >
            <span className="relative z-10">🚀 Join Now</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToRegistration}
            className="text-white opacity-75 hover:opacity-100 transition-opacity"
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
      </div>
    </section>
  );
}
