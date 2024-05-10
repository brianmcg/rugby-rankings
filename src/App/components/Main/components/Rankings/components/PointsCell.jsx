import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { colors } from '@constants/colors';

const formatPoints = pts => (Math.round(pts * 100) / 100).toFixed(2);

const renderContents = (pts, previousPts) => {
  const upStyle = { color: colors.success, fontSize: 14 };
  const downStyle = { color: colors.error, fontSize: 14 };

  if (pts > previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography variant="body1">{formatPoints(pts)}</Typography>
        <ArrowUpwardIcon style={upStyle} />
        <Typography style={upStyle} variant="body2">({formatPoints(previousPts)})</Typography>
      </Stack>
    );
  } else if (pts < previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography variant="body1">{formatPoints(pts) }</Typography>
        <ArrowDownwardIcon style={downStyle} />
        <Typography style={downStyle} variant="body2">({formatPoints(previousPts)})</Typography>
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row">
        <Typography variant="body1">{formatPoints(pts)}</Typography>
        
      </Stack>
    );
  }
}

export default function PointsCell({ pts, previousPts }) {
  return (
    <TableCell component="th" scope="row" sx={{ color: colors.secondary }}>
      {renderContents(pts, previousPts)}
    </TableCell>
  );
}
