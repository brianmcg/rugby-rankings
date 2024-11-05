import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Translate from '@components/Translate';

export default function ErrorMessage({ message }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ color: 'error.main', p: 8 }}
    >
      <ErrorOutlineIcon />
      <Typography variant="h6">
        <Translate text={message} />
      </Typography>
    </Stack>
  );
}
