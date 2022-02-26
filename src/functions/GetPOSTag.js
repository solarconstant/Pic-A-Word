import { retext } from "retext";
import retextPos from "retext-pos";

const fullforms = {
  CC: "Coordinating conjunction",
  CD: "Cardinal number",
  DT: "Determiner",
  EX: "Existential there",
  FW: "Foreign word",
  IN: "Preposition or subordinating conjunction",
  JJ: "Adjective",
  JJR: "Adjective, comparative",
  JJS: "Adjective, superlative",
  LS: "List item marker",
  MD: "Modal",
  NN: "Noun, singular or mass",
  NNS: "Noun, plural",
  NNP: "Proper noun, singular",
  NNPS: "Proper noun, plural",
  PDT: "Predeterminer",
  POS: "Possessive ending",
  PRP: "Personal pronoun",
  PRP$: "Possessive pronoun",
  RB: "Adverb",
  RBR: "Adverb, comparative",
  RBS: "Adverb, superlative",
  RP: "Particle",
  SYM: "Symbol",
  TO: "to",
  UH: "Interjection",
  VB: "Verb, base form",
  VBD: "Verb, past tense",
  VBG: "Verb, gerund or present participle",
  VBN: "Verb, past participle",
  VBP: "Verb, non-3rd person singular present",
  VBZ: "Verb, 3rd person singular present",
  WDT: "Wh-determiner",
  WP: "Wh-pronoun",
  WP$: "Possessive wh-pronoun",
  WRB: "Wh-adverb",
};

const GetPOSTag = (word) => {
  if (word && word.length) {
    let pos;
    try {
      retext()
        .use(retextPos)
        .use(() => (tree) => {
          pos =
            fullforms[
              tree["children"][0]["children"][0]["children"][0]["data"][
                "partOfSpeech"
              ]
            ];
        })
        .process(word);
    } catch (err) {
      pos = null;
    }
    return pos;
  }
};

export default GetPOSTag;
