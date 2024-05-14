import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const formatPoints = pts => (Math.round(pts * 100) / 100).toFixed(2);

function renderContents(pts, previousPts) {
  const upStyle = { fontSize: 14, color: 'success.main'};
  const downStyle = { fontSize: 14, color: 'error.main'};

  if (pts > previousPts) {
    return (
      <Stack color="primary.main" alignItems="center" direction="row" gap={1}>
        <Typography variant="body1">{formatPoints(pts)}</Typography>
        <ArrowUpwardIcon sx={upStyle} />
        <Typography sx={upStyle} variant="body2">({formatPoints(previousPts)})</Typography>
      </Stack>
    );
  } else if (pts < previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography variant="body1">{formatPoints(pts) }</Typography>
        <ArrowDownwardIcon sx={downStyle} />
        <Typography sx={downStyle} variant="body2">({formatPoints(previousPts)})</Typography>
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
    <TableCell component="th" scope="row">
      {renderContents(pts, previousPts)}
    </TableCell>
  );
}
