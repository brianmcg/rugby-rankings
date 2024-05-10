export const parseMatchResponse = (response, rankings) => {
  const teamIds = rankings.entries.map(({ team }) => team.id);

  return response.content.reduce((memo, match) => {
    const isTeamsRanked = match.teams.reduce((memo, team) => memo && teamIds.includes(team.id), true);
    const isTeamsConfirmed = match.teams.reduce((memo, team) => memo && !!team, true);

    if (isTeamsRanked && isTeamsConfirmed) {
      const { venue, teams: matchTeams = [], scores = [], status, rankingsWeight, matchId, time } = match;
      const isComplete = status === 'C';

      const teams = rankings.entries.map(entry => entry.team);
      const homeTeam = teams.find(team => team.id === matchTeams[0]?.id) || null;
      const awayTeam = teams.find(team => team.id === matchTeams[1]?.id) || null;
      const homeScore = isComplete ? scores[0] : null;
      const awayScore = isComplete ? scores[1] : null;

      // @1
      // Covid-TRC (noticed in 2021 but apparently also in 2020) ignores the stadium location
      // and treats the nominal home team as always at home
      // const tournamentRespectsStadiumLocation = !e.events.some(function (event) {
      //   return event.label.match(/^202[01] Rugby Championship$/);
      // });
      
      // @2
      // if (e.venue.country === teamData.country) {
      //   // Saw this in the Pacific Nations Cup 2019 - a team was nominally Away
      //   // but in a home stadium. They seemed to get home nation advantage.
      //   if (tournamentRespectsStadiumLocation) {
      //       fixture.switched(true);
      //   }
      // } else {
      //   if (tournamentRespectsStadiumLocation) {
      //     fixture.noHome(true);
      //   }
      // }

      const isNeutralVenue = venue !== null && homeTeam.name !== venue?.country;
      const isWorldCup = rankingsWeight == 2;

      return [
        ...memo,
        {
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
          isNeutralVenue,
          isWorldCup,
          isComplete,
          venue,
          matchId,
          time,
          isCreated: false,
        },
      ]; // .sort((a, b) => b.time.millis - a.time.millis);
    }

    return memo;
  }, []);
};
