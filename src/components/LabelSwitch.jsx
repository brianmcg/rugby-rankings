import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

export default function LabelSwitch({ label, checked, handleChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={!!checked} onChange={handleChange} />}
        label={<Typography variant="caption">{label}</Typography>}
      />
    </FormGroup>
  );
}
