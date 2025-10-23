import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import { useState } from 'react';

const App: React.FC = () => {
  const [insertMathNode, setInsertMathNode] = useState<((equation: string) => void) | null>(null);
  const [insertTextBlock, setInsertTextBlock] = useState<(() => void) | null>(null);
  const [insertCodeBlock, setInsertCodeBlock] = useState<(() => void) | null>(null);
  const [insertImageBlock, setInsertImageBlock] = useState<((src: string, altText: string) => void) | null>(null);
  const [clearEditor, setClearEditor] = useState<(() => void) | null>(null);
  const [chatContentToInsert, setChatContentToInsert] = useState<any[] | null>(null);

  const handleImportChat = async (url: string) => {
    console.log('Importing chat from:', url);
    try {
      const response = await fetch(`http://localhost:3001/api/import-chat?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('Failed to import chat');
      }
      const chatContent = await response.json();
      setChatContentToInsert(chatContent);
    } catch (error) {
      console.error('Error importing chat:', error);
    }
  };

  const handleEditorInsertMathNode = (mathNodeInserter: (equation: string) => void) => {
    setInsertMathNode(() => mathNodeInserter);
  };

  const handleEditorInsertTextBlock = (textBlockInserter: () => void) => {
    setInsertTextBlock(() => textBlockInserter);
  };

  const handleEditorInsertCodeBlock = (codeBlockInserter: () => void) => {
    setInsertCodeBlock(() => codeBlockInserter);
  };

  const handleEditorInsertImageBlock = (imageBlockInserter: (src: string, altText: string) => void) => {
    setInsertImageBlock(() => imageBlockInserter);
  };

  const handleEditorClear = (editorClearer: () => void) => {
    setClearEditor(() => editorClearer);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Toolbar
            onImportChat={handleImportChat}
            onInsertMathNode={insertMathNode}
            onInsertTextBlock={insertTextBlock}
            onInsertCodeBlock={insertCodeBlock}
            onInsertImageBlock={insertImageBlock}
            onClearEditor={clearEditor}
          />
          <Editor
            onInsertMathNode={handleEditorInsertMathNode}
            onInsertTextBlock={handleEditorInsertTextBlock}
            onInsertCodeBlock={handleEditorInsertCodeBlock}
            onInsertImageBlock={handleEditorInsertImageBlock}
            onClearEditor={handleEditorClear}
            chatContentToInsert={chatContentToInsert}
          />
        </div>
      </div>
    </div>
  );
};

export default App;