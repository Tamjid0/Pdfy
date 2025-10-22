import React, { useRef, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KatexRendererProps {
  equation: string;
}

const KatexRenderer: React.FC<KatexRendererProps> = ({ equation }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(equation, ref.current, { throwOnError: false });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
      }
    }
  }, [equation]);

  return <span ref={ref} className="text-black"></span>;
};

export default KatexRenderer;