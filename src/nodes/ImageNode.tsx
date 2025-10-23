import { DecoratorNode, type LexicalEditor, type LexicalNode, type NodeKey, type SerializedLexicalNode } from 'lexical';
import * as React from 'react';
import { Suspense } from 'react';

const ImageRenderer = React.lazy(() => import('../components/ImageRenderer'));

interface SerializedImageNode extends SerializedLexicalNode {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  type: 'image';
  version: 1;
}

export class ImageNode extends DecoratorNode<React.ReactElement> {
  __src: string;
  __altText: string;
  __width?: number;
  __height?: number;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__width, node.__height, node.__key);
  }

  constructor(src: string, altText: string, width?: number, height?: number, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  getWidth(): number | undefined {
    return this.__width;
  }

  getHeight(): number | undefined {
    return this.__height;
  }

  createDOM(): HTMLElement {
    const element = document.createElement('span');
    element.className = 'editor-image-node';
    return element;
  }

  updateDOM(prevNode: ImageNode, dom: HTMLElement, editor: LexicalEditor): boolean {
    return prevNode.__src !== this.__src || prevNode.__altText !== this.__altText || prevNode.__width !== this.__width || prevNode.__height !== this.__height;
  }

  decorate(editor: LexicalEditor): React.ReactElement {
    return (
      <Suspense fallback={null}>
        <ImageRenderer src={this.__src} altText={this.__altText} width={this.__width} height={this.__height} />
      </Suspense>
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const node = $createImageNode(serializedNode.src, serializedNode.altText, serializedNode.width, serializedNode.height);
    return node;
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this.getSrc(),
      altText: this.getAltText(),
      width: this.getWidth(),
      height: this.getHeight(),
      type: 'image',
      version: 1,
    };
  }
}

export function $createImageNode(src: string, altText: string, width?: number, height?: number): ImageNode {
  return new ImageNode(src, altText, width, height);
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
