import Grid from '@mui/material/Grid';
import Translate from '@components/Translate';
import TeamInput from './components/TeamInput';
import ScoreInput from './components/ScoreInput';

export default function EntryInput({
  team,
  score,
  otherTeam,
  teams,
  onTeamChange,
  onScoreChange,
  label,

}) {
  return (
    <Grid container gap={1} alignItems="center" justifyContent="flex-start">
      <Grid item xs={12} sm={8}>
        <TeamInput
          options={teams.filter(team => team.id !== otherTeam?.id)}
          value={team}
          onChange={onTeamChange}
          label={label}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <ScoreInput
          value={score}
          label={<Translate text="app.main.modal.score" />}
          onChange={onScoreChange}
        />
      </Grid>
    </Grid>
  );
}
