import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { ScrollReveal } from '../ui/ScrollReveal';
import {
    ShieldCheckIcon,
    BoltIcon,
    CpuChipIcon,
    EyeIcon,
    ChartBarIcon,
    DocumentCheckIcon
} from '@heroicons/react/24/outline';

export function FeaturesSection() {
    const features = [
        {
            icon: ShieldCheckIcon,
            title: "Privacy First",
            desc: "All processing happens locally. Your intellectual property never touches our servers."
        },
        {
            icon: BoltIcon,
            title: "0ms Latency",
            desc: "Instant feedback loop. No waiting for API roundtrips or queued jobs."
        },
        {
            icon: CpuChipIcon,
            title: "Deterministic",
            desc: "Same input, same output. Guaranteed. No random AI hallucinations."
        },
        {
            icon: EyeIcon,
            title: "X-Ray Mode",
            desc: "Toggle visualization to see the underlying data structures and state."
        },
        {
            icon: ChartBarIcon,
            title: "100/100 LH",
            desc: "Optimized for speed. Perfect Lighthouse performance scores out of the box."
        },
        {
            icon: DocumentCheckIcon,
            title: "Verified Artifacts",
            desc: "Generated documents schema-validated against industry standards."
        }
    ];

    return (
        <Section className="bg-gray-50 border-t border-border" id="features">
            <Container>
                <div className="text-center mb-16">
                    <ScrollReveal width="100%">
                        <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
                            Built for Engineering Rigor
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We traded "magic" for reliability. Here's why technical teams choose Ironclad OS.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <Card className="p-6 h-full" hoverEffect={true}>
                                <div className="w-12 h-12 bg-industrial-light/50 rounded-lg flex items-center justify-center text-industrial-cyan mb-4">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-industrial-dark mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
