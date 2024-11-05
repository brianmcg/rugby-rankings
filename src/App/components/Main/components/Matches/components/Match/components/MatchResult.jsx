import { Stack, Grid, Typography } from '@mui/material';
import Translate from '@components/Translate';

export default function MatchResult({ match, color }) {
  const { homeTeam, awayTeam, homeScore, awayScore, isComplete } = match;
  return (
    <Stack sx={{ color: 'secondary.main' }}>
      <Grid
        container
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Typography variant="body1">{homeTeam?.name}</Typography>
        <Typography variant="h6" color={color}>
          {isComplete ? (
            `${homeScore} - ${awayScore}`
          ) : (
            <Translate text="app.main.matches.vs"></Translate>
          )}
        </Typography>
        <Typography variant="body1">{awayTeam?.name}</Typography>
      </Grid>
    </Stack>
  );
}
