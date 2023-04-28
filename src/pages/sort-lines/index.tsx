import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { sortLinesAlphabetically } from "src/utils/sortLinesAlphabetically";

import styles from "./index.module.scss";

export default function Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    const formatted = sortLinesAlphabetically({
      text: input,
    });

    setOutput(formatted);
  };

  return (
    <div className={styles.page}>
      <label>
        <p>Input</p>
        <TextareaAutosize
          minRows={20}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </label>

      <button onClick={format}>Format</button>

      <div>
        <p>Output:</p>
        <TextareaAutosize value={output} minRows={20} />
      </div>
    </div>
  );
}
