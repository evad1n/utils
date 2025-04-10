import { useState } from "react";

import { generatedRussIpsum } from "src/utils/generatedRussIpsum";
import styles from "./index.module.scss";

export default function Page() {
  const [numParagraphs, setNumParagraphs] = useState(5);
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const generate = () => {
    const paragraphs = generatedRussIpsum(numParagraphs);
    setParagraphs(paragraphs);
  };

  return (
    <div className={styles.page}>
      <label>
        <p>Number of paragraphs</p>
        <input
          type="number"
          value={numParagraphs}
          onChange={e => setNumParagraphs(parseInt(e.target.value))}
        />
      </label>

      <button onClick={generate}>Generate</button>

      <div>
        <p>Output:</p>
        <div className={styles.output}>
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
