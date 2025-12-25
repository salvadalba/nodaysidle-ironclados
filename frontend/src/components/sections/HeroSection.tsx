import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { GridPattern } from '../ui/GridPattern';
import { motion } from 'framer-motion';

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-white">
            <GridPattern />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-industrial-light/50 border border-gray-200 text-sm font-medium text-gray-600 mb-6">
                            Deterministic AI for Software Engineering
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-industrial-dark mb-6 leading-[1.1]"
                    >
                        Transform Ideas into <br className="hidden md:block" />
                        <span className="text-gradient">Production Code</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Generate production-ready PRDs, Architecture diagrams, and verified code from natural language. No hallucinations, just deterministic logic.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-industrial-cyan/10">
                            Try the Demo
                        </Button>
                        <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                            Book a Call <span aria-hidden="true" className="ml-2">→</span>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-12 flex items-center justify-center gap-x-8 text-gray-400 text-sm"
                    >
                        <div className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                            Client-side WASM
                        </div>
                        <div className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                            100% Deterministic
                        </div>
                        <div className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                            Zero Data Leaks
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
