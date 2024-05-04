import TableCell from '@mui/material/TableCell';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

const renderContents = (pos, previousPos, palette) => {
  const upStyle = { color: palette.success.main };
  const downStyle = { color: palette.error.main };

  if (pos < previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={0}>
        <Typography variant="body2">{pos}</Typography>
        <ArrowDropUpIcon style={upStyle} />
        <Typography style={upStyle} variant="body2">({previousPos})</Typography>
      </Stack>
    );
  } else if (pos > previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={0}>
        <Typography variant="body2">{pos}</Typography>
        <ArrowDropDownIcon style={downStyle} />
        <Typography style={downStyle} variant="body2">({previousPos})</Typography>
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row" gap={0}>
        {pos}
      </Stack>
    );
  }
}

export default function RankCell({ pos, previousPos }) {
  const { palette } = useTheme();

  return (
    <TableCell component="th" scope="row">
      {renderContents(pos, previousPos, palette)}
    </TableCell>
  );
}
