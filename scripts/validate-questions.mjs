import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const context = { window: {} };
const run = (file) => runInNewContext(readFileSync(resolve(root, file), 'utf8'), context, { filename: file });

run('questions.js');
const baseline = [...context.window.QUESTION_BANK];
run('questions-extra.js');
const combined = context.window.QUESTION_BANK;
const added = combined.slice(baseline.length);
const failures = [];
const fail = (message) => failures.push(message);
const normalize = (value) => String(value).toLowerCase()
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ').trim();
const dims = (items) => {
  const result = new Map();
  for (const item of items) {
    const key = JSON.stringify([item.category, item.difficulty]);
    result.set(key, (result.get(key) ?? 0) + 1);
  }
  return result;
};

if (baseline.length !== 2673) fail('Original bank count changed: ' + baseline.length);
if (added.length !== 2673) fail('Supplementary count is not 2673: ' + added.length);
if (combined.length !== 5346) fail('Combined count is not 5346: ' + combined.length);

const originalDimensions = dims(baseline);
const newDimensions = dims(added);
for (const [key, count] of originalDimensions) {
  if (newDimensions.get(key) !== count) {
    fail('Category/difficulty count not doubled: ' + key + ' (' + count + ' vs ' + newDimensions.get(key) + ')');
  }
}
for (const key of newDimensions.keys()) {
  if (!originalDimensions.has(key)) fail('Unexpected category/difficulty: ' + key);
}

const expectedCategories = [
  'Geography', 'Science', 'History', 'Arts & Culture', 'Sport',
  'Entertainment', 'Technology', 'Food & Drink', 'Australia', 'Music'
];
const actualCategories = [...new Set(combined.map(q => q.category))].sort();
if (JSON.stringify(actualCategories) !== JSON.stringify(expectedCategories.sort())) {
  fail('Unexpected category list: ' + actualCategories.join(', '));
}

const seenIds = new Set();
const originalPrompts = new Set(baseline.map(q => normalize(q.q)));
const newPrompts = new Set();
for (const item of combined) {
  if (!Number.isSafeInteger(item.id) || seenIds.has(item.id)) fail('Missing or repeated ID: ' + item.id);
  seenIds.add(item.id);
  if (!item.q || typeof item.q !== 'string' || !item.q.trim().endsWith('?')) fail('Invalid question at ID ' + item.id);
  if (!Array.isArray(item.options) || item.options.length !== 4 ||
      item.options.some(opt => typeof opt !== 'string' || !opt.trim()) ||
      new Set(item.options.map(opt => opt.trim().toLowerCase())).size !== 4) {
    fail('Invalid answer choices at ID ' + item.id);
  }
  if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer > 3) {
    fail('Invalid correct answer index at ID ' + item.id);
  }
}
for (let id = 1; id <= 5346; id++) {
  if (!seenIds.has(id)) fail('Missing ID ' + id);
}
for (const item of added) {
  const key = normalize(item.q);
  if (originalPrompts.has(key) || newPrompts.has(key)) fail('Duplicate added question at ID ' + item.id);
  newPrompts.add(key);
  if (/[\u2013\u2014\u2011\u2212]/.test(item.q + item.options.join(' '))) {
    fail('Non-ASCII dash in supplementary question ' + item.id);
  }
}

if (failures.length) {
  console.error(failures.slice(0, 50).join('\n'));
  console.error('FAILED: ' + failures.length + ' validation errors');
  process.exitCode = 1;
} else {
  console.log('PASS: ' + combined.length + ' questions, ' + actualCategories.length +
    ' categories, double the original difficulty totals, no duplicated new prompts.');
  console.log('Note: automated checks do not replace factual or editorial review.');
}
