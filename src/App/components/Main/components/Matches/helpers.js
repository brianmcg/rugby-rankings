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
    matchId: null,
    time: {
      millis: date.getTime(),
      gmtOffset: date.getTimezoneOffset() / 60,
    },
    venue: {
      name: null,
      city: null,
      country: null,
    },
  };
};
