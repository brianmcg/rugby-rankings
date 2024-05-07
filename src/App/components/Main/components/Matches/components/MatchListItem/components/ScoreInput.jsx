import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';
import Translate from '@components/Translate';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

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

export default function ScoreInput({ handleChange, value, inputStyle }) {
  return (
    <FormControl sx={{ width: '6ch' }}>
      <TextField
        sx={{ mt: '-5px' }}
        size="small"
        label={<Translate text="app.main.matches.score" />}
        value={value}
        error={value === null}
        onChange={handleChange}
        name="numberformat"
        inputProps={{ style: inputStyle }}
        InputProps={{ inputComponent: NumericFormatCustom }}
        InputLabelProps={{style: inputStyle}}
        variant="standard"
      />
    </FormControl>
  );
}