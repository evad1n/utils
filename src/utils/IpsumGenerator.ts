const DEFAULT_SENTENCE_ENDINGS = [".", "!", "?"];
const DEFAULT_PUNCTUATION = [",", ";"];

type ConstructorArgs = {
  words: string[];
  /**
   * @default [".", "!", "?"]
   */
  sentenceEndings?: string[];
  /**
   * @default [",", ";"]
   */
  punctuation?: string[];
};

export class IpsumGenerator {
  words: string[];
  sentenceEndings: string[];
  punctuation: string[];
  allPunctuation: string[];

  constructor({
    words,
    sentenceEndings = DEFAULT_SENTENCE_ENDINGS,
    punctuation = DEFAULT_PUNCTUATION,
  }: ConstructorArgs) {
    this.words = words;
    this.sentenceEndings = sentenceEndings;
    this.punctuation = punctuation;
    this.allPunctuation = [...sentenceEndings, ...punctuation];
  }

  generate(numParagraphs: number): string[] {
    const paragraphs = [];

    for (let i = 0; i < numParagraphs; i++) {
      paragraphs.push(this.generateParagraph());
    }

    return paragraphs;
  }

  protected generateParagraph(): string {
    let paragraph = "";

    const numSentences = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < numSentences; i++) {
      paragraph += this.generateSentence();
    }

    return paragraph;
  }

  protected generateSentence(): string {
    let sentence = "";
    let wordIndex = 0;
    let nextToken = this.generateNextToken(true);
    while (!this.isSentenceEnding(nextToken)) {
      if (this.isPunctuation(nextToken)) {
        sentence = sentence.trim();
      }
      sentence += nextToken;
      sentence += " ";
      wordIndex++;
      const lastToken = nextToken;
      nextToken = this.generateNextToken(
        wordIndex < 3 || this.isPunctuation(lastToken)
      );
    }
    sentence = sentence.trim();
    sentence += nextToken;
    sentence += " ";
    return sentence;
  }

  protected generateNextToken(alwaysWord = false) {
    if (alwaysWord) {
      return this.generateWord();
    }

    // Weighted random chance to select a word or punctuation
    const rand = Math.floor(Math.random() * 100);
    if (rand <= 10) {
      const randIndex = Math.floor(Math.random() * this.sentenceEndings.length);
      return this.sentenceEndings[randIndex];
    } else if (rand <= 20) {
      const randIndex = Math.floor(Math.random() * this.punctuation.length);
      return this.punctuation[randIndex];
    } else {
      return this.generateWord();
    }
  }

  protected generateWord() {
    const randIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randIndex];
  }

  protected isPunctuation(token: string) {
    return this.allPunctuation.includes(token);
  }

  protected isSentenceEnding(token: string) {
    return this.sentenceEndings.includes(token);
  }
}
