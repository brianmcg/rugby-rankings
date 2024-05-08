import Translate from '@components/Translate';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

function ErrorMessage({ message }) {
  return (
    <Container sx={{ mt: 10, mb: 10 }}>
      <Stack alignItems="center">
        <Box sx={{ display: 'flex' }}>
          <Translate text={message} />
        </Box>
      </Stack>
    </Container>
  );
}

export default ErrorMessage;
