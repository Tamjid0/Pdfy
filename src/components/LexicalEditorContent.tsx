import React from 'react';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import type { EditorState } from 'lexical';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { $createParagraphNode, $getRoot, $insertNodes } from 'lexical';
import { $createMathNode } from '../nodes/MathNode.tsx';

interface LexicalEditorContentProps {
  onInsertMathNode: (equation: string) => void;
}

// OnChange handler for Lexical editor state
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the editor state here
    // const root = $getRoot();
    // const selection = $getSelection();
    // console.log(root, selection);
  });
}

const LexicalEditorContent: React.FC<LexicalEditorContentProps> = ({ onInsertMathNode }) => {
  const [editor] = useLexicalComposerContext();

  // This function will be passed up to the Toolbar
  const insertMathNode = (equation: string) => {
    editor.update(() => {
      const mathNode = $createMathNode('', equation);
      $insertNodes([mathNode]);
    });
  };

  // Pass the insertMathNode function to the parent (Editor) which will then pass it to Toolbar
  React.useEffect(() => {
    onInsertMathNode(insertMathNode);
  }, [onInsertMathNode, insertMathNode]);

  return (
    <div className="relative">
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-content-editable outline-none" />}
        placeholder={<div className="editor-placeholder absolute top-12 left-12 right-12 pointer-events-none text-gray-400">Enter your text here...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
      <LinkPlugin />
      <ListPlugin />
      <CheckListPlugin />
      {/* <ClearEditorPlugin /> */}
    </div>
  );
};

export default LexicalEditorContent;