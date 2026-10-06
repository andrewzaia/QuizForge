# QuizForge

**Pick up. Play. Test your knowledge.**

QuizForge is a lightweight, responsive quiz platform built around quick pick-up-and-play trivia. Hit **Play Now** for an immediate 10-question General Knowledge round, or open **Custom Quiz** to choose a category, difficulty and round length.

## Question Bank

The included bank contains **1,000 questions** across 10 categories:

- Geography — 100
- Science — 100
- History — 100
- Arts & Culture — 100
- Sport — 100
- Entertainment — 100
- Technology — 100
- Food & Drink — 100
- Australia — 100
- Music — 100

Each category contains **34 Easy, 33 Medium and 33 Hard** questions. General Knowledge automatically draws from the entire bank.

## Quick Play

Quick Play starts immediately with:

- 10 questions
- General Knowledge
- Mixed difficulty
- Randomised question selection
- No player setup required

## Custom Quiz

Custom Quiz supports:

- Optional team/player name
- Topic selection
- Easy, Medium, Hard or Mixed difficulty
- 5, 10, 15 or 20 question rounds

## Features

- One-click Quick Play
- 1,000-question expandable bank
- 10 categories
- Three difficulty levels
- Responsive desktop/mobile layout
- Live scoring and progress
- Immediate answer feedback
- Results and topic breakdown
- Full answer review
- Local high-score leaderboard
- GitHub Pages compatible
- No backend or account required
- Clickable QuizForge header returns to the home screen

## Project Structure

```text
QuizForge/
├── index.html
├── styles.css
├── app.js
├── questions.js
└── README.md
```

## Adding Questions

Add new entries to `questions.js` using the same schema:

```javascript
{
  id: 1001,
  category: "History",
  difficulty: "Medium",
  q: "In which year did the Berlin Wall fall?",
  options: ["1987", "1988", "1989", "1991"],
  answer: 2
}
```

`answer` is the **zero-based index** of the correct option.

## GitHub Pages

Deploy the repository from **Settings → Pages → Deploy from a branch**, using `main` and `/ (root)`.

The site URL follows this format:

```text
https://USERNAME.github.io/QuizForge/
```

---

**QuizForge** — *Pick up. Play. Prove it.*
