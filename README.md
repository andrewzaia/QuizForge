# QuizForge

**Pick up. Play. Test your knowledge.**

QuizForge is a lightweight, responsive quiz platform designed around one simple idea: **getting into a quiz should be quick**.

Open the site, hit **Play Now**, and immediately start a randomized 10-question General Knowledge quiz. No account, setup, or configuration is required.

For players who want more control, QuizForge also includes a **Custom Quiz** mode with configurable topics, difficulty levels, question counts, and optional player or team names.

## Quick Play

Select **Play Now** and QuizForge automatically creates a:

- 10-question quiz
- General Knowledge round
- Mixed difficulty
- Randomized question selection
- Randomized answer order

Finish the round, review your performance, and select **Play Again** to immediately generate another quiz.

## Custom Quiz

Players who want a more specific challenge can select **Custom Quiz** and configure:

- Topic
- Difficulty
- Number of questions
- Optional player or team name

## Topics

QuizForge supports an expandable category system, including:

- General Knowledge
- Geography
- Science
- History
- Arts & Culture
- Sport
- Entertainment
- Technology
- Food & Drink
- Australia
- Music

General Knowledge acts as the main mixed category, drawing questions from across the available topics.

## Features

- One-click Quick Play
- General Knowledge default mode
- Multiple quiz topics
- Easy, Medium and Hard difficulty levels
- Mixed difficulty rounds
- Configurable quiz lengths
- Randomized questions and answers
- Live score and progress tracking
- Immediate answer feedback
- Final score and percentage
- Topic-by-topic performance breakdown
- Full answer review
- Local high-score leaderboard
- Optional player/team names
- Responsive desktop and mobile interface
- No account or backend required
- GitHub Pages compatible
- Expandable question database

## Project Structure

```text
QuizForge/
├── index.html
├── styles.css
├── app.js
└── questions.js
```

The question bank is deliberately separated into `questions.js` so QuizForge can continue growing without major changes to the quiz engine.

## Expanding the Question Bank

New questions can be added directly to `questions.js`.

```javascript
{
    category: "History",
    difficulty: "medium",
    question: "In which year did the Berlin Wall fall?",
    answers: ["1987", "1988", "1989", "1991"],
    correct: 2
}
```

## GitHub Pages

QuizForge is completely static and can be hosted directly through GitHub Pages.

1. Create a GitHub repository named `QuizForge`.
2. Upload the project files to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

The resulting address follows this format:

```text
https://USERNAME.github.io/QuizForge/
```

## Future Development

QuizForge is structured to support features such as larger question banks, more categories, timed modes, team-vs-team play, hosted quiz nights, picture rounds, true/false and multiple-answer questions, themed packs, streaks, bonus points, tie breakers, lifelines, statistics, exportable results, and seasonal quizzes.

## Philosophy

QuizForge should always remain easy to start.

**Open QuizForge → Play Now → Start Quiz.**

No unnecessary setup. Just questions.

---

**QuizForge**  
*Pick up. Play. Test your knowledge.*
