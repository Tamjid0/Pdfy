import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import Artboard from './components/Artboard';

const App: React.FC = () => {
  const [insertMathNode, setInsertMathNode] = useState<((equation: string) => void) | null>(null);
  const [insertTextBlock, setInsertTextBlock] = useState<(() => void) | null>(null);
  const [insertCodeBlock, setInsertCodeBlock] = useState<(() => void) | null>(null);
  const [insertImageBlock, setInsertImageBlock] = useState<((src: string, altText: string) => void) | null>(null);
  const [clearEditor, setClearEditor] = useState<(() => void) | null>(null);
  const [chatContentToInsert, setChatContentToInsert] = useState<any[] | null>(null);
  const [htmlPreview, setHtmlPreview] = useState<string | null>(null);

  const handleScrapeUrl = async (url: string) => {
    console.log('Scraping URL:', url);
    try {
      const response = await fetch(`http://localhost:3001/scrape?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('Failed to scrape URL');
      }
      const data = await response.json();
      setHtmlPreview(data.html);
    } catch (error) {
      console.error('Error scraping URL:', error);
      setHtmlPreview(null); // Clear preview on error
    }
  };

  const handleEditorInsertMathNode = React.useCallback((mathNodeInserter: (equation: string) => void) => {
    setInsertMathNode(() => mathNodeInserter);
  }, []);

  const handleEditorInsertTextBlock = React.useCallback((textBlockInserter: () => void) => {
    setInsertTextBlock(() => textBlockInserter);
  }, []);

  const handleEditorInsertCodeBlock = React.useCallback((codeBlockInserter: () => void) => {
    setInsertCodeBlock(() => codeBlockInserter);
  }, []);

  const handleEditorInsertImageBlock = React.useCallback((imageBlockInserter: (src: string, altText: string) => void) => {
    setInsertImageBlock(() => imageBlockInserter);
  }, []);

  const handleEditorClear = React.useCallback((editorClearer: () => void) => {
    setClearEditor(() => editorClearer);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Toolbar
            onImportChat={handleScrapeUrl}
            onInsertMathNode={insertMathNode}
            onInsertTextBlock={insertTextBlock}
            onInsertCodeBlock={insertCodeBlock}
            onInsertImageBlock={insertImageBlock}
            onClearEditor={clearEditor}
          />
          <div className="flex flex-1">
            <Editor
              onInsertMathNode={handleEditorInsertMathNode}
              onInsertTextBlock={handleEditorInsertTextBlock}
              onInsertCodeBlock={handleEditorInsertCodeBlock}
              onInsertImageBlock={handleEditorInsertImageBlock}
              onClearEditor={handleEditorClear}
              chatContentToInsert={chatContentToInsert}
            />
            <Artboard htmlContent={htmlPreview} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;