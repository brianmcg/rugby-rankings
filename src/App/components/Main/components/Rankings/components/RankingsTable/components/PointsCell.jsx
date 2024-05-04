import TableCell from '@mui/material/TableCell';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

const formatPoints = pts => (Math.round(pts * 100) / 100).toFixed(2);

const renderContents = (pts, previousPts, palette) => {
  const upStyle = { color: palette.success.main };
  const downStyle = { color: palette.error.main };

  if (pts > previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={0}>
        <Typography variant="body2">{formatPoints(pts)}</Typography>
        <ArrowDropUpIcon style={upStyle} />
        <Typography style={upStyle} variant="body2">({formatPoints(previousPts)})</Typography>
      </Stack>
    );
  } else if (pts < previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={0}>
        <Typography variant="body2">{formatPoints(pts)}</Typography>
        <ArrowDropDownIcon style={downStyle} />
        <Typography style={downStyle} variant="body2">({formatPoints(previousPts)})</Typography>
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row" gap={0}>
        {formatPoints(pts)}
      </Stack>
    );
  }
}

export default function PointsCell({ pts, previousPts }) {
  const { palette } = useTheme();

  return (
    <TableCell component="th" scope="row">
      {renderContents(pts, previousPts, palette)}
    </TableCell>
  );
}
