import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { ScrollReveal } from '../ui/ScrollReveal';

export function HowItWorksSection() {
    const steps = [
        {
            number: "01",
            title: "Input Requirements",
            description: "Describe your project in natural language. \"A task management app with real-time text collaboration.\""
        },
        {
            number: "02",
            title: "WASM Processing",
            description: "Our client-side Rust engine breaks down the requirements into atomic logical units deterministically."
        },
        {
            number: "03",
            title: "Production Artifacts",
            description: "Receive complete PRDs, Architecture diagrams, and verified code snippets instantly."
        }
    ];

    return (
        <Section className="bg-industrial-dark text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-industrial-cyan rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-industrial-yellow rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <ScrollReveal width="100%">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            From vague idea to concrete engineering plan in seconds.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-0.5 bg-gray-800 z-0"></div>

                    {steps.map((step, index) => (
                        <ScrollReveal key={index} delay={index * 0.2} width="100%">
                            <div className="relative z-10 text-center">
                                <div className="w-20 h-20 mx-auto bg-gray-900 border border-gray-700 rounded-2xl flex items-center justify-center text-3xl font-bold text-industrial-cyan mb-6 shadow-xl shadow-black/50">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
