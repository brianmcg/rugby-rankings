export const getColor = (match, palette) => {
  const { isCreated, isUpdated, isComplete } = match;
  const { success, primary, error } = palette;

  if (isCreated || isUpdated) {
    return success.main;
  } else if (isComplete) {
    return primary.main;
  } else {
    return error.main;
  }
};
