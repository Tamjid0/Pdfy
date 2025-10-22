import React from 'react';

const RightPanel: React.FC = () => {
  return (
    <div className="w-70 bg-[#111] border-l border-[#222] p-6 overflow-y-auto">
      <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Properties</div>
      
      <div id="block-properties">
        <div className="mb-6">
          <div className="text-sm text-gray-300 mb-2">Font Family</div>
          <select className="w-full bg-[#1a1a1a] border border-[#333] text-white p-2.5 rounded-md text-sm cursor-pointer focus:outline-none focus:border-[#00ff88]">
            <option>Inter</option>
            <option>Roboto</option>
            <option>Poppins</option>
            <option>Courier New</option>
          </select>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-300 mb-2">Font Size</div>
          <input type="number" className="w-full bg-[#1a1a1a] border border-[#333] text-white p-2.5 rounded-md text-sm focus:outline-none focus:border-[#00ff88]" value="16" min="8" max="72" />
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-300 mb-2">Text Color</div>
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-md border-2 border-[#333] cursor-pointer" style={{ background: '#333333' }}></div>
            <input type="text" className="flex-1 bg-[#1a1a1a] border border-[#333] text-white p-2.5 rounded-md text-sm focus:outline-none focus:border-[#00ff88]" value="#333333" />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-300 mb-2">Alignment</div>
          <select className="w-full bg-[#1a1a1a] border border-[#333] text-white p-2.5 rounded-md text-sm cursor-pointer focus:outline-none focus:border-[#00ff88]">
            <option>Left</option>
            <option>Center</option>
            <option>Right</option>
            <option>Justify</option>
          </select>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-300 mb-2">Line Height</div>
          <input type="number" className="w-full bg-[#1a1a1a] border border-[#333] text-white p-2.5 rounded-md text-sm focus:outline-none focus:border-[#00ff88]" value="1.6" min="1" max="3" step="0.1" />
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-300 mb-2">Background</div>
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-md border-2 border-[#333] cursor-pointer" style={{ background: '#ffffff' }}></div>
            <input type="text" className="flex-1 bg-[#1a1a1a] border border-[#333] text-white p-2.5 rounded-md text-sm focus:outline-none focus:border-[#00ff88]" value="#ffffff" />
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 py-12 px-6 hidden">
        <div className="text-base font-semibold mb-2">No Block Selected</div>
        <div className="text-sm">Select a block to edit its properties</div>
      </div>
    </div>
  );
};

export default RightPanel;
