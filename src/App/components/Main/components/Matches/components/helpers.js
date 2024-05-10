import { colors } from '@constants/colors';

export const getColor = ({ isCreated, isComplete }) => {
  if (isCreated) {
    return colors.success;
  } else if (isComplete) {
    return colors.primary;
  } else {
    return colors.error;
  }
};
