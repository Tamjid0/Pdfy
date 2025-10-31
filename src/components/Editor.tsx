






import { LexicalComposer } from '@lexical/react/LexicalComposer';



import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';



import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';







import { HeadingNode, QuoteNode } from '@lexical/rich-text';



import { ListItemNode, ListNode } from '@lexical/list';



import { CodeNode, CodeHighlightNode } from '@lexical/code';



import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';



import { AutoLinkNode, LinkNode } from '@lexical/link';



import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';



import { $getRoot, LineBreakNode } from 'lexical';



import { MathNode } from '../nodes/MathNode.tsx';



import { ImageNode } from '../nodes/ImageNode.tsx'; // Import ImageNode



import LexicalEditorContent from './LexicalEditorContent';



import { useEffect } from 'react';



import { $generateNodesFromDOM, $generateHtmlFromNodes } from '@lexical/html';







import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';










interface EditorProps {



  onInsertMathNode: (insertMathNode: (equation: string) => void) => void;



  onInsertTextBlock: (insertTextBlock: () => void) => void;



  onInsertCodeBlock: (insertCodeBlock: () => void) => void;



  onInsertImageBlock: (insertImageBlock: (src: string, altText: string) => void) => void; // Add onInsertImageBlock



  onClearEditor: (clearEditor: () => void) => void;



  chatContentToInsert: any[] | null;



  htmlContent: string | null;



  onEditorChange: (html: string) => void;



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







const Editor: React.FC<EditorProps> = ({ onInsertMathNode, onInsertTextBlock, onInsertCodeBlock, onInsertImageBlock, onClearEditor, chatContentToInsert, htmlContent, onEditorChange }) => {



  return (



    <div className="flex-1 p-8 overflow-auto flex justify-center items-start">



      <div className="bg-white w-[794px] h-[1122px] rounded-lg shadow-xl p-12 text-black relative overflow-y-auto">



        <LexicalComposer initialConfig={editorConfig}>



          <LexicalEditorContent



            onInsertMathNode={onInsertMathNode}



            onInsertTextBlock={onInsertTextBlock}



            onInsertCodeBlock={onInsertCodeBlock}



            onInsertImageBlock={onInsertImageBlock}



            onClearEditor={onClearEditor}



            chatContentToInsert={chatContentToInsert}



          />



          <HtmlPlugin html={htmlContent} />



                    <OnChangePlugin onChange={(editorState, editor) => {



          



          



                      editorState.read(() => {



          



          



                        const html = $generateHtmlFromNodes(editor, null);



          



          



                        onEditorChange(html);



          



          



                      });



          



          



                    }} />







        </LexicalComposer>



      </div>



    </div>



  );



};







function HtmlPlugin({ html }: { html: string | null }) {



  const [editor] = useLexicalComposerContext();







  useEffect(() => {



    if (html) {



      editor.update(() => {



        const parser = new DOMParser();



        const dom = parser.parseFromString(html, 'text/html');



        const nodes = $generateNodesFromDOM(editor, dom);



        $getRoot().select();



        $getRoot().clear();



        $getRoot().append(...nodes);



      });



    }



  }, [html, editor]);







  return null;



}







export default Editor;




