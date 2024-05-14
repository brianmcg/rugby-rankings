import { PRIMARY, SUCCESS, ERROR } from '@constants/colors';

export function getColor({ isCreated, isUpdated, isComplete }) {
  if (isCreated || isUpdated) {
    return SUCCESS;
  } else if (isComplete) {
    return PRIMARY;
  } else {
    return ERROR;
  }
}

export function getMatchResult({ isComplete, homeScore, awayScore }) {
  if (isComplete) {
    return `${homeScore} - ${awayScore}`;
  }

  return 'vs';
}
