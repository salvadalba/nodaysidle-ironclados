/**
 * WASM module type definitions
 */

export interface WasmModule {
  initialize(): void;
  executeDemo(input: string): DemoOutput;
  cleanup(): void;
  getVersion(): string;
  isInitialized(): boolean;
}

export interface DemoOutput {
  prd: PRDSection | null;
  ard: ARDSection | null;
  task_list: TaskListSection | null;
  agent_rules: AgentRulesSection | null;
}

export interface PRDSection {
  title: string;
  vision: string;
  goals: string[];
  non_goals: string[];
  target_users: string[];
}

export interface ARDSection {
  system_overview: string;
  architecture_style: string;
  frontend_tech: string[];
  backend_tech: string[];
  data_layer: string[];
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  estimate: string;
  dependencies: string[];
}

export interface TaskListSection {
  epic: string;
  tasks: TaskItem[];
}

export interface AgentRule {
  role: string;
  goal: string;
  context: string;
  files_to_create: string[];
  files_to_modify: string[];
  detailed_steps: string[];
  validation: string;
}

export interface AgentRulesSection {
  rules: AgentRule[];
}

export type ArtifactType = 'PRD' | 'ARD' | 'TASK_LIST';
