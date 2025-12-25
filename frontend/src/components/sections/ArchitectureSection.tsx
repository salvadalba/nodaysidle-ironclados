import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { CodeBlock } from '../ui/CodeBlock';
import { ScrollReveal } from '../ui/ScrollReveal';

export function ArchitectureSection() {
    const wasmStructCode = `#[wasm_bindgen]
pub struct IroncladEngine {
    state: ProjectState,
    config: SimulationConfig,
}

#[wasm_bindgen]
impl IroncladEngine {
    pub fn new() -> IroncladEngine {
        IroncladEngine {
            state: ProjectState::default(),
            config: SimulationConfig::default(),
        }
    }

    pub fn process_prompt(&mut self, input: &str) -> Result<JsValue, JsValue> {
        let artifacts = self.core.generate_artifacts(input)?;
        Ok(serde_wasm_bindgen::to_value(&artifacts)?)
    }
}`;

    return (
        <Section className="bg-white">
            <Container>
                <div className="text-center mb-16">
                    <ScrollReveal width="100%">
                        <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
                            Under the Hood
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A modern, type-safe architecture designed for performance and privacy.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <ScrollReveal direction="right" width="100%">
                        <CodeBlock
                            code={wasmStructCode}
                            language="rust"
                            className="shadow-2xl"
                        />
                        <div className="mt-4 text-sm text-gray-500 text-center">
                            Actual core logic running in your browser via WebAssembly
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" width="100%">
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                            <h3 className="text-xl font-semibold text-industrial-dark mb-6">Stack Overview</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4 shrink-0">R</div>
                                    <div>
                                        <h4 className="font-semibold">React Frontend</h4>
                                        <p className="text-sm text-gray-600">Interact with the UI. Inputs are captured and sanitized before processing.</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <span className="text-gray-300">↓ WASM Bridge</span>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-600 font-bold mr-4 shrink-0">W</div>
                                    <div>
                                        <h4 className="font-semibold">Rust Core (WASM)</h4>
                                        <p className="text-sm text-gray-600">Deterministic logic execution. No data leaves the client. Sub-millisecond performance.</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <span className="text-gray-300">↓ JSON Output</span>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center text-green-600 font-bold mr-4 shrink-0">P</div>
                                    <div>
                                        <h4 className="font-semibold">Artifact Generation</h4>
                                        <p className="text-sm text-gray-600">Structured outputs (PRD, ARD) rendered instantly in the component layer.</p>
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
