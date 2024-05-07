import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TeamInput({ options, value, label, onChange, inputStyle }) {
  return (
    <Autocomplete
      sx={{ width: '30ch' }}
      onChange={onChange}
      size="small"
      disablePortal
      value={value}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          error={value === null}
          inputProps = {{ ...params.inputProps, style: inputStyle }}
          label={label}
        />
      )}
    />
  );
}
