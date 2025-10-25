import React, { useEffect } from 'react';
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
import { $createParagraphNode, $createTextNode, $getRoot, $insertNodes } from 'lexical';
import { CodeNode } from '@lexical/code'; // Import CodeNode to use $createCodeNode
import { $createCodeNode } from '@lexical/code'; // Explicitly import $createCodeNode
import { $createMathNode } from '../nodes/MathNode.tsx';
import { $createImageNode } from '../nodes/ImageNode.tsx'; // Import $createImageNode

interface LexicalEditorContentProps {
  onInsertMathNode: (insertMathNode: (equation: string) => void) => void;
  onInsertTextBlock: (insertTextBlock: () => void) => void;
  onInsertCodeBlock: (insertCodeBlock: () => void) => void;
  onInsertImageBlock: (insertImageBlock: (src: string, altText: string) => void) => void;
  onClearEditor: (clearEditor: () => void) => void;
  chatContentToInsert: any[] | null;
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

const LexicalEditorContent: React.FC<LexicalEditorContentProps> = ({ onInsertMathNode, onInsertTextBlock, onInsertCodeBlock, onInsertImageBlock, onClearEditor, chatContentToInsert }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (chatContentToInsert) {
      console.log('chatContentToInsert received:', chatContentToInsert); // Debug log
      editor.update(() => {
        $getRoot().clear(); // Clear existing content
        const nodes = chatContentToInsert.map(item => {
          const paragraphNode = $createParagraphNode();
          const authorNode = $createTextNode(`**${item.author}**: `);
          authorNode.setFormat('bold');
          const contentNode = $createTextNode(item.content);
          paragraphNode.append(authorNode, contentNode);
          return paragraphNode;
        }).filter(Boolean);

        console.log('Nodes to append:', nodes); // Debug log

        if (nodes.length > 0) {
          $getRoot().append(...nodes);
        }
      });
    }
  }, [chatContentToInsert, editor]);

  const insertMathNode = React.useCallback((equation: string) => {
    editor.update(() => {
      const mathNode = $createMathNode('', equation);
      $insertNodes([mathNode]);
    });
  }, [editor]);

  const insertTextBlock = React.useCallback(() => {
    editor.update(() => {
      const paragraphNode = $createParagraphNode();
      $insertNodes([paragraphNode]);
    });
  }, [editor]);

  const insertCodeBlock = React.useCallback(() => {
    editor.update(() => {
      // For code blocks, we can insert a CodeNode, optionally with a default language
      const codeNode = $createCodeNode('javascript');
      $insertNodes([codeNode]);
    });
  }, [editor]);

  const insertImageBlock = React.useCallback((src: string, altText: string) => {
    editor.update(() => {
      const imageNode = $createImageNode(src, altText);
      $insertNodes([imageNode]);
    });
  }, [editor]);

  const clearEditor = React.useCallback(() => {
    editor.update(() => {
      $getRoot().clear();
    });
  }, [editor]);

  // Pass the insert functions to the parent (Editor)
  React.useEffect(() => {
    onInsertMathNode(insertMathNode);
    onInsertTextBlock(insertTextBlock);
    onInsertCodeBlock(insertCodeBlock);
    onInsertImageBlock(insertImageBlock);
    onClearEditor(clearEditor);
  }, [onInsertMathNode, onInsertTextBlock, onInsertCodeBlock, onInsertImageBlock, onClearEditor]);

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
    </div>
  );
};

export default LexicalEditorContent;