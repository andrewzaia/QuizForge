# Additional question bank sources and reuse terms

QuizForge's original `questions.js` bank is preserved. The supplementary `questions-extra.js` file adds 2,673 questions across the ten existing categories.

## Third-party trivia sources

Some questions in `questions-extra.js` are adapted from the following openly licensed projects:

- **Open Trivia Database (OpenTDB)**: https://opentdb.com/ . Licence: [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/). The working source was a 6 November 2026 snapshot published in [Lawndlwd/quizz](https://github.com/Lawndlwd/quizz/blob/main/server/assets/opentdb.json), which identifies OpenTDB as the source and CC BY-SA 4.0 as its licence.
- **OpenTriviaQA**, maintained by [uberspot and contributors](https://github.com/uberspot/OpenTriviaQA): Licence: [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/).

Adaptations include selecting eligible questions, reformatting text, shuffling answer options, assigning QuizForge categories and difficulties, replacing ambiguous items, and removing duplicate or strongly overlapping prompts. QuizForge also includes newly authored questions, particularly for Australian places, programming, networking and cooking.

**The third-party question adaptations in `questions-extra.js` are shared under CC BY-SA 4.0.** This attribution does not change the licensing of the existing application code or the separate original `questions.js` file. Changes were made to the source material.

## Quality checks

Run `node scripts/validate-questions.mjs` to confirm the combined bank has 5,346 questions, exactly twice the original category and difficulty counts, valid unique IDs, four distinct choices, correct answer indices and no exact duplicated prompts involving additions.

Automated validation cannot establish the factual correctness of every trivia statement. If you find an ambiguous, outdated or inaccurate question, please report its ID with the proposed correction through the repository issue tracker.
