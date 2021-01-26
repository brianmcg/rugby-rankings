var team1Score = 17,
    team1Rank = 85.15,
    team2Score = 16,
    team2Rank = 80.00,
    neutralVenue = false,
    worldCupMatch = false;

var ratingGap,
    ratingChange,
    newTeam1Rank,
    newTeam2Rank;

if (neutralVenue) {
    ratingGap = team1Rank - team2Rank;
} else {
    ratingGap = team1Rank - team2Rank + 3;
}

if (ratingGap > 10) {
    ratingGap = 10;
} else if (ratingGap < -10) {
    ratingGap = -10;
}

if (team1Score > team2Score) {
    ratingChange = 1 - 0.1 * ratingGap;
} else if (team1Score < team2Score) {
    ratingChange = 1 + 0.1 * ratingGap;
} else {
    ratingChange = 0.1 * ratingGap;
}

if (Math.abs(team1Score - team2Score) > 15) {
    ratingChange = ratingChange * 1.5;
}

if (worldCupMatch) {
    ratingChange = ratingChange * 2;
}

if (team1Score > team2Score) {
    newTeam1Rank = team1Rank + ratingChange;
} else {
    newTeam1Rank = team1Rank - ratingChange;
}

if (team1Score <= team2Score) {
    newTeam2Rank = team2Rank + ratingChange;
} else {
    newTeam2Rank = team2Rank - ratingChange;
}

newTeam1Rank = Number(Math.round(newTeam1Rank + 'e' + 2) + 'e-' + 2).toFixed(2);
newTeam2Rank = Number(Math.round(newTeam2Rank + 'e' + 2) + 'e-' + 2).toFixed(2);

console.log('change: ' + ratingChange);
console.log('team1: ' + newTeam1Rank);
console.log('team2: ' + newTeam2Rank);