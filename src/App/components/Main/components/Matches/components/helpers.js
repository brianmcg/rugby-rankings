import { PRIMARY, SUCCESS, ERROR } from '@constants/colors';
import { formatTime } from '@utils/date';

export function getColor({ isCreated, isUpdated, isComplete }) {
  if (isCreated || isUpdated) {
    return SUCCESS;
  } else if (isComplete) {
    return PRIMARY;
  } else {
    return ERROR;
  }
}

export function getMatchResult({ isComplete, homeScore, awayScore, time }) {
  if (isComplete) {
    return `${homeScore} - ${awayScore}`;
  }
    return 'vs';
  
}
