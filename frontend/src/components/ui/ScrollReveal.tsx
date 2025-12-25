import { ReactNode, useRef } from 'react';
import { motion, useInView, Variant } from 'framer-motion';

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export function ScrollReveal({
    children,
    width = "fit-content",
    className = "",
    delay = 0,
    direction = 'up'
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const getVariants = (): { hidden: Variant; visible: Variant } => {
        const distance = 75;

        switch (direction) {
            case 'up':
                return {
                    hidden: { opacity: 0, y: distance },
                    visible: { opacity: 1, y: 0 }
                };
            case 'down':
                return {
                    hidden: { opacity: 0, y: -distance },
                    visible: { opacity: 1, y: 0 }
                };
            case 'left':
                return {
                    hidden: { opacity: 0, x: distance },
                    visible: { opacity: 1, x: 0 }
                };
            case 'right':
                return {
                    hidden: { opacity: 0, x: -distance },
                    visible: { opacity: 1, x: 0 }
                };
            default:
                return {
                    hidden: { opacity: 0, y: distance },
                    visible: { opacity: 1, y: 0 }
                };
        }
    };

    const variants = getVariants();

    return (
        <div ref={ref} style={{ width, position: 'relative', overflow: 'hidden' }} className={className}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
}
