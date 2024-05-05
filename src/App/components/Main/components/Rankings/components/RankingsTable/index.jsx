import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Translate from '@components/Translate';
import RankCell from './components/RankCell';
import PointsCell from './components/PointsCell';

const SHOW_ROWS = 16;

export default function RankingsTable({ entries, expanded }) {
  const rows = expanded ? [...entries] : entries.filter((entry, i) => i < SHOW_ROWS);

  return (
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
          {rows.map(({ pos, previousPos, pts, previousPts,team }) => (
            <TableRow
              key={team.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <RankCell pos={pos} previousPos={previousPos} />
              <TableCell>{team.name}</TableCell>
              <PointsCell pts={pts} previousPts={previousPts} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
