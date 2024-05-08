import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
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
  entries.map(({ pos, previousPos, pts, previousPts,team }) => (
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
      <CardHeader
        title={<Translate text="app.main.rankings.title" options={ { label }}/>}
        subheader={format(effective.millis)}
      />
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
