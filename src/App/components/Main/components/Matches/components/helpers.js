import { colors } from '@constants/colors';
import { formatTime } from '@utils/date';

export const getColor = ({ isCreated, isComplete }) => {
  if (isCreated) {
    return colors.success;
  } else if (isComplete) {
    return colors.primary;
  } else {
    return colors.error;
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
