import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Translate from '@components/Translate';
import { SECONDARY } from '@constants/colors';
import RankCell from './components/RankCell';
import PointsCell from './components/PointsCell';

const INITIAL_ROWS = 10;

const imageSrc = sport => `/src/assets/images/${sport}/rankings.png`;

function renderTableRows(rankings, fullTable) {
  const rows = fullTable ? rankings : rankings.slice(0, INITIAL_ROWS);

  return rows.map(({ pos, previousPos, pts, previousPts, team }) => (
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
  ))
}

export default function Rankings({ rankings, label, sport }) {
  const [fullTable, setFullTable] = useState(false);

  return (
    <Card>
      <CardMedia image={imageSrc(sport)} sx={{ height: 100, color: 'white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          <CardHeader title={<Translate text="app.main.rankings.title" options={{ label }}/>} />
        </Stack>
      </CardMedia>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Translate text="app.main.rankings.table.rank" />
                </TableCell>
                <TableCell>
                  <Translate text="app.main.rankings.table.team" />
                </TableCell>
                <TableCell>
                  <Translate text="app.main.rankings.table.points" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableRows(rankings, fullTable)}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" p={2} mt={2}>
          <Button
            variant="contained"
            startIcon={fullTable ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            onClick={() => setFullTable(!fullTable)}
          >
            <Translate text={`app.main.rankings.${fullTable ? 'collapse' : 'expand'}` } />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
