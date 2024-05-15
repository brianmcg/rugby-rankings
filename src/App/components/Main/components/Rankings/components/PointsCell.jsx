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
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">{formatPoints(pts)}</Typography>
        <ArrowUpwardIcon sx={upStyle} />
        <Typography
          sx={{ ...upStyle, display: { xs: 'none', sm: 'block' } }}
          variant="body2"
        >
          ({formatPoints(previousPts)})
        </Typography
        >
      </Stack>
    );
  } else if (pts < previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">{formatPoints(pts) }</Typography>
        <ArrowDownwardIcon sx={downStyle} />

        <Typography
          sx={{ ...downStyle, display: { xs: 'none', sm: 'block' } }}
          variant="body2"
        >
          ({formatPoints(previousPts)})
        </Typography
        >
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row">
        <Typography color="secondary.main" variant="body1">{formatPoints(pts)}</Typography>
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
