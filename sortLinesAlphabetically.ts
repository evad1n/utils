type Props = {
  text: string;
  commentLines?: string[];
};

const COMMENT_LINES_JS = ["/", "*", "/"];

type GroupedLine = {
  line: string;
  comments: string[];
};

function compareFn(a: GroupedLine, b: GroupedLine) {
  if (a.line < b.line) {
    return -1;
  }
  if (a.line > b.line) {
    return 1;
  }
  return 0;
}

const sortLinesAlphabetically = ({
  text,
  commentLines = COMMENT_LINES_JS,
}: Props) => {
  const lines = text.split("\n").filter(Boolean);

  // Parse and group by comments to preserve comments
  const groupedLines: GroupedLine[] = [];
  let currentComments: string[] = [];
  for (const line of lines) {
    const firstChar = line.trim()[0];
    if (commentLines.includes(firstChar)) {
      currentComments.push(line);
      continue;
    }

    // This line is real
    groupedLines.push({
      comments: currentComments,
      line,
    });
    currentComments = [];
  }

  const sorted = groupedLines.sort(compareFn);

  return sorted.reduce((a, c) => {
    const string = [a, ...c.comments, c.line].join("\n");
    return string;
  }, "");
};

const input = `
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

console.log(
  sortLinesAlphabetically({
    text: input,
  })
);
