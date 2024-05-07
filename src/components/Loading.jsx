import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

function Loading() {
  return (
    <Container sx={{ mt: 10, mb: 10 }}>
      <Stack alignItems="center">
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </Stack>
    </Container>
  );
}

export default Loading;
