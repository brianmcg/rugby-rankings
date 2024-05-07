import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TeamInput({ options, value, label, handleChange, inputStyle }) {
  return (
    <Autocomplete
      sx={{ width: '30ch' }}
      onChange={handleChange}
      size="small"
      disablePortal
      value={value}
      id="combo-box"
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          error={value === null}
          {...params}
          inputProps = {{...params.inputProps, style: inputStyle}}
          label={label}
        />
      )}
    />
  );
}
