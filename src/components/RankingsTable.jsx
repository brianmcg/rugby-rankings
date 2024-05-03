import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
import BasicTable from './BasicTable';
// import { format } from '@utils/date';

function RankingsTable({ entries }) {
  return (
    <Container>
      <BasicTable entries={entries} />
    </Container>
  );
}

export default RankingsTable;
