import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TeamInput({ options, value, label, onChange }) {
  return (
    <Autocomplete
      sx={{ width: '30ch' }}
      onChange={onChange}
      disablePortal
      value={value}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          error={value === null}
          label={label}
        />
      )}
    />
  );
}
