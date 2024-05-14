import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import Rankings from './components/Rankings';
import Matches from './components/Matches';

export default function Main({
  matches,
  rankings,
  label,
  teams,
  sport,
  isError,
  isLoading,
  onSelectMatch,
  onRemoveMatch,
}) {

  if (isError) return <ErrorMessage message="app.errors.fetch" />;

  if (isLoading) return <Loading />;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4} direction="row-reverse">
        <Grid item xs={12} md={6}>
          <Matches
            matches={matches}
            teams={teams}
            sport={sport}
            label={label}
            onSelectMatch={onSelectMatch}
            onRemoveMatch={onRemoveMatch}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Rankings
            label={label}
            rankings={rankings}
            sport={sport}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
