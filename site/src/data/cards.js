/**
 * Dynamic Contributor Card Loader
 * Loads all JSON files placed in /cards/*.json at build time.
 */

// Vite glob import for all cards in root /cards directory
const rawCardModules = import.meta.glob('../../../cards/*.json', { eager: true });

export function getAllCards() {
  const cardsList = [];

  for (const [filePath, module] of Object.entries(rawCardModules)) {
    try {
      const data = module.default || module;
      const filename = filePath.split('/').pop();
      cardsList.push({
        ...data,
        _filename: filename,
        // Fallback avatar to GitHub's default avatar if omitted
        avatar: data.avatar || `https://github.com/${data.github}.png`,
        skills: Array.isArray(data.skills) ? data.skills : [],
        links: data.links || {},
        joinedDate: data.joinedDate || '2026-01-01',
      });
    } catch (err) {
      console.error(`Failed to load card from ${filePath}:`, err);
    }
  }

  // Sort by default: most recent or alphabet
  return cardsList;
}

export const initialCards = getAllCards();
