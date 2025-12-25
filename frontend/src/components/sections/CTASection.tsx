import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { GridPattern } from '../ui/GridPattern';
import { motion } from 'framer-motion';

export function CTASection() {
    return (
        <section className="relative py-24 bg-industrial-dark overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <GridPattern />
            </div>

            <Container className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to stop hallucinating?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Join the engineering teams establishing truth in their development process.
                        Start generating verified artifacts today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                            Evaluate Ironclad OS
                        </Button>
                        <Button size="lg" variant="ghost" className="text-white hover:text-white hover:bg-white/10 w-full sm:w-auto">
                            Read Documentation
                        </Button>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
