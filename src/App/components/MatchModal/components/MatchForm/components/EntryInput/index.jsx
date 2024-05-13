import Stack from '@mui/material/Stack';
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
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
      <TeamInput
        options={teams.filter(team => team.id !== otherTeam?.id)}
        value={team}
        onChange={onTeamChange}
        label={label}
      />
      <ScoreInput
        value={score}
        label={<Translate text="app.main.modal.score" />}
        onChange={onScoreChange}
      />
    </Stack>
  );
}
