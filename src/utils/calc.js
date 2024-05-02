const isInvalidScore = (score) => {
  return isNaN(score) || score === 1 || score === 2 || score === 4 || score < 0;
}

const isInvalidRating = (rating) => {
  return isNaN(rating) || rating < 0;
}

const validate = (options) => {
  if (!options) {
    throw 'Supplied options is undefined';
  }

  if (!options.team1) {
    throw 'Supplied team1 is undefined';
  }

  if (!options.team2) {
    throw 'Supplied team2 is undefined';
  }

  if (isInvalidScore(options.team1.score)) {
    throw 'Invalid score supplied for team1';
  }

  if (isInvalidScore(options.team2.score)) {
    throw 'Invalid score supplied for team2';
  }

  if (isInvalidRating(options.team1.rating)) {
    throw 'Invalid rating supplied for team1';
  }

  if (isInvalidRating(options.team2.rating)) {
    throw 'Invalid rating supplied for team2';
  }
};

/**
 * Calculate rating changes
 * @param  {Object} options The calculation options.
 * @return {Object}         The updated ratings.
 */
export const calculateRatingChanges = (options) => {
  let ratingGap;
  let ratingChange;

  validate(options);

  if (options.neutralVenue) {
    ratingGap = options.team1.rating - options.team2.rating;
  } else {
    ratingGap = options.team1.rating - options.team2.rating + 3;
  }

  if (ratingGap > 10) {
    ratingGap = 10;
  } else if (ratingGap < -10) {
    ratingGap = -10;
  }

  if (options.team1.score > options.team2.score) {
    ratingChange = 1 - (0.1 * ratingGap);
  } else if (options.team1.score < options.team2.score) {
    ratingChange = 1 + (0.1 * ratingGap);
  } else {
    ratingChange = 0.1 * ratingGap;
  }

  if (Math.abs(options.team1.score - options.team2.score) > 15) {
    ratingChange = ratingChange * 1.5;
  }

  if (options.worldCupMatch) {
    ratingChange = ratingChange * 2;
  }

  if (options.team1.score > options.team2.score) {
    return {
      [options.team1.id]: options.team1.rating + ratingChange,
      [options.team2.id]: options.team2.rating - ratingChange
    };

  }
  return {
    [options.team1.id]: options.team1.rating - ratingChange,
    [options.team2.id]: options.team2.rating + ratingChange
  }

};

/**
 * Capitalize a atring.
 * @param  {String} string The string to be capitalized.
 * @return {String}        The capitalized string.
 */
export const capitalize = (string) => {
  return string.replace(/\b\w/g, l => l.toUpperCase())
}
