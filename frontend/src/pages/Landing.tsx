import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { ProblemSection } from '../components/sections/ProblemSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { DemoSection } from '../components/sections/DemoSection';
import { OutputShowcaseSection } from '../components/sections/OutputShowcaseSection';
import { ComparisonSection } from '../components/sections/ComparisonSection';
import { ArchitectureSection } from '../components/sections/ArchitectureSection';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { TrustSection } from '../components/sections/TrustSection';
import { CTASection } from '../components/sections/CTASection';

export default function Landing() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <HeroSection />
                <ProblemSection />
                <HowItWorksSection />
                <DemoSection />
                <OutputShowcaseSection />
                <ComparisonSection />
                <ArchitectureSection />
                <FeaturesSection />
                <TrustSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
