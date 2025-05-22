import ts from "typescript";

type Props = {
  text: string;
};

type GroupedLine = {
  comments: string;
  code: string;
  fullText: string;
};

export const sortLinesAlphabetically = ({ text }: Props) => {
  // Load into ts
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    text,
    ts.ScriptTarget.Latest,
    true
  );

  // Collect property signatures and their JSDoc
  const groups: GroupedLine[] = [];
  const lines = text.split("\n");

  function getText(start: number, end: number) {
    // Get the text from the original input
    return lines.slice(start - 1, end).join("\n");
  }

  function visit(node: ts.Node) {
    if (ts.isPropertySignature(node) || ts.isMethodSignature(node)) {
      const comments = [];

      if ("jsDoc" in node) {
        const jsDoc = node.jsDoc as any;

        if (Array.isArray(jsDoc)) {
          for (const doc of jsDoc) {
            if (ts.isJSDoc(doc)) {
              const commentText = doc.getText();
              comments.push(commentText);
            }
          }
        }
      }

      const codeText = node.getText();

      groups.push({
        comments: comments.join("\n"),
        code: codeText,
        fullText: node.getFullText(),
      });
    }

    if (ts.isExpressionStatement(node)) {
      const comments = [];

      if ("jsDoc" in node) {
        const jsDoc = node.jsDoc as any;

        if (Array.isArray(jsDoc)) {
          for (const doc of jsDoc) {
            if (ts.isJSDoc(doc)) {
              const commentText = doc.getText();
              comments.push(commentText);
            }
          }
        }
      }

      const codeText = node.getText();

      groups.push({
        comments: comments.join("\n"),
        code: codeText,
        fullText: node.getFullText(),
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  // Sort by property name
  groups.sort((a, b) => a.code.localeCompare(b.code));

  // Join the sorted code blocks
  const sortedCode = groups
    .map(group => {
      const { fullText } = group;

      return fullText;
    })
    .join("");

  return sortedCode;
};

const testInput1 = `
/**
 * @param resetOnSwitchStoreId Whether to reset pagination when the store changes.
 * @default true
 */
resetOnSwitchStoreId?: boolean;
/**
 * @param hasNextPage
 * @default true
 */
hasNextPage?: boolean;
/**
 * @param hasNextPage
 * @default true unless currentPage is 1
 */
hasPreviousPage?: boolean;
`;

const testInput2 = `
listElements(): Promise<CanvasElementNode[]>;
copyElement(elementId: string): Promise<CanvasElementNode>;
copyElementUpstream(elementId: string): Promise<CanvasElementNode[]>;
/**
 * dookie
 */
copyElementDownstream(elementId: string): Promise<CanvasElementNode[]>;
peekList(
  elementId: string,
  showDiscards: boolean,
  version?: number
): Promise<PeekListRowData[]>;
getHistory(elementId: string): Promise<ElementHistory[]>;
listNewEvents(): Promise<ElementEvent[]>;
uploadAndProcessElement(elementId: string, file: File): Promise<void>;
processElement(elementId: string): Promise<void>;
getProcessingStatus(canvasId: string): Promise<CanvasElementProcessingStatuses>;
listTags(): Promise<string[]>;
getNode(elementId: string): Promise<CanvasElementNode>;
createElement(
  type: NodeType,
  canvasId: string,
  inputs: string[]
): Promise<CanvasElementNode>;
createElementUpstream(
  type: NodeType,
  canvasId: string,
  output: string
): Promise<CanvasElementNode>;
updateElement(
  elementId: string,
  inputs: string[],
  discards: boolean[]
): Promise<CanvasElementNode>;
addElementInput(elementId: string, newInputId: string): Promise<CanvasElementNode>;
deleteElement(elementId: string): Promise<void>;
deleteElements(elementIds: string[]): Promise<void>;
removeElementInput(elementId: string, idToRemove: string): Promise<CanvasElementNode>;
listEvents(elementId: string, startDate: Date, tag?: string): Promise<Event[]>;
getKeptRecords(params: DockGetRecordsParams): Promise<PaginatedRecord>;
getDiscardedRecords(params: DockGetRecordsParams): Promise<PaginatedRecord>;
getCanvas(canvasID: string): Promise<CanvasElementNodeGroup>;
createCanvas(name: string): Promise<CanvasCreateOrEditResponse>;
listCanvases(): Promise<Canvas[]>;
updateCanvas(canvasId: string, name: string): Promise<CanvasCreateOrEditResponse>;
deleteCanvas(canvasId: string): Promise<void>;
rerunLastEventForEntrypoint(entrypointId: string): Promise<void>;
`;

const testInput3 = `
export interface DockApi {
  /**
   * dookie
   */
  copyElementDownstream(elementId: string): Promise<CanvasElementNode[]>;
  listElements(): Promise<CanvasElementNode[]>;
  copyElement(elementId: string): Promise<CanvasElementNode>;
}
`;
