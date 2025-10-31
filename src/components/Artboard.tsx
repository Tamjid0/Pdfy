import React from 'react';

interface ArtboardProps {
  htmlContent: string | null;
}

const Artboard: React.FC<ArtboardProps> = ({ htmlContent }) => {
  if (!htmlContent) {
    return (
      <div className="flex-1 p-8 overflow-auto flex justify-center items-start">
        <div className="bg-white w-[794px] h-[1122px] rounded-lg shadow-xl p-12 text-gray-400 flex items-center justify-center">
          No content to display. Scrape a URL to see the preview.
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-auto flex justify-center items-start">
      <div className="bg-white w-[794px] h-[1122px] rounded-lg shadow-xl p-12 text-black relative overflow-y-auto">
        <iframe
          srcDoc={htmlContent}
          sandbox="allow-same-origin allow-scripts"
          className="w-full h-full border-none bg-white"
          title="Live Preview"
        />
      </div>
    </div>
  );
};

export default Artboard;
