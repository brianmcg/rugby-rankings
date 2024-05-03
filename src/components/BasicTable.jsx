import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Translate from '@components/Translate';

export default function BasicTable({ entries }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Translate text="app.rankings.table.rank" /></TableCell>
            <TableCell><Translate text="app.rankings.table.team" /></TableCell>
            <TableCell><Translate text="app.rankings.table.points" /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map(({ pos, previousPos, pts, previousPts, team }) => (

            <TableRow
              key={team.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <span>{pos}</span>
                <span>(</span>
                <ArrowDropUpIcon aria-label="Example"/>
                <span>{previousPos}</span>
                <span>)</span>
              </TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell>{pts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}