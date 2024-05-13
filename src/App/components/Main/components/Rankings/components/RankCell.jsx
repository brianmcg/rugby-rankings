import TableCell from '@mui/material/TableCell';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SUCCESS, ERROR } from '@constants/colors';

function renderContents(pos, previousPos) {
  const upStyle = { color: SUCCESS, fontSize: 14 };
  const downStyle = { color: ERROR, fontSize: 14 };

  if (pos < previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography variant="body1">{pos}</Typography>
        <ArrowUpwardIcon style={upStyle} />
        <Typography style={upStyle} variant="body2">({previousPos})</Typography>
      </Stack>
    );
  } else if (pos > previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography variant="body1">{pos}</Typography>
        <ArrowDownwardIcon style={downStyle} />
        <Typography style={downStyle} variant="body2">({previousPos})</Typography>
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row">
        <Typography variant="body1">{pos}</Typography>
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
