import React from 'react';

interface ArtboardProps {
  htmlContent: string | null;
}

const Artboard: React.FC<ArtboardProps> = ({ htmlContent }) => {
  if (!htmlContent) {
    return (
      <div className="flex-1 p-4 bg-gray-900 text-gray-300 flex items-center justify-center">
        No content to display. Scrape a URL to see the preview.
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 bg-gray-900 flex justify-center items-start">
      <div className="w-[794px] h-[1122px] bg-white shadow-xl">
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
