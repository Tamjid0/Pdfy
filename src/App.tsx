import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default App;