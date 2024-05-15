export function getColor({ isCreated, isUpdated, isComplete }, { success, primary, error }) {
  if (isCreated || isUpdated) {
    return success.main;
  } else if (isComplete) {
    return primary.main;
  } else {
    return error.main;
  }
}

export function getMatchResult({ isComplete, homeScore, awayScore }) {
  if (isComplete) {
    return `${homeScore} - ${awayScore}`;
  }

  return 'vs';
}
