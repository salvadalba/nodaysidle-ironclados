import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DemoEngine } from '../components/DemoEngine';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-24">
                <Section className="py-12">
                    <Container>
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <h1 className="text-4xl font-bold text-industrial-dark mb-4">
                                Ironclad OS Demo
                            </h1>
                            <p className="text-gray-600">
                                Experience deterministic software generation.
                            </p>
                        </div>
                        <DemoEngine />
                    </Container>
                </Section>
            </main>
            <Footer />
        </div>
    );
}
