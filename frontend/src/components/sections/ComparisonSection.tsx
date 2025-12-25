import { useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { ScrollReveal } from '../ui/ScrollReveal';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export function ComparisonSection() {
    const [teamSize, setTeamSize] = useState(5);

    // Calculations
    const hourlyRate = 100; // Average engineer hourly cost
    const traditionalPlanningHours = 40; // Hours per person per project
    const ironcladPlanningHours = 2; // Hours per person per project

    const traditionalCost = teamSize * traditionalPlanningHours * hourlyRate;
    const ironcladCost = teamSize * ironcladPlanningHours * hourlyRate;
    const savings = traditionalCost - ironcladCost;

    return (
        <Section className="bg-white border-t border-border">
            <Container>
                <div className="text-center mb-16">
                    <ScrollReveal width="100%">
                        <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
                            Day 1 vs. Day 30
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            See how Ironclad OS compresses the development lifecycle.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Timeline Visual */}
                    <ScrollReveal direction="right" width="100%">
                        <div className="space-y-8">
                            {/* Traditional */}
                            <div className="relative">
                                <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                                    <span>Traditional Process</span>
                                    <span>~4 Weeks</span>
                                </div>
                                <div className="h-4 bg-gray-100 rounded-full w-full overflow-hidden flex">
                                    <div className="h-full bg-gray-300 w-1/4" title="Planning"></div>
                                    <div className="h-full bg-gray-300 w-1/4" title="Docs"></div>
                                    <div className="h-full bg-gray-300 w-1/4" title="Approvals"></div>
                                    <div className="h-full bg-industrial-cyan w-1/4" title="Coding"></div>
                                </div>
                                <div className="mt-2 text-xs text-center text-gray-400">
                                    Only 25% time spent coding
                                </div>
                            </div>

                            {/* Ironclad */}
                            <div className="relative">
                                <div className="flex justify-between text-sm font-medium text-industrial-dark mb-2">
                                    <span>With Ironclad OS</span>
                                    <span>~2 Days</span>
                                </div>
                                <div className="h-4 bg-gray-100 rounded-full w-full overflow-hidden flex">
                                    <div className="h-full bg-industrial-yellow w-[5%]" title="Ironclad Generation"></div>
                                    <div className="h-full bg-industrial-cyan w-[95%]" title="Coding"></div>
                                </div>
                                <div className="mt-2 text-xs text-center text-industrial-cyan font-medium">
                                    95% time spent coding
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Calculator */}
                    <ScrollReveal direction="left" width="100%">
                        <div className="bg-industrial-dark text-white rounded-2xl p-8 shadow-2xl">
                            <h3 className="text-xl font-semibold mb-6">Cost Savings Calculator</h3>

                            <div className="mb-8">
                                <label htmlFor="team-size" className="block text-sm font-medium text-gray-400 mb-4">
                                    Team Size: <span className="text-white font-bold">{teamSize} Engineers</span>
                                </label>
                                <input
                                    id="team-size"
                                    type="range"
                                    min="1"
                                    max="50"
                                    step="1"
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-industrial-yellow"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>1</span>
                                    <span>50</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-6">
                                <div>
                                    <div className="text-xs text-gray-400 mb-1">Estimated Savings</div>
                                    <div className="text-3xl font-bold text-industrial-yellow">
                                        $<AnimatedCounter value={savings} prefix="" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 mb-1">Time Saved</div>
                                    <div className="text-3xl font-bold text-white">
                                        <AnimatedCounter value={teamSize * (traditionalPlanningHours - ironcladPlanningHours)} suffix="h" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </Container>
        </Section>
    );
}
