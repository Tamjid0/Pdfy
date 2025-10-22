import { DecoratorNode, type LexicalEditor, type LexicalNode, type NodeKey, type SerializedLexicalNode } from 'lexical';
import * as React from 'react';
import { Suspense } from 'react';

const KatexRenderer = React.lazy(() => import('../components/KatexRenderer'));

interface SerializedMathNode extends SerializedLexicalNode {
  value: string;
  equation: string;
  type: 'math';
  version: 1;
}

export class MathNode extends DecoratorNode<React.ReactElement> {
  __value: string;
  __equation: string;

  static getType(): string {
    return 'math';
  }

  static clone(node: MathNode): MathNode {
    return new MathNode(node.__value, node.__equation, node.__key);
  }

  constructor(value: string, equation: string, key?: NodeKey) {
    super(key);
    this.__value = value;
    this.__equation = equation;
  }

  getValue(): string {
    return this.__value;
  }

  getEquation(): string {
    return this.__equation;
  }

  createDOM(): HTMLElement {
    const element = document.createElement('span');
    element.className = 'editor-math-node';
    return element;
  }

  updateDOM(prevNode: MathNode, dom: HTMLElement, editor: LexicalEditor): boolean {
    return prevNode.__value !== this.__value || prevNode.__equation !== this.__equation;
  }

  decorate(editor: LexicalEditor): React.ReactElement {
    return (
      <Suspense fallback={null}>
        <KatexRenderer equation={this.__equation} />
      </Suspense>
    );
  }

  static importJSON(serializedNode: SerializedMathNode): MathNode {
    const node = $createMathNode(serializedNode.value, serializedNode.equation);
    return node;
  }

  exportJSON(): SerializedMathNode {
    return {
      value: this.getValue(),
      equation: this.getEquation(),
      type: 'math',
      version: 1,
    };
  }
}

export function $createMathNode(value: string, equation: string): MathNode {
  return new MathNode(value, equation);
}

export function $isMathNode(node: LexicalNode | null | undefined): node is MathNode {
  return node instanceof MathNode;
}
