

const applyMatch = (entries, match) => {
  return entries.map(entry => ({ ...entry, pts: entry.pts + 0.5 }));
};

export const applyMatches = (entries = [], matches = []) => {
  return matches.reduce((memo, match) => applyMatch(memo, match), entries);
};
