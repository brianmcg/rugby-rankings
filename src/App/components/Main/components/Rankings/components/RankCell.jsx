import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function renderContents(pos, previousPos) {
  const upStyle = { color: 'success.main', fontSize: 14 };
  const downStyle = { color: 'error.main', fontSize: 14 };

  if (pos < previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">{pos}</Typography>
        <ArrowUpwardIcon sx={upStyle} />
        <Typography sx={upStyle} variant="body2">({previousPos})</Typography>
      </Stack>
    );
  } else if (pos > previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">{pos}</Typography>
        <ArrowDownwardIcon sx={downStyle} />
        <Typography sx={downStyle} variant="body2">({previousPos})</Typography>
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row">
        <Typography color="secondary.main" variant="body1">{pos}</Typography>
      </Stack>
    );
  }
}

export default function RankCell({ pos, previousPos }) {
  return (
    <TableCell component="th" scope="row">
      {renderContents(pos, previousPos)}
    </TableCell>
  );
}
