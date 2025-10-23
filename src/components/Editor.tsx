import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import type { EditorState } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { LineBreakNode } from 'lexical';
import { MathNode } from '../nodes/MathNode.tsx';
import { ImageNode } from '../nodes/ImageNode.tsx'; // Import ImageNode
import LexicalEditorContent from './LexicalEditorContent';

interface EditorProps {
  onInsertMathNode: (insertMathNode: (equation: string) => void) => void;
  onInsertTextBlock: (insertTextBlock: () => void) => void;
  onInsertCodeBlock: (insertCodeBlock: () => void) => void;
  onInsertImageBlock: (insertImageBlock: (src: string, altText: string) => void) => void; // Add onInsertImageBlock
  onClearEditor: (clearEditor: () => void) => void;
  chatContentToInsert: any[] | null;
}

// Lexical Theme (can be customized later)
const theme = {
  // Example: paragraph: "editor-paragraph"
};

// Lexical Editor Configuration
const editorConfig = {
  namespace: 'PDFyEditor',
  theme,
  onError(error: Error) {
    console.error(error);
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    HorizontalRuleNode,
    LineBreakNode,
    MathNode,
    ImageNode, // Add ImageNode to the nodes array
  ],
};

const Editor: React.FC<EditorProps> = ({ onInsertMathNode, onInsertTextBlock, onInsertCodeBlock, onInsertImageBlock, onClearEditor, chatContentToInsert }) => {
  return (
    <div className="flex-1 p-8 overflow-auto flex justify-center items-start">
      <div className="bg-white w-full max-w-screen-md min-h-[1100px] rounded-lg shadow-xl p-12 text-black relative">
        <LexicalComposer initialConfig={editorConfig}>
          <LexicalEditorContent
            onInsertMathNode={onInsertMathNode}
            onInsertTextBlock={onInsertTextBlock}
            onInsertCodeBlock={onInsertCodeBlock}
            onInsertImageBlock={onInsertImageBlock}
            onClearEditor={onClearEditor}
            chatContentToInsert={chatContentToInsert}
          />
        </LexicalComposer>
      </div>
    </div>
  );
};

export default Editor;