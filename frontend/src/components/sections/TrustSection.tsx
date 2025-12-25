import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { ScrollReveal } from '../ui/ScrollReveal';

export function TrustSection() {
    const logos = [
        { name: "React", opacity: "opacity-80" },
        { name: "Rust", opacity: "opacity-90 font-bold" },
        { name: "WebAssembly", opacity: "opacity-80" },
        { name: "TypeScript", opacity: "opacity-80" },
        { name: "PostgreSQL", opacity: "opacity-70" },
        { name: "Vite", opacity: "opacity-70" },
    ];

    return (
        <Section className="bg-white border-t border-border">
            <Container>
                <div className="text-center">
                    <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-8">
                        Powered by Modern Infrastructure
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-70">
                        {logos.map((logo, index) => (
                            <span key={index} className={`text-xl md:text-2xl font-semibold text-industrial-dark ${logo.opacity}`}>
                                {logo.name}
                            </span>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
