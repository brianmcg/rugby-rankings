import { Stack, IconButton } from '@mui/material';

export default function MatchButtons({ options }) {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
    >
      {options.map(({ icon, onClick, color }) => (
        <IconButton
          key={color}
          color="primary"
          sx={{ p: 0, '&:hover': { color } }}
          onClick={onClick}
          size="small"
        >
          {icon}
        </IconButton>
      ))}
    </Stack>
  );
}
