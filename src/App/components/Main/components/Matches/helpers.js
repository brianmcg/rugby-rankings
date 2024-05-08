let matchIdCounter = 0;

export const createMatch = () => {
  const date = new Date();

  return {
    awayScore: null,
    awayTeam: null,
    homeScore: null,
    homeTeam: null,
    isComplete: false,
    isNeutralVenue: false,
    isWorldCup: false,
    matchId: `new-${matchIdCounter++}`,
    time: {
      millis: date.getTime(),
      gmtOffset: date.getTimezoneOffset() / 60,
    },
    updated: null,
    venue: {
      name: null,
      city: null,
      country: null,
    },
  };
};