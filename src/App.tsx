import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import { useState } from 'react';

const App: React.FC = () => {
  const [insertMathNode, setInsertMathNode] = useState<((equation: string) => void) | null>(null);

  const handleImportChat = (url: string) => {
    console.log('Importing chat from:', url);
    // This will later involve fetching and parsing the chat content
  };

  const handleEditorInsertMathNode = (mathNodeInserter: (equation: string) => void) => {
    setInsertMathNode(() => mathNodeInserter);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Toolbar onImportChat={handleImportChat} onInsertMathNode={insertMathNode} />
          <Editor onInsertMathNode={handleEditorInsertMathNode} />
        </div>
      </div>
    </div>
  );
};

export default App;