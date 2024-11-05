import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { validateScore } from '@utils/validate';

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  { onChange, ...other },
  ref,
) {
  const onValueChange = ({ value }) => {
    if (onChange) {
      onChange({
        target: { value },
      });
    }
  };

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={onValueChange}
      valueIsNumericString
    />
  );
});

export default function ScoreInput({ onChange, value, label }) {
  return (
    <FormControl sx={{ width: '100%' }}>
      <TextField
        label={label}
        value={value}
        error={!validateScore(value)}
        onChange={onChange}
        InputProps={{ inputComponent: NumericFormatCustom }}
      />
    </FormControl>
  );
}
