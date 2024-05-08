import { forwardRef } from 'react';
// import debounce from 'lodash.debounce';
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { validateScore } from '../helpers';

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

export default function ScoreInput({ onChange, value, label }) {
  // const debouncedOnChange = useMemo(() => {
  //   return debounce(onChange, 500);
  // }, [onChange]);

  return (
    <FormControl sx={{ width: '8ch' }}>
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
