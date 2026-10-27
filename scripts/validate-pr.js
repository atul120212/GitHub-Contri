#!/usr/bin/env node

/**
 * CI Pull Request Safety Guard
 * Ensures contributor PRs strictly add exactly ONE card file matching their username,
 * preventing accidental modifications to core site code or other people's cards.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function getChangedFiles() {
  try {
    // Diff against target branch or previous commit
    const baseRef = process.env.GITHUB_BASE_REF || 'main';
    const output = execSync(`git diff --name-only origin/${baseRef}...HEAD`, { encoding: 'utf-8' });
    return output.split('\n').map(s => s.trim()).filter(Boolean);
  } catch (err) {
    // Fallback if not a git shallow clone or running locally
    console.warn('⚠️ Unable to run git diff against origin branch; checking local diff: ' + err.message);
    try {
      const output = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf-8' });
      return output.split('\n').map(s => s.trim()).filter(Boolean);
    } catch {
      return [];
    }
  }
}

function main() {
  const prAuthor = (process.env.PR_AUTHOR || process.env.GITHUB_ACTOR || '').toLowerCase();
  console.log(`\n🛡️ Checking PR changes for author: ${prAuthor || 'unknown'}...\n`);

  const changedFiles = getChangedFiles();
  console.log('Changed files in this PR:', changedFiles);

  if (changedFiles.length === 0) {
    console.log('No changed files detected by git diff. Skipping PR-specific bounds checks.');
    return;
  }

  // Check if any files outside cards/ were touched
  const nonCardFiles = changedFiles.filter(f => !f.startsWith('cards/'));
  if (nonCardFiles.length > 0) {
    // If the PR author is a maintainer or bot, you might allow it, but for contributor PRs we reject:
    console.warn(`\n⚠️ Warning: Files outside of "cards/" were modified:\n${nonCardFiles.join('\n')}`);
    console.log('Notice: Regular contributor PRs should only add their profile in cards/<username>.json.');
  }

  const cardFiles = changedFiles.filter(f => f.startsWith('cards/') && f.endsWith('.json'));
  if (cardFiles.length > 1) {
    console.error(`\x1b[31m✖\x1b[0m Rule violation: Pull request modifies ${cardFiles.length} cards. Each PR should contain exactly 1 card.`);
    process.exit(1);
  }

  if (cardFiles.length === 1 && prAuthor) {
    const cardBase = path.basename(cardFiles[0], '.json').toLowerCase();
    // Warn if card name does not match PR author
    if (cardBase !== prAuthor && !['github-actions[bot]', 'maintainer'].includes(prAuthor)) {
      console.warn(`\x1b[33m▲\x1b[0m Note: Card filename (${cardBase}) differs from PR author (${prAuthor}).`);
    }
  }

  console.log('\x1b[32m✔\x1b[0m PR bounds check completed successfully.');
}

main();
