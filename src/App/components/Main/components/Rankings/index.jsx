import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Translate from '@components/Translate';
import { format } from '@utils/date';
import RankCell from './components/RankCell';
import PointsCell from './components/PointsCell';

const renderTableRows = (entries) => (
  entries.map(({ pos, previousPos, pts, previousPts, team }) => (
    <TableRow
      key={team.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <RankCell pos={pos} previousPos={previousPos} />
      <TableCell>{team.name}</TableCell>
      <PointsCell pts={pts} previousPts={previousPts} />
    </TableRow>
  ))
);

export default function Rankings({ entries, label, effective }) {
  return (
    <Card>
      <CardMedia image="/src/assets/images/mru-rankings.png" sx={{ height: 140, color: 'white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          <CardHeader title={<Translate text="app.main.rankings.title" options={{ label }}/>} />
          <Box sx={{ p: 2 }}>
            <Typography>{format(effective.millis)}</Typography>
          </Box>
        </Stack>
      </CardMedia>
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><Translate text="app.main.rankings.table.rank" /></TableCell>
                <TableCell>
                  <Translate text="app.main.rankings.table.team" />
                </TableCell>
                <TableCell><Translate text="app.main.rankings.table.points" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableRows(entries)}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
