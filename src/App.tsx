import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';

const App: React.FC = () => {
  const handleImportChat = (url: string) => {
    console.log('Importing chat from:', url);
    // This will later involve fetching and parsing the chat content
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Toolbar onImportChat={handleImportChat} />
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default App;