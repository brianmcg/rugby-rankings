import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { formatTime, formatDay } from '@utils/date';
import Translate from '@components/Translate';
import DeleteIcon from '@mui/icons-material/Delete';

import { forwardRef } from 'react';

import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';

import { NumericFormat } from 'react-number-format';

import FormGroup from '@mui/material/FormGroup';

import FormControlLabel from '@mui/material/FormControlLabel';

import FormControl from '@mui/material/FormControl';

import Switch from '@mui/material/Switch';

const inputStyle = { fontSize: '0.875rem',  };

function TeamInput({ options, value, label, handleChange }) {
  return (
    <Autocomplete
      sx={{ width: '30ch' }}
      onChange={handleChange}
      size="small"
      disablePortal
      value={value}
      id='combo-box'
      options={options}
      renderInput={(params) => (
      <TextField
        {...params}
        inputProps = {{...params.inputProps, style: inputStyle}}
        label={label}
      />
      )}
    />
  );
}

const isNumeric = str => {
  if (typeof str != "string") {
    return false;
  }
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const NumericFormatCustom = forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
      />
    );
  },
);

function ScoreInput({ handleChange, value }) {
  const validate = input => input !== null;

  const [error, setError] = useState(!validate(value));

  const onChange = e => {
    handleChange(e);
    setError(!validate(e.target.value));
  }

  return (
    <FormControl sx={{ width: '6ch' }}>
      <TextField
        sx={{ mt: '-5px' }}
        size="small"
        label={<Translate text="app.main.matches.score" />}
        value={value}
        error={error}
        onChange={onChange}
        name="numberformat"
        inputProps={{ style: inputStyle }}
        InputProps={{ inputComponent: NumericFormatCustom }}
        InputLabelProps={{style: inputStyle}}
        variant="standard"
      />
    </FormControl>
  );
}

function LabelSwitch({ label, checked = false, handleChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch
        defaultChecked={checked} />}
        label={<Typography variant="caption">{label}</Typography>}
        onChange={handleChange}
      />
    </FormGroup>
  );
}

export default function MatchListItem({ match, teams }) {
  const { venue, teams: matchTeams, scores, status, competition, time } = match;
  const [homeTeam, awayTeam] = matchTeams;
  const [homeScore, awayScore] = scores;
  const isComplete = status === 'C';
  const { palette } = useTheme();
  const color = isComplete ? palette.success.main : palette.error.main;
  const isWorldCup = !!competition.toLowerCase().match(/rugby world cup/);
  const isNeutralVenue = isWorldCup || matchTeams.map(({ name }) => name).includes(venue?.country);
  const selectedHomeTeam = teams.find(team => team.label === homeTeam.name);
  const selectedAwayTeam = teams.find(team => team.label === awayTeam.name);

  const handleHomeTeamChange = (e, value) => {
    console.log('handleHomeTeamChange', value);
  };

  const handleHomeScoreChange = (e) => {
    const value = e.target.value;
    const parsedValue = isNumeric(value) ? parseInt(value, 10) : null;
    console.log('handleHomeScoreChange', parsedValue);
  };

  const handleAwayTeamChange = (e, value) => {
    console.log('handleAwayTeamChange', value);
  };

  const handleAwayScoreChange = (e) => {
    const value = e.target.value;
    const parsedValue = isNumeric(value) ? parseInt(value, 10) : null;
    console.log('handleAwayScoreChange', parsedValue);
  };

  const handleNeutralVenueChange = (e, value) => {
    console.log('handleNeutralVenueChange', value);
  };

  const handleWorldCupChange = (e, value) => {
    console.log('handleWorldCupChange', value);
  };

  const handleRemove = () => {
    console.log('handleRemove');
  }

  const infoLabel = [
    formatDay(time.millis),
    formatTime(time.millis),
    venue?.name
  ].filter(item => item).join(' | ');

  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, width: '100%', borderLeft: `solid 4px ${color}` }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="caption" color={palette.grey[500]}>{infoLabel}</Typography>
        <IconButton
          sx={{ padding: 0 }}
          onClick={handleRemove}
          aria-label="Example"
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ mb: 2 }}>
        <TeamInput
          required
          options={teams}
          value={selectedHomeTeam}
          handleChange={handleHomeTeamChange}
          label={<Translate text="app.main.matches.team" />}
        />
        <ScoreInput value={isComplete ? homeScore : null} handleChange={handleHomeScoreChange} />
        <Divider orientation="vertical" flexItem />
        <ScoreInput value={isComplete ? awayScore : null} handleChange={handleAwayScoreChange} />
        <TeamInput
          options={teams}
          value={selectedAwayTeam}
          handleChange={handleAwayTeamChange}
          label={<Translate text="app.main.matches.team" />}
        />
  
      </Stack>

      <Stack direction="row">
        <LabelSwitch
          label={<Translate text="app.main.matches.neutral" />}
          handleChange={handleNeutralVenueChange}
          checked={isNeutralVenue}
        />
        <LabelSwitch
          label={<Translate text="app.main.matches.rwc" />}
          handleChange={handleWorldCupChange}
          checked={isWorldCup}
          />
      </Stack>

   {/*   <Grid container sx={{ marginTop: 1 }}>
        <Grid item xs={5} sx={{ paddingRight: 1  }}>
          <Stack direction="row" alignItems="right" justifyContent="right">
            <TeamInput
              label={<Translate text="app.main.matches.home" />}
              options={teams}
              value={selectedHomeTeam}
              handleChange={handleHomeTeamChange}
            />
          </Stack>
        </Grid>

        <Grid item xs={2} >
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <ScoreInput value={isComplete ? homeScore : null} handleChange={handleHomeScoreChange} />
            <Divider orientation="vertical" flexItem />
            <ScoreInput value={isComplete ? awayScore : null} handleChange={handleAwayScoreChange} />
          </Stack>
        </Grid>

        <Grid item xs={5} sx={{ paddingLeft: 1 }}>
          <Stack direction="row" alignItems="left" justifyContent="left">
            <TeamInput options={teams} value={selectedAwayTeam} handleChange={handleAwayTeamChange} />
          </Stack>
        </Grid>
      </Grid>*/}

    

    </Paper>
  );
}
