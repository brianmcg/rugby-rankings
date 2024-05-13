import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Translate from '@components/Translate';
import { SECONDARY } from '@constants/colors';
import RankCell from './components/RankCell';
import PointsCell from './components/PointsCell';



const imageSrc = sport => `/src/assets/images/${sport}/rankings.png`;

function renderTableRows(rankings) {
  // const rows = fullTable ? rankings : rankings.slice(0, INITIAL_ROWS);

  return rankings.map(({ pos, previousPos, pts, previousPts, team }) => (
    <TableRow
      key={team.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <RankCell pos={pos} previousPos={previousPos} />
      <TableCell sx={{ color: SECONDARY }}>
        <Typography variant="body2" sx={{ fontSize: 16 }}>{team.name}</Typography>
      </TableCell>
      <PointsCell pts={pts} previousPts={previousPts} />
    </TableRow>
  ));
}

export default function Rankings({ rankings, label, sport }) {
  return (
    <Card>
      <CardMedia image={imageSrc(sport)} sx={{ height: 100, color: 'white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          <CardHeader title={<Translate text="app.main.rankings.title" options={{ label }}/>} />
        </Stack>
      </CardMedia>
      <CardContent>
        <TableContainer sx={{ maxHeight: 628 }}>
          <Table stickyHeader={true} size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'white' }}>
                  <Translate text="app.main.rankings.table.rank" />
                </TableCell>
                <TableCell sx={{ backgroundColor: 'white' }}>
                  <Translate text="app.main.rankings.table.team" />
                </TableCell>
                <TableCell sx={{ backgroundColor: 'white' }}>
                  <Translate text="app.main.rankings.table.points" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableRows(rankings)}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
