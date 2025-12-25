import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    code: string;
    language?: string;
    className?: string;
    showLineNumbers?: boolean;
}

export function CodeBlock({
    code,
    language = 'rust',
    className = '',
    showLineNumbers = true
}: CodeBlockProps) {
    return (
        <div className={`rounded-lg overflow-hidden text-sm bg-[#1e1e1e] border border-gray-800 ${className}`}>
            <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-gray-800">
                <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                {language && (
                    <div className="ml-4 text-xs text-gray-400 font-mono uppercase">
                        {language}
                    </div>
                )}
            </div>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'transparent',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                }}
                showLineNumbers={showLineNumbers}
                wrapLines={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
