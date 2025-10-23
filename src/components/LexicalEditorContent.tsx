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
      editor.update(() => {
        $getRoot().clear(); // Clear existing content
        const nodes = chatContentToInsert.map(item => {
          if (item.type === 'user') {
            const paragraphNode = $createParagraphNode();
            paragraphNode.append($createTextNode(item.content));
            return paragraphNode;
          } else if (item.type === 'bot') {
            // Simple check for code in the bot message
            if (item.content.includes('`')) {
              const codeNode = $createCodeNode('javascript');
              codeNode.append($createTextNode(item.content.replace(/`/g, '')));
              return codeNode;
            } else {
              const paragraphNode = $createParagraphNode();
              paragraphNode.append($createTextNode(item.content));
              return paragraphNode;
            }
          }
          return null;
        }).filter(Boolean);

        if (nodes.length > 0) {
          $getRoot().append(...nodes);
        }
      });
    }
  }, [chatContentToInsert, editor]);

  const insertMathNode = (equation: string) => {
    editor.update(() => {
      const mathNode = $createMathNode('', equation);
      $insertNodes([mathNode]);
    });
  };

  const insertTextBlock = () => {
    editor.update(() => {
      const paragraphNode = $createParagraphNode();
      $insertNodes([paragraphNode]);
    });
  };

  const insertCodeBlock = () => {
    editor.update(() => {
      // For code blocks, we can insert a CodeNode, optionally with a default language
      const codeNode = $createCodeNode('javascript');
      $insertNodes([codeNode]);
    });
  };

  const insertImageBlock = (src: string, altText: string) => {
    editor.update(() => {
      const imageNode = $createImageNode(src, altText);
      $insertNodes([imageNode]);
    });
  };

  const clearEditor = () => {
    editor.update(() => {
      $getRoot().clear();
    });
  };

  // Pass the insert functions to the parent (Editor)
  React.useEffect(() => {
    onInsertMathNode(insertMathNode);
    onInsertTextBlock(insertTextBlock);
    onInsertCodeBlock(insertCodeBlock);
    onInsertImageBlock(insertImageBlock);
    onClearEditor(clearEditor);
  }, [onInsertMathNode, onInsertTextBlock, onInsertCodeBlock, onInsertImageBlock, onClearEditor, insertMathNode, insertTextBlock, insertCodeBlock, insertImageBlock, clearEditor]);

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