import { useState, useRef, useLayoutEffect } from 'react';
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
import { VALUES } from '@constants/sports';
import RankCell from './components/RankCell';
import PointsCell from './components/PointsCell';

import mruImageSrc from '@assets/images/mru/rankings.png';
import wruImageSrc from '@assets/images/wru/rankings.png';

const IMAGES = {
  [VALUES.MENS]: mruImageSrc,
  [VALUES.WOMENS]: wruImageSrc,
};

function renderTableRows(rankings) {
  return rankings.map(({ pos, previousPos, pts, previousPts, team }) => (
    <TableRow
      key={team.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <RankCell pos={pos} previousPos={previousPos} />
      <TableCell>
        <Typography color="secondary.main" variant="body2" sx={{ fontSize: 16 }}>{team.name}</Typography>
      </TableCell>
      <PointsCell pts={pts} previousPts={previousPts} />
    </TableRow>
  ));
}

export default function Rankings({ rankings, label, sport }) {
  return (
    <Card>
      <CardMedia image={IMAGES[sport]} sx={{ height: 100, color: 'common.white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          <CardHeader title={<Translate text="app.main.rankings.title" options={{ label }}/>} />
        </Stack>
      </CardMedia>
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: 'common.white' }}>
                  <Translate text="app.main.rankings.table.rank" />
                </TableCell>
                <TableCell sx={{ bgcolor: 'common.white' }}>
                  <Translate text="app.main.rankings.table.team" />
                </TableCell>
                <TableCell sx={{ bgcolor: 'common.white' }}>
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
