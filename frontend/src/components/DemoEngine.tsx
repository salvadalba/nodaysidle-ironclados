/**
 * Demo Engine Component - Main WASM-powered demo interface
 */

import { useState } from 'react';
import { useWasm } from '@/hooks/useWasm';
import type { DemoOutput } from '@/types/wasm';

export function DemoEngine() {
  const { isLoading, error, isInitialized, executeDemo } = useWasm();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<DemoOutput | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executeError, setExecuteError] = useState<string | null>(null);

  const handleExecute = async () => {
    if (!input.trim() || !isInitialized) return;

    setIsExecuting(true);
    setExecuteError(null);

    try {
      const result = await executeDemo(input);
      setOutput(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setExecuteError(message);
    } finally {
      setIsExecuting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">Loading demo engine...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-900">Failed to load WASM module</h3>
        <p className="mt-2 text-red-700">{error}</p>
        <p className="mt-2 text-sm text-red-600">
          Please ensure you are using a modern browser with WASM support.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Input Section */}
      <div className="mb-8">
        <label htmlFor="demo-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your project idea
        </label>
        <div className="flex gap-4">
          <input
            id="demo-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Build a task management app with real-time collaboration"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            disabled={!isInitialized || isExecuting}
            onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
          />
          <button
            onClick={handleExecute}
            disabled={!input.trim() || !isInitialized || isExecuting}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isExecuting ? 'Generating...' : 'Generate Artifacts'}
          </button>
        </div>
        {executeError && (
          <p className="mt-2 text-sm text-red-600">{executeError}</p>
        )}
      </div>

      {/* Output Section */}
      {output && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PRD Section */}
          {output.prd && (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Product Requirements Document</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Title:</span> {output.prd.title}
                </div>
                <div>
                  <span className="font-medium">Vision:</span> {output.prd.vision}
                </div>
                <div>
                  <span className="font-medium">Goals:</span>
                  <ul className="ml-4 list-disc">
                    {output.prd.goals.map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-medium">Non-Goals:</span>
                  <ul className="ml-4 list-disc">
                    {output.prd.non_goals.map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-medium">Target Users:</span>
                  <ul className="ml-4 list-disc">
                    {output.prd.target_users.map((user, i) => (
                      <li key={i}>{user}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ARD Section */}
          {output.ard && (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Architecture Requirements Document</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Overview:</span> {output.ard.system_overview}
                </div>
                <div>
                  <span className="font-medium">Style:</span> {output.ard.architecture_style}
                </div>
                <div>
                  <span className="font-medium">Frontend:</span>{' '}
                  {output.ard.frontend_tech.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Backend:</span>{' '}
                  {output.ard.backend_tech.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Data Layer:</span>{' '}
                  {output.ard.data_layer.join(', ')}
                </div>
              </div>
            </div>
          )}

          {/* Task List Section */}
          {output.task_list && (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Task List</h3>
              <div className="space-y-3">
                <div className="font-medium">{output.task_list.epic}</div>
                <div className="space-y-2">
                  {output.task_list.tasks.map((task) => (
                    <div key={task.id} className="p-3 bg-white border border-gray-200 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs text-gray-500">{task.id}</span>
                          <span className="ml-2 font-medium">{task.title}</span>
                        </div>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">{task.estimate}pt</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                      {task.dependencies.length > 0 && (
                        <div className="mt-2 text-xs text-gray-500">
                          Depends on: {task.dependencies.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Agent Rules Section */}
          {output.agent_rules && (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Agent Rules</h3>
              <div className="space-y-4">
                {output.agent_rules.rules.map((rule, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-200 rounded">
                    <div className="font-medium text-gray-900">{rule.role}</div>
                    <div className="mt-2 text-sm">
                      <div><span className="font-medium">Goal:</span> {rule.goal}</div>
                      <div className="mt-1"><span className="font-medium">Context:</span> {rule.context}</div>
                      {rule.files_to_create.length > 0 && (
                        <div className="mt-1">
                          <span className="font-medium">Create:</span>{' '}
                          {rule.files_to_create.join(', ')}
                        </div>
                      )}
                      <div className="mt-2 text-xs bg-gray-100 p-2 rounded font-mono">
                        {rule.validation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
