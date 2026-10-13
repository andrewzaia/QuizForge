# QuizForge

**Pick up. Play. Prove it.**

A free, browser-based trivia game built for quick rounds, friendly competition and testing what you know. No account, installation or setup required.

### [Play QuizForge online](https://andrewzaia.github.io/QuizForge/)

**Website:** https://andrewzaia.github.io/QuizForge/

Just open the link above in your browser and select **PLAY NOW** to jump straight into a quiz.

## How to play

**Quick Play** is the default. One click starts a new round with:

- 10 randomly selected General Knowledge questions
- Mixed difficulty
- Instant feedback on every answer
- A final score, topic breakdown, time statistics and answer review

Want to make your own round? Choose **CUSTOM QUIZ** to pick a category, select Easy, Medium, Hard or Mixed difficulty, choose 5, 10, 15 or 20 questions, and optionally enter a player or team name.

## What can you quiz yourself on?

QuizForge currently includes **2,673 questions** across 10 categories:

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

Selecting **General Knowledge** mixes questions from all categories. The question bank is designed for replayability, with varied topics and difficulty levels.

## Features

- **Quick to start:** Play without creating an account.
- **Customisable:** Choose your topic, difficulty and round length.
- **Track your progress:** See your score and question timer as you play, then review every answer and time spent on each question.
- **Timing statistics:** Review total answering time and average response time after every round.
- **Local high scores:** Keep a leaderboard in your browser, with an option to clear it.
- **Light and dark themes:** Switch with the sun/moon icon or follow your device's theme preference.
- **Mobile-friendly:** Play on desktop, tablet or phone.
- **Free to play:** No subscription, account or server-side setup needed.

Timing measures how long each question is awaiting an answer. Pauses between questions and time spent reading feedback are excluded from the total.

**Note:** High scores and manually chosen themes are saved in your browser when local storage is available. They may not appear on another device or after browser data is cleared.

## Want to explore the code?

QuizForge is a lightweight HTML, CSS and JavaScript website hosted with GitHub Pages. Its source is publicly available in this repository.

| File | Purpose |
| --- | --- |
| `index.html` | Quiz page and SEO metadata |
| `styles.css` | Layout, responsive styling and light/dark palettes |
| `app.js` | Gameplay, scoring and quiz controls |
| `theme.js` | Theme detection, switching and preference saving |
| `questions.js` | Trivia question bank |
| `sitemap.xml` | Search engine sitemap |

### Run it locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser, or serve the folder using a local static web server.
3. Start playing.

No build step, package manager or backend is required.

### Add a question

Questions live in `questions.js`. Follow the existing format:

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

Use a unique `id`, four answer options and a zero-based `answer` index (0-3). Keep questions accurate and avoid duplicate prompts.

## Feedback and suggestions

Found an incorrect answer or have an idea for a new quiz category? [Open an issue](https://github.com/andrewzaia/QuizForge/issues) to share feedback.

---

**Ready for a round? [Play QuizForge now.](https://andrewzaia.github.io/QuizForge/)**
