import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import type { EditorState } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { LineBreakNode } from 'lexical';

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
  ],
};

// OnChange handler for Lexical editor state
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the editor state here
    // const root = $getRoot();
    // const selection = $getSelection();
    // console.log(root, selection);
  });
}

const Editor: React.FC = () => {
  return (
    <div className="flex-1 p-8 overflow-auto flex justify-center items-start">
      <div className="bg-white w-full max-w-screen-md min-h-[1100px] rounded-lg shadow-xl p-12 text-black relative">
        <LexicalComposer initialConfig={editorConfig}>
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
        </LexicalComposer>
      </div>
    </div>
  );
};

export default Editor;