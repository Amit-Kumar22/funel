import HeroSection from './components/HeroSection';
import EligibilitySection from './components/EligibilitySection';
import BenefitsSection from './components/BenefitsSection';
import ModulesSection from './components/ModulesSection';
import RegistrationSteps from './components/RegistrationSteps';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <EligibilitySection />
      <BenefitsSection />
      <ModulesSection />
      <RegistrationSteps />
    </main>
  );
}
