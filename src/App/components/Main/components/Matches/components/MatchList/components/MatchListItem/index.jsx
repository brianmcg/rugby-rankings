
import { forwardRef } from 'react';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { NumericFormat } from 'react-number-format';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';

import Stack from '@mui/material/Stack';

import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const textStyle = { fontSize: '0.875rem' };

function TeamInput({ options, value, handleChange }) {
  return (
    <Autocomplete
      sx={{width: "20ch"}}
      onChange={handleChange}
      size="small"
      disablePortal
      value={value}
      id="combo-box-demo"
      options={options}
      renderInput={(params) => (
      <TextField
         {...params}
         inputProps = {{...params.inputProps, style: textStyle}}
         label="Team"/>
      )}
    />
  );
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
  return (
    <FormControl sx={{ width: '4ch' }}>
      <TextField
        sx={{ mt: '-5px' }}
        size="small"
        label="Score"
        value={value}
        onChange={handleChange}
        name="numberformat"
        inputProps={{style: textStyle}}
        InputProps={{ inputComponent: NumericFormatCustom }}
        variant="standard"
      />
    </FormControl>
  );
}

function LabelCheckbox({ label, checked = false, handleChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox
        defaultChecked={checked} />}
        label={<Typography style={textStyle}>{label}</Typography>}
        onChange={handleChange}
      />
    </FormGroup>
  );
}

export default function MatchListItem({ match, teams }) {
  const { venue, teams: matchTeams, scores, status, competition } = match;

  const [homeTeam, awayTeam] = matchTeams;
  const [homeScore, awayScore] = scores;
  const isComplete = status === 'C';
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

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Stack width="100%">
        <Stack spacing={2} direction="row">
          <TeamInput options={teams} value={selectedHomeTeam} handleChange={handleHomeTeamChange} />
          <ScoreInput value={homeScore} handleChange={handleHomeScoreChange} />
          <ScoreInput value={awayScore} handleChange={handleAwayScoreChange} />
          <TeamInput options={teams} value={selectedAwayTeam} handleChange={handleAwayTeamChange} />
          <IconButton onClick={handleRemove} aria-label="Example" color="error">
            <CancelIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2}>
          <LabelCheckbox label="Neutral Venue" handleChange={handleNeutralVenueChange} checked={isNeutralVenue} />
          <LabelCheckbox label="World Cup" handleChange={handleWorldCupChange} checked={isWorldCup} />
        </Stack>
      </Stack>
    </Paper>
  );
}
