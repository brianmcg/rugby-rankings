import TableCell from '@mui/material/TableCell';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { colors } from '@constants/colors';

const renderContents = (pos, previousPos) => {
  const upStyle = { color: colors.success, fontSize: 14, fontWeight: 700 };
  const downStyle = { color: colors.error, fontSize: 14, fontWeight: 700 };

  if (pos < previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography variant="body2">{pos}</Typography>
        <ArrowUpwardIcon style={upStyle} />
        <Typography style={upStyle} variant="body2">({previousPos})</Typography>
      </Stack>
    );
  } else if (pos > previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography variant="body2">{pos}</Typography>
        <ArrowDownwardIcon style={downStyle} />
        <Typography style={downStyle} variant="body2">({previousPos})</Typography>
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row">
        {pos}
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
