export const isNumeric = str => {
  if (typeof str !== 'string') {
    return false;
  }
  return !isNaN(parseFloat(str));
};

export const formatPoints = pts => (Math.round(pts * 100) / 100).toFixed(2);
