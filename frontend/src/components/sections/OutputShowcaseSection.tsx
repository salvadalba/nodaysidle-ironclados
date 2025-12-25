import { useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { CodeBlock } from '../ui/CodeBlock';
import { ScrollReveal } from '../ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

export function OutputShowcaseSection() {
    const [activeTab, setActiveTab] = useState<'prd' | 'ard' | 'tasks' | 'rules'>('prd');

    const tabs = [
        { id: 'prd', label: 'PRD' },
        { id: 'ard', label: 'Architecture' },
        { id: 'tasks', label: 'Task List' },
        { id: 'rules', label: 'Agent Rules' },
    ] as const;

    const content = {
        prd: {
            title: "Product Requirements Document",
            desc: "Comprehensive breakdown of user needs, functional requirements, and success metrics.",
            code: `## 🎯 Product Vision
A deterministic, AI-powered software development platform...

## 👥 Target Users
- CTOs and Technical Founders
- Product Managers
- Engineering Leads

## 🧩 Core Features
1. Two-Sentence Terminal
2. X-Ray Toggle
3. WASM Demo Engine`
        },
        ard: {
            title: "Architecture Requirements Document",
            desc: "Technical specifications, system boundaries, and data models.",
            code: `## 🏗 Architecture Style
Client-side SPA with WASM core

## 🧱 Components
- Frontend: React + TypeScript + Vite
- Core Logic: Rust (compiled to WASM)
- State: Zustand / Context
- Storage: LocalStorage + Optional Postgres

## 🔐 Security
- Zero-knowledge architecture
- Client-side execution
- No external API dependency`
        },
        tasks: {
            title: "Jira-Style Task List",
            desc: "Actionable, granular development tasks estimated and prioritized.",
            code: `- [ ] Create core WASM engine scaffolding (5pts)
- [ ] Implement command parser in Rust (3pts)
- [ ] Build React hook for WASM bridge (2pts)
- [ ] Design "X-Ray" UI component (5pts)
- [ ] Optimize WASM bundle size < 2MB (8pts)`
        },
        rules: {
            title: "Agent Rules (cursorrules)",
            desc: "Specific instructions for AI coding agents to implement the features.",
            code: `ROLE: Rust/WASM Engineer
GOAL: Implement deterministic state machine
CONTEXT: Core logic must run in browser

STEPS:
1. Define struct State { ... }
2. Implement transition(input) -> Result<State, Error>
3. Expose via wasm_bindgen`
        }
    };

    return (
        <Section className="bg-white">
            <Container>
                <div className="text-center mb-12">
                    <ScrollReveal width="100%">
                        <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
                            Structured, Verifiable Outputs
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Ironclad OS generates four key artifacts for every project.
                            Toggle below to inspect the quality.
                        </p>
                    </ScrollReveal>
                </div>

                <ScrollReveal width="100%">
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-industrial-dark text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-industrial-dark mb-4">
                                    {content[activeTab].title}
                                </h3>
                                <p className="text-gray-600 mb-6 text-lg">
                                    {content[activeTab].desc}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-industrial-cyan mr-3"></span>
                                        Markdown formatted
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-industrial-cyan mr-3"></span>
                                        Ready for version control
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-industrial-cyan mr-3"></span>
                                        Human-readable & verifiable
                                    </li>
                                </ul>
                            </div>

                            <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-800">
                                <CodeBlock
                                    code={content[activeTab].code}
                                    language="markdown"
                                    showLineNumbers={true}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </ScrollReveal>
            </Container>
        </Section>
    );
}
