import { IpsumGenerator } from "src/utils/IpsumGenerator";

const russWords = [
  "raspberry pi",
  "cambridge",
  "harvard",
  "red-black tree",
  "self-balancing",
  "lisp",
  "JVM",
  "Nancy",
  "foccacia bread",
  "chestnut trees",
  "pubs",
  "See's Candies",
  "pubs",
  "borscht",
  "dropouts",
  "RISC-V",
  "Intel",
  "binary",
  "distributed",
  "Golang",
];

class RussIpsumGenerator extends IpsumGenerator {
  constructor() {
    super({
      words: russWords,
    });
  }

  protected generateParagraph(): string {
    let paragraph = super.generateParagraph();

    paragraph = paragraph.trim().slice(0, -1);
    paragraph += ", any questions?";

    return paragraph;
  }
}

export const generatedRussIpsum = (numParagraphs: number): string[] => {
  const generator = new RussIpsumGenerator();
  const paragraphs = generator.generate(numParagraphs);
  return paragraphs;
};
