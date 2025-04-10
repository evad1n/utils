import { useState } from "react";

import TextareaAutosize from "react-textarea-autosize";

import styles from "./index.module.scss";

import { IpsumGenerator } from "src/utils/IpsumGenerator";

export default function Page() {
  const [wordsRaw, setWordsRaw] = useState("");
  const [numParagraphs, setNumParagraphs] = useState(5);
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const words = wordsRaw
    .split("\n")
    .map(word => word.trim())
    .filter(word => word.length > 0);

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
          onChange={e => setWordsRaw(e.target.value)}
        />
      </label>

      <label>
        <p>Number of paragraphs</p>
        <input
          type="number"
          value={numParagraphs}
          onChange={e => setNumParagraphs(parseInt(e.target.value))}
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
