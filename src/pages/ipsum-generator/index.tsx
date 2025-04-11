import { useCallback, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";

import styles from "./index.module.scss";

import { useRouter } from "next/router";
import { IpsumGenerator } from "src/utils/IpsumGenerator";

export default function Page() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const { replace, query } = useRouter();

  const words = typeof query.words === "string" ? query.words.split(",") : [];
  const numParagraphs =
    typeof query.numParagraphs === "string"
      ? parseInt(query.numParagraphs, 10)
      : 5;

  const handleSetSearchParams = useCallback(
    (params: URLSearchParams) => {
      replace(
        {
          query: {
            ...query,
            ...Object.fromEntries(params.entries()),
          },
        },
        undefined,
        { shallow: true }
      );
    },
    [query, replace]
  );

  const wordsRaw = words.join("\n");

  const handleWordsRawChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const newWords = value.split("\n");

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("words", newWords.join(","));

    handleSetSearchParams(newSearchParams);
  };

  const handleNumParagraphsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const newNumParagraphs = parseInt(value, 10);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("numParagraphs", newNumParagraphs.toString());

    handleSetSearchParams(newSearchParams);
  };

  const handleGenerate = () => {
    const generator = new IpsumGenerator({
      words,
    });
    const paragraphs = generator.generate(numParagraphs);
    setParagraphs(paragraphs);
  };

  const handleCopyToClipboard = () => {
    const textToCopy = paragraphs.join("\n\n");
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div className={styles.page}>
      <label>
        <p>Words</p>
        <p>One word per line</p>
        <TextareaAutosize
          className={styles.textarea}
          minRows={20}
          value={wordsRaw}
          onChange={handleWordsRawChange}
        />
      </label>

      <label>
        <p>Number of paragraphs</p>
        <input
          type="number"
          value={numParagraphs}
          onChange={handleNumParagraphsChange}
        />
      </label>

      <div>
        <button onClick={handleGenerate}>Generate</button>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <p>Output:</p>
          <button onClick={handleCopyToClipboard}>Copy to clipboard</button>
        </div>
        <div className={styles.output}>
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
