export function GridPattern() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <svg
                className="absolute w-full h-full text-industrial-light opacity-50"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="grid-pattern"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
            {/* Mask to fade out grid at bottom */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, transparent 60%, white 100%)'
                }}
            />
        </div>
    );
}
