import { PRIMARY, SUCCESS, ERROR } from '@constants/colors';
import { formatTime } from '@utils/date';

export const getColor = ({ isCreated, isComplete }) => {
  if (isCreated) {
    return SUCCESS;
  } else if (isComplete) {
    return PRIMARY;
  } else {
    return ERROR;
  }
};

export const getMatchResult = ({ isComplete, homeScore, awayScore, time }) => {
  if (isComplete) {
    return `${homeScore} - ${awayScore}`;
  } else if (time) {
    return formatTime(time.millis);
  } else {
    return '-';
  }
};
