
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { forwardRef } from 'react';

import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';

import { NumericFormat } from 'react-number-format';

import FormGroup from '@mui/material/FormGroup';

import FormControlLabel from '@mui/material/FormControlLabel';

import FormControl from '@mui/material/FormControl';

import Checkbox from '@mui/material/Checkbox';

import CancelIcon from '@mui/icons-material/Cancel';


import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
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
    <FormControl sx={{ width: '6ch' }}>
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

export default function TransitionsModal({ open = false, handleClose, match }) {
  // const { venue, teams: matchTeams, scores, status, competition, time } = match;

  // const isNeutralVenue = isWorldCup || matchTeams.map(({ name }) => name).includes(venue?.country);

  // const selectedHomeTeam = teams.find(team => team.label === homeTeam.name);

  // const selectedAwayTeam = teams.find(team => team.label === awayTeam.name);

  // const isWorldCup = !!competition.toLowerCase().match(/rugby world cup/);

  // const handleHomeTeamChange = (e, value) => {
  //   console.log('handleHomeTeamChange', value);
  // };

  // const handleHomeScoreChange = (e) => {
  //   const value = e.target.value;
  //   const parsedValue = isNumeric(value) ? parseInt(value, 10) : null;
  //   console.log('handleHomeScoreChange', parsedValue);
  // };

  // const handleAwayTeamChange = (e, value) => {
  //   console.log('handleAwayTeamChange', value);
  // };

  // const handleAwayScoreChange = (e) => {
  //   const value = e.target.value;
  //   const parsedValue = isNumeric(value) ? parseInt(value, 10) : null;
  //   console.log('handleAwayScoreChange', parsedValue);
  // };

  // const handleNeutralVenueChange = (e, value) => {
  //   console.log('handleNeutralVenueChange', value);
  // };

  // const handleWorldCupChange = (e, value) => {
  //   console.log('handleWorldCupChange', value);
  // };

  // const handleRemove = () => {
  //   console.log('handleRemove');
  // }

  {/*      <Stack width="100%">
          {date}
        <Stack spacing={2} direction="row">
          <TeamInput options={teams} value={selectedHomeTeam} handleChange={handleHomeTeamChange} />
          <ScoreInput value={isComplete ? homeScore : null} handleChange={handleHomeScoreChange} />
          <ScoreInput value={isComplete ? awayScore : null} handleChange={handleAwayScoreChange} />
          <TeamInput options={teams} value={selectedAwayTeam} handleChange={handleAwayTeamChange} />
          <IconButton onClick={handleRemove} aria-label="Example" color="error">
            <CancelIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2}>
          <LabelCheckbox label="Neutral Venue" handleChange={handleNeutralVenueChange} checked={isNeutralVenue} />
          <LabelCheckbox label="World Cup" handleChange={handleWorldCupChange} checked={isWorldCup} />
        </Stack>
      // </Stack>*/}

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => handleClose(10)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
