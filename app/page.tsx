import HeroSection from './components/HeroSection';
import RegistrationSteps from './components/RegistrationSteps';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <RegistrationSteps />
    </main>
  );
}
