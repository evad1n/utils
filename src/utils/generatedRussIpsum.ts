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

export const generatedRussIpsum = (numParagraphs: number): string[] => {
  const generator = new IpsumGenerator({
    words: russWords,
  });
  const paragraphs = generator.generate(numParagraphs);
  return paragraphs;
};
