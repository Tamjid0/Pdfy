import React, { useState } from 'react';
import Block from './Block';
import TextBlock from './TextBlock';
import CodeBlock from './CodeBlock';
import MathBlock from './MathBlock';

const Workspace: React.FC = () => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const handleBlockSelect = (id: string) => {
    setSelectedBlockId(id);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f0f0f] overflow-hidden">
      {/* Toolbar */}
      <div className="bg-[#111] border-b border-[#222] p-3.5 flex gap-2 items-center">
        <button className="bg-[#00ff88] text-black border-none px-3.5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all shadow-md shadow-green-500/[.2] hover:bg-[#00dd77] hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/[.3] flex items-center gap-1.5" onClick={() => alert('Add Text Block')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current">
            <path d="M5 4v3h5.5v12h3V7H19V4z"/>
          </svg>
          Text
        </button>
        <button className="bg-[#00ff88] text-black border-none px-3.5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all shadow-md shadow-green-500/[.2] hover:bg-[#00dd77] hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/[.3] flex items-center gap-1.5" onClick={() => alert('Add Code Block')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
          </svg>
          Code
        </button>
        <button className="bg-[#00ff88] text-black border-none px-3.5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all shadow-md shadow-green-500/[.2] hover:bg-[#00dd77] hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/[.3] flex items-center gap-1.5" onClick={() => alert('Add Math Block')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5.97 4.06L14.09 6l1.41 1.41L16.91 6l1.06 1.06-1.41 1.41 1.41 1.41-1.06 1.06-1.41-1.4-1.41 1.41-1.06-1.06 1.41-1.41-1.42-1.42zM7.25 7h1.5v1.5h-1.5V7zm0 2.5h1.5V11h-1.5V9.5zm2.5 2.5H8.5v-1.25H7.25V10h1.25V8.75h1.25V10h1.25v1.25H9.75V12zm-2.5 1.5h1.5v1.5h-1.5V13zm6.72 3h-7.5v-1.5h7.5V16z"/>
          </svg>
          Math
        </button>
        <button className="bg-[#00ff88] text-black border-none px-3.5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all shadow-md shadow-green-500/[.2] hover:bg-[#00dd77] hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/[.3] flex items-center gap-1.5" onClick={() => alert('Add Image Block')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
          Image
        </button>
        <div className="w-px h-6 bg-[#333] mx-2"></div>
        <button className="bg-[#00ff88] text-black border-none px-3.5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all shadow-md shadow-green-500/[.2] hover:bg-[#00dd77] hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/[.3] flex items-center gap-1.5" onClick={() => alert('Undo')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current">
            <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
          </svg>
          Undo
        </button>
        <button className="bg-[#00ff88] text-black border-none px-3.5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all shadow-md shadow-green-500/[.2] hover:bg-[#00dd77] hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/[.3] flex items-center gap-1.5" onClick={() => alert('Redo')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current">
            <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>
          </svg>
          Redo
        </button>
        <div className="w-px h-6 bg-[#333] mx-2"></div>
        <button className="bg-[#00ff88] text-black border-none px-3.5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all shadow-md shadow-green-500/[.2] hover:bg-[#00dd77] hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/[.3] flex items-center gap-1.5" onClick={() => alert('Clear All')}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
          Clear All
        </button>
      </div>

      {/* Artboard */}
      <div className="flex-1 p-8 overflow-y-auto flex justify-center" onClick={() => setSelectedBlockId(null)}>
        <div className="bg-white w-full max-w-screen-md min-h-[1100px] rounded-xl shadow-xl p-12 text-black">
          <Block isSelected={selectedBlockId === 'text-block-1'} onSelect={() => handleBlockSelect('text-block-1')}>
            <TextBlock />
          </Block>
          <Block isSelected={selectedBlockId === 'code-block-1'} onSelect={() => handleBlockSelect('code-block-1')}>
            <CodeBlock />
          </Block>
          <Block isSelected={selectedBlockId === 'math-block-1'} onSelect={() => handleBlockSelect('math-block-1')}>
            <MathBlock />
          </Block>
        </div>
      </div>
    </div>
  );
};

export default Workspace;