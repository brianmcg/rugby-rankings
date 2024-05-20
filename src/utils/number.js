export function isNumeric(str) {
  if (typeof str !== 'string') {
    return false;
  }
  return !isNaN(str) && !isNaN(parseFloat(str));
}

export const formatPoints = pts => (Math.round(pts * 100) / 100).toFixed(2);

