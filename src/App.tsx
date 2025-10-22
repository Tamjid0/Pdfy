import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import Workspace from './components/Workspace';

function App() {
  return (
    <div className="app-container flex flex-col h-screen">
      <Header />
      <div className="main-layout flex flex-1 overflow-hidden">
        <Sidebar />
        <Workspace />
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
