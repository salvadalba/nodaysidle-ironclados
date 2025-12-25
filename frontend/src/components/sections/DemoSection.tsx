import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { DemoEngine } from '../DemoEngine';
import { ScrollReveal } from '../ui/ScrollReveal';

export function DemoSection() {
    return (
        <Section className="bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" id="demo">
            <Container>
                <div className="text-center mb-12">
                    <ScrollReveal width="100%">
                        <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
                            Experience the Engine
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Try it yourself. The core logic runs entirely in your browser via WebAssembly.
                            Zero latency, zero data sent to servers.
                        </p>
                    </ScrollReveal>
                </div>

                <ScrollReveal width="100%" delay={0.2}>
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                        <div className="p-4 md:p-8">
                            <DemoEngine />
                        </div>
                    </div>
                </ScrollReveal>

            </Container>
        </Section>
    );
}
