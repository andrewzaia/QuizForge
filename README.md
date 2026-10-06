# QuizForge

**Pick up. Play. Test your knowledge.**

QuizForge is a lightweight, responsive quiz platform built around quick pick-up-and-play trivia. Hit **Play Now** for an immediate 10-question General Knowledge round, or open **Custom Quiz** to choose a category, difficulty and round length.

## Question Bank

The included bank contains **2,673 questions** across 10 categories. The totals are intentionally uneven so the database feels more organic rather than forcing every category into an identical size:

- Geography — 317
- Science — 291
- History — 268
- Arts & Culture — 236
- Sport — 263
- Entertainment — 258
- Technology — 247
- Food & Drink — 239
- Australia — 278
- Music — 276

Difficulty is also deliberately mixed rather than evenly divided:

- Easy — 993
- Medium — 916
- Hard — 764

General Knowledge automatically draws from the entire bank. The bank contains no exact duplicate question prompts, and includes alternate formulations and reverse-association questions to improve replay variety alongside newly added trivia.

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
- 2,673-question expandable bank
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
  id: 2674,
  category: "History",
  difficulty: "Medium",
  q: "Your question goes here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  answer: 0
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
