import Container from '@mui/material/Container';
import BasicTable from './components/BasicTable';

function RankingsTable({ entries }) {
  return (
    <Container>
      <BasicTable entries={entries} />
    </Container>
  );
}

export default RankingsTable;
