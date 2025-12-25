import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { ScrollReveal } from '../ui/ScrollReveal';
import {
    DocumentMagnifyingGlassIcon,
    ExclamationTriangleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export function ProblemSection() {
    const painPoints = [
        {
            icon: ExclamationTriangleIcon,
            title: "AI Hallucinations",
            description: "Standard LLMs invent APIs and libraries that don't exist, leading to broken builds and wasted cycles."
        },
        {
            icon: DocumentMagnifyingGlassIcon,
            title: "Unverifiable Outputs",
            description: "Generated code often looks correct but fails in edge cases. You need 100% deterministic logic."
        },
        {
            icon: ClockIcon,
            title: "Planning Gridlock",
            description: "Teams spend weeks on PRDs and architecture docs before writing a single line of code."
        }
    ];

    return (
        <Section className="bg-white border-t border-border">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    <div className="lg:w-1/2">
                        <ScrollReveal direction="right">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-industrial-cyan/5 rounded-full blur-3xl z-0"></div>
                                <div className="relative z-10 text-center">
                                    <div className="text-[120px] md:text-[180px] font-bold text-industrial-dark leading-none tracking-tighter">
                                        <AnimatedCounter value={70} suffix="%" />
                                    </div>
                                    <p className="text-xl md:text-2xl font-medium text-gray-500 mt-4 max-w-xs mx-auto">
                                        of development time is lost on planning & documentation
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="lg:w-1/2">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-industrial-dark">
                                The "AI Co-pilot" isn't enough.
                            </h2>
                            <p className="text-lg text-gray-600 mb-12">
                                Chatbots are great for snippets, but terrible for architecture.
                                You need a system that understands the entire engineering lifecycle.
                            </p>
                        </ScrollReveal>

                        <div className="space-y-8">
                            {painPoints.map((point, index) => (
                                <ScrollReveal key={index} delay={index * 0.1} direction="up">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-industrial-light rounded-lg flex items-center justify-center text-industrial-dark">
                                                <point.icon className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-industrial-dark mb-2">{point.title}</h3>
                                            <p className="text-gray-600">{point.description}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
}
