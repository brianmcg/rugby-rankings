import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BasicTable from './BasicTable';
import { format } from '@utils/date';

function RankingsTable({ label, entries, effective }) {
  const date = format(effective.millis);

  // console.log(entries);

  return (
    <Container>
      <Typography variant="h5" component="h2">
        {label}
      </Typography>
      <span>{date}</span>

      <BasicTable entries={entries} />
        
        
   
    </Container>
  );
}

export default RankingsTable;
